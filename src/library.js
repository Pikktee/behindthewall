import { deleteBookmark, searchBookmarks } from "./backend-client.js";

const searchInput = document.querySelector("#search-input");
const resultsEl = document.querySelector("#results");
const statusEl = document.querySelector("#library-status");
const refreshButton = document.querySelector("#refresh-results");
const settingsButton = document.querySelector("#open-settings");

let searchTimer = 0;

settingsButton.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

refreshButton.addEventListener("click", () => {
  void loadResults(searchInput.value);
});

searchInput.addEventListener("input", () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    void loadResults(searchInput.value);
  }, 180);
});

resultsEl.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete-id]");
  if (!deleteButton) {
    return;
  }

  try {
    await deleteBookmark(deleteButton.dataset.deleteId);
    setStatus("Eintrag gelöscht.");
    await loadResults(searchInput.value);
  } catch (error) {
    setStatus(error.message, true);
  }
});

void loadResults("");

async function loadResults(query) {
  try {
    setStatus("Lade Bibliothek...");
    const response = await searchBookmarks(query);
    renderResults(response.items || []);
    setStatus(
      query.trim()
        ? `${response.items.length} Treffer für "${query.trim()}".`
        : `${response.items.length} Einträge geladen.`
    );
  } catch (error) {
    renderResults([]);
    setStatus(error.message, true);
  }
}

function renderResults(items) {
  if (!items.length) {
    resultsEl.innerHTML = `
      <article class="empty-state">
        <h2>Keine Einträge</h2>
        <p>Speichere zuerst eine Seite oder prüfe die Backend-Konfiguration.</p>
      </article>
    `;
    return;
  }

  resultsEl.innerHTML = items.map(renderCard).join("");
}

function renderCard(item) {
  const excerpt = escapeHtml(item.excerpt || item.description || "");
  const title = escapeHtml(item.title || item.normalizedUrl);
  const url = escapeHtml(item.normalizedUrl || item.url);
  const tags = item.tags.length
    ? `<p class="result-tags">${item.tags.map(escapeHtml).join(" · ")}</p>`
    : "";

  return `
    <article class="result-card">
      <div class="result-topline">
        <a class="result-title" href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer">${title}</a>
        <button type="button" class="ghost-button" data-delete-id="${escapeAttribute(item.id)}">Löschen</button>
      </div>
      <p class="result-url">${url}</p>
      ${tags}
      <p class="result-excerpt">${excerpt || "Kein Auszug verfügbar."}</p>
      <p class="result-meta">Zuletzt aktualisiert: ${formatDate(item.updatedAt)}</p>
    </article>
  `;
}

function formatDate(value) {
  return new Date(value).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.dataset.error = isError ? "true" : "false";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
