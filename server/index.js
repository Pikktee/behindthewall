const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { URL } = require("node:url");
const { DatabaseSync } = require("node:sqlite");

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const API_TOKEN = process.env.BTW_API_TOKEN || "change-me";
const DB_PATH =
  process.env.BTW_DB_PATH ||
  (process.env.RAILWAY_VOLUME_MOUNT_PATH
    ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, "bookmarks.sqlite")
    : path.join(process.cwd(), "data", "bookmarks.sqlite"));

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS bookmarks (
    internal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    normalized_url TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    excerpt TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  DROP TABLE IF EXISTS bookmarks_fts;

  CREATE VIRTUAL TABLE bookmarks_fts USING fts5(
    title,
    description,
    content,
    url,
    tags,
    tokenize='porter unicode61'
  );

  INSERT INTO bookmarks_fts (rowid, title, description, content, url, tags)
  SELECT internal_id, title, description, content, url, tags
  FROM bookmarks;
`);

const findByNormalizedUrl = db.prepare(`
  SELECT internal_id, public_id
  FROM bookmarks
  WHERE normalized_url = ?
`);

const insertBookmark = db.prepare(`
  INSERT INTO bookmarks (
    public_id,
    url,
    normalized_url,
    title,
    description,
    content,
    excerpt,
    tags,
    created_at,
    updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const updateBookmark = db.prepare(`
  UPDATE bookmarks
  SET url = ?,
      title = ?,
      description = ?,
      content = ?,
      excerpt = ?,
      tags = ?,
      updated_at = ?
  WHERE internal_id = ?
`);

const findInternalIdByPublicId = db.prepare(`
  SELECT internal_id
  FROM bookmarks
  WHERE public_id = ?
`);

const deleteBookmarkStmt = db.prepare(`
  DELETE FROM bookmarks
  WHERE internal_id = ?
`);

const upsertFts = db.prepare(`
  INSERT OR REPLACE INTO bookmarks_fts (
    rowid,
    title,
    description,
    content,
    url,
    tags
  ) VALUES (?, ?, ?, ?, ?, ?)
`);

const deleteFts = db.prepare(`
  DELETE FROM bookmarks_fts
  WHERE rowid = ?
`);

const listRecentStmt = db.prepare(`
  SELECT public_id, url, normalized_url, title, description, excerpt, tags, created_at, updated_at
  FROM bookmarks
  ORDER BY updated_at DESC
  LIMIT ?
`);

const searchStmt = db.prepare(`
  SELECT
    b.public_id,
    b.url,
    b.normalized_url,
    b.title,
    b.description,
    b.excerpt,
    b.tags,
    b.created_at,
    b.updated_at,
    bm25(bookmarks_fts) AS rank
  FROM bookmarks_fts
  JOIN bookmarks b ON b.internal_id = bookmarks_fts.rowid
  WHERE bookmarks_fts MATCH ?
  ORDER BY rank
  LIMIT ?
`);

const countStmt = db.prepare(`
  SELECT COUNT(*) AS count
  FROM bookmarks
`);

function saveBookmark(record) {
  db.exec("BEGIN IMMEDIATE");
  try {
  const existing = findByNormalizedUrl.get(record.normalizedUrl);
  if (existing) {
    updateBookmark.run(
      record.url,
      record.title,
      record.description,
      record.content,
      record.excerpt,
      record.tags,
      record.updatedAt,
      existing.internal_id
    );
    upsertFts.run(
      existing.internal_id,
      record.title,
      record.description,
      record.content,
      record.url,
      record.tags
    );
    db.exec("COMMIT");
    return existing.public_id;
  }

  insertBookmark.run(
    record.id,
    record.url,
    record.normalizedUrl,
    record.title,
    record.description,
    record.content,
    record.excerpt,
    record.tags,
    record.createdAt,
    record.updatedAt
  );
  const inserted = findByNormalizedUrl.get(record.normalizedUrl);
  upsertFts.run(
    inserted.internal_id,
    record.title,
    record.description,
    record.content,
    record.url,
    record.tags
  );
  db.exec("COMMIT");
  return record.id;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function removeBookmark(publicId) {
  db.exec("BEGIN IMMEDIATE");
  try {
  const existing = findInternalIdByPublicId.get(publicId);
  if (!existing) {
    db.exec("COMMIT");
    return;
  }
  deleteBookmarkStmt.run(existing.internal_id);
  deleteFts.run(existing.internal_id);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    applyCors(res);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        count: countStmt.get().count
      });
      return;
    }

    if (!isAuthorized(req)) {
      sendJson(res, 401, {
        error: "Missing or invalid API token"
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/bookmarks") {
      const body = await readJson(req);
      const record = buildBookmarkRecord(body);
      const id = saveBookmark(record);
      sendJson(res, 200, { ok: true, id });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/bookmarks") {
      const query = (url.searchParams.get("q") || "").trim();
      const limit = clampNumber(url.searchParams.get("limit"), 50, 1, 200);
      const ftsQuery = toFtsQuery(query);
      const items = query
        ? (ftsQuery ? searchStmt.all(ftsQuery, limit) : [])
        : listRecentStmt.all(limit);

      sendJson(res, 200, {
        ok: true,
        items: items.map(toBookmarkDto)
      });
      return;
    }

    if (req.method === "DELETE" && url.pathname.startsWith("/api/bookmarks/")) {
      const id = decodeURIComponent(url.pathname.split("/").pop() || "");
      removeBookmark(id);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Behind The Wall backend listening on http://${HOST}:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
});

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
}

function isAuthorized(req) {
  const header = req.headers.authorization || "";
  return header === `Bearer ${API_TOKEN}`;
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let buffer = "";
    req.on("data", (chunk) => {
      buffer += chunk;
      if (buffer.length > 2_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(buffer ? JSON.parse(buffer) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function buildBookmarkRecord(input) {
  const rawUrl = assertNonEmptyString(input.url, "url");
  const normalizedUrl = normalizeUrl(rawUrl);
  const title = assertNonEmptyString(input.title || normalizedUrl, "title");
  const description = normalizeText(input.description || "");
  const content = normalizeText(input.content || "");
  const excerpt = normalizeText(input.excerpt || content.slice(0, 320));
  const tags = Array.isArray(input.tags)
    ? input.tags.map((tag) => normalizeText(String(tag))).filter(Boolean).join(", ")
    : normalizeText(input.tags || "");
  const timestamp = new Date().toISOString();

  return {
    id: input.id && typeof input.id === "string" ? input.id : crypto.randomUUID(),
    url: rawUrl,
    normalizedUrl,
    title,
    description,
    content,
    excerpt,
    tags,
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

function toBookmarkDto(row) {
  return {
    id: row.public_id,
    url: row.url,
    normalizedUrl: row.normalized_url,
    title: row.title,
    description: row.description,
    excerpt: row.excerpt,
    tags: row.tags ? row.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function assertNonEmptyString(value, field) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing field: ${field}`);
  }
  return value.trim();
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80_000);
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.search = "";
  return url.toString();
}

function toFtsQuery(query) {
  return query
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `${part}*`)
    .join(" ");
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, Math.floor(parsed)));
}
