import { getBackendConfig } from "./config.js";

export async function saveBookmark(payload) {
  return request("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function searchBookmarks(query = "") {
  const search = new URLSearchParams();
  if (query.trim()) {
    search.set("q", query.trim());
  }

  return request(`/api/bookmarks?${search.toString()}`);
}

export async function deleteBookmark(id) {
  return request(`/api/bookmarks/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}

export async function checkBackend() {
  const { backendUrl } = await getBackendConfig();
  const response = await fetch(`${backendUrl}/api/health`);
  if (!response.ok) {
    throw new Error(`Backend antwortet mit ${response.status}`);
  }
  return response.json();
}

async function request(path, init = {}) {
  const { backendUrl, apiToken } = await getBackendConfig();
  if (!backendUrl) {
    throw new Error("Backend-URL fehlt");
  }
  if (!apiToken) {
    throw new Error("API-Token fehlt");
  }

  const response = await fetch(`${backendUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
      ...(init.headers || {})
    }
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || `Request fehlgeschlagen: ${response.status}`);
  }

  return json;
}
