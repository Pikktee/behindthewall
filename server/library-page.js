function renderLibraryPage() {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Behind The Wall Bibliothek</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f3efe7;
        --surface: rgba(255, 255, 255, 0.9);
        --surface-strong: rgba(255, 255, 255, 0.98);
        --surface-soft: rgba(245, 248, 247, 0.78);
        --line: rgba(20, 58, 54, 0.12);
        --line-strong: rgba(20, 58, 54, 0.22);
        --text: #16211f;
        --muted: #61726d;
        --accent: #0f766e;
        --accent-strong: #0b5c56;
        --accent-soft: rgba(15, 118, 110, 0.12);
        --danger: #ab4234;
        --danger-soft: rgba(171, 66, 52, 0.12);
        --shadow: 0 24px 80px rgba(15, 34, 31, 0.08);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.78), transparent 34%),
          linear-gradient(180deg, #fbf8f2 0%, #eef4f1 100%);
        color: var(--text);
      }

      button,
      input,
      select {
        font: inherit;
      }

      .shell {
        width: min(1360px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 28px 0 44px;
      }

      .masthead {
        display: grid;
        gap: 20px;
        margin-bottom: 22px;
      }

      .topline {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 18px;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: clamp(34px, 6vw, 58px);
        line-height: 0.96;
        letter-spacing: 0;
      }

      .lede {
        max-width: 780px;
        margin: 14px 0 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.65;
      }

      .top-actions,
      .settings-actions,
      .detail-actions,
      .secondary-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 42px;
        padding: 0 16px;
        border: 1px solid transparent;
        border-radius: 999px;
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset;
      }

      button:hover,
      button:focus-visible {
        border-color: var(--line-strong);
        outline: none;
      }

      .primary-button {
        background: var(--accent);
        color: #fff;
      }

      .primary-button:hover,
      .primary-button:focus-visible {
        background: var(--accent-strong);
      }

      .ghost-button {
        border-color: var(--line);
        background: transparent;
      }

      .danger-button {
        background: var(--danger-soft);
        color: var(--danger);
      }

      .hero-panel,
      .panel {
        border: 1px solid var(--line);
        border-radius: 24px;
        background: var(--surface);
        box-shadow: var(--shadow);
        backdrop-filter: blur(18px);
      }

      .hero-panel {
        padding: 18px;
      }

      .search-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
      }

      .search-input,
      .field input,
      .field select {
        width: 100%;
        min-height: 48px;
        padding: 0 16px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.94);
        color: var(--text);
      }

      .search-input {
        min-height: 54px;
        border-radius: 999px;
        padding: 0 20px;
        font-size: 15px;
      }

      .search-input:focus,
      .field input:focus,
      .field select:focus {
        border-color: rgba(15, 118, 110, 0.48);
        outline: none;
      }

      .filter-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 14px;
        align-items: center;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 42px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.72);
        color: var(--text);
      }

      .pill input {
        margin: 0;
        accent-color: var(--accent);
      }

      .dashboard {
        display: grid;
        grid-template-columns: minmax(360px, 1.05fr) minmax(320px, 0.95fr);
        gap: 22px;
        margin-top: 22px;
      }

      .column {
        display: grid;
        align-content: start;
        gap: 18px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
      }

      .stat {
        padding: 16px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--surface-soft);
      }

      .stat-label {
        margin: 0;
        color: var(--muted);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .stat-value {
        margin: 12px 0 0;
        font-size: 28px;
        font-weight: 820;
        line-height: 1;
      }

      .status-line {
        min-height: 22px;
        margin: 2px 6px 0;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.5;
      }

      .status-line[data-error="true"] {
        color: var(--danger);
      }

      .panel {
        padding: 18px;
      }

      .panel-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }

      .panel-heading h2,
      .detail-title,
      .auth-title {
        margin: 0;
        font-size: 19px;
      }

      .results {
        display: grid;
        gap: 12px;
      }

      .result-card {
        padding: 16px;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.72);
        cursor: pointer;
        transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
      }

      .result-card:hover,
      .result-card:focus-visible,
      .result-card[data-active="true"] {
        transform: translateY(-1px);
        border-color: rgba(15, 118, 110, 0.32);
        background: rgba(255, 255, 255, 0.96);
        outline: none;
      }

      .result-title {
        margin: 0;
        font-size: 18px;
        font-weight: 760;
        line-height: 1.24;
      }

      .result-url,
      .result-meta,
      .result-tags,
      .detail-meta,
      .detail-url,
      .empty-copy,
      .auth-copy,
      .token-hint {
        color: var(--muted);
        font-size: 13px;
      }

      .result-url,
      .result-meta,
      .result-tags,
      .result-excerpt,
      .detail-url,
      .detail-excerpt,
      .detail-content {
        margin: 10px 0 0;
      }

      .result-excerpt,
      .detail-excerpt,
      .detail-content {
        font-size: 14px;
        line-height: 1.65;
      }

      .detail-url a {
        color: var(--accent);
        text-decoration: none;
        word-break: break-word;
      }

      .detail-url a:hover {
        text-decoration: underline;
      }

      .detail-actions {
        margin-top: 18px;
      }

      .empty-state,
      .auth-state {
        padding: 18px;
        border: 1px dashed var(--line-strong);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.46);
      }

      .empty-state h3,
      .auth-state h3 {
        margin: 0;
        font-size: 18px;
      }

      .empty-copy,
      .auth-copy,
      .token-hint {
        margin: 10px 0 0;
        line-height: 1.65;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      .field span {
        font-size: 13px;
        font-weight: 760;
      }

      .auth-state .field {
        margin-top: 14px;
      }

      .auth-state .settings-actions {
        margin-top: 14px;
      }

      .result-count {
        color: var(--muted);
        font-size: 13px;
      }

      [hidden] {
        display: none !important;
      }

      @media (max-width: 1100px) {
        .dashboard {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 760px) {
        .shell {
          width: min(100vw - 20px, 1360px);
          padding-top: 20px;
        }

        .topline {
          flex-direction: column;
        }

        .search-grid {
          grid-template-columns: 1fr;
        }

        .top-actions,
        .settings-actions,
        .detail-actions,
        .secondary-actions {
          width: 100%;
        }

        button {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="masthead">
        <div class="topline">
          <div>
            <p class="eyebrow">Behind The Wall</p>
            <h1>Bibliothek</h1>
            <p class="lede">Deine gespeicherten Seiten, sauber organisiert und durchsuchbar über Titel, URL und Volltext. Die Extension fängt Artikel ein, die Web-App hier ist die eigentliche Arbeitsoberfläche.</p>
          </div>
          <div class="top-actions">
            <button id="focus-search" class="ghost-button" type="button">Suche fokussieren</button>
            <button id="refresh-results" class="primary-button" type="button">Neu laden</button>
          </div>
        </div>

        <section class="hero-panel">
          <div class="search-grid">
            <input id="search-input" class="search-input" type="search" placeholder="Suche nach Titel, URL, Volltext oder Tags">
            <button id="clear-search" class="ghost-button" type="button">Zurücksetzen</button>
          </div>
          <div class="filter-row">
            <label class="pill">
              <span>Sortierung</span>
              <select id="sort-select">
                <option value="updated-desc">Neueste zuerst</option>
                <option value="updated-asc">Älteste zuerst</option>
                <option value="title-asc">Titel A–Z</option>
              </select>
            </label>
            <label class="pill">
              <input id="tag-filter" type="checkbox">
              <span>Nur Einträge mit Tags</span>
            </label>
            <div class="secondary-actions">
              <button id="toggle-auth" class="ghost-button" type="button">Zugang</button>
              <button id="logout-button" class="ghost-button" type="button">Abmelden</button>
            </div>
          </div>
        </section>
      </header>

      <section class="dashboard">
        <div class="column">
          <section class="stats-grid">
            <article class="stat">
              <p class="stat-label">Gesamt</p>
              <p id="stat-total" class="stat-value">0</p>
            </article>
            <article class="stat">
              <p class="stat-label">Im Blick</p>
              <p id="stat-visible" class="stat-value">0</p>
            </article>
            <article class="stat">
              <p class="stat-label">Aktualisiert</p>
              <p id="stat-updated" class="stat-value">-</p>
            </article>
          </section>

          <p id="status-line" class="status-line" aria-live="polite"></p>

          <section class="panel">
            <div class="panel-heading">
              <h2>Ergebnisse</h2>
              <p id="result-count" class="result-count">0 Einträge</p>
            </div>
            <section id="results" class="results" aria-live="polite"></section>
          </section>
        </div>

        <div class="column">
          <section id="detail-panel" class="panel">
            <div class="empty-state">
              <h3>Noch kein Eintrag ausgewählt</h3>
              <p class="empty-copy">Wähle links einen gespeicherten Artikel aus. Dann bekommst du Quelle, Metadaten und den gesicherten Volltext in einer ruhigen Lesefläche.</p>
            </div>
          </section>

          <section id="auth-panel" class="panel auth-state">
            <h3 class="auth-title">Zugang zum Backend</h3>
            <p class="auth-copy">Die Bibliothek arbeitet direkt gegen dein Backend. Für diese Web-Oberfläche meldest du dich einmal mit dem API-Token an, danach bleibt die Sitzung über ein Cookie bestehen.</p>
            <label class="field">
              <span>API-Token</span>
              <input id="token-input" type="password" placeholder="Token eingeben">
            </label>
            <p class="token-hint">Das Token wird nicht im Frontend gespeichert. Der Server setzt nur eine Sitzung für diese Domain.</p>
            <div class="settings-actions">
              <button id="login-button" class="primary-button" type="button">Anmelden</button>
              <button id="clear-token" class="ghost-button" type="button">Feld leeren</button>
            </div>
          </section>
        </div>
      </section>
    </main>

    <script>
      const state = {
        authenticated: false,
        loading: false,
        query: "",
        sort: "updated-desc",
        onlyTagged: false,
        totalCount: 0,
        items: [],
        visibleItems: [],
        selectedId: ""
      };

      const els = {
        searchInput: document.querySelector("#search-input"),
        sortSelect: document.querySelector("#sort-select"),
        tagFilter: document.querySelector("#tag-filter"),
        refreshButton: document.querySelector("#refresh-results"),
        clearSearchButton: document.querySelector("#clear-search"),
        focusSearchButton: document.querySelector("#focus-search"),
        toggleAuthButton: document.querySelector("#toggle-auth"),
        logoutButton: document.querySelector("#logout-button"),
        statusLine: document.querySelector("#status-line"),
        results: document.querySelector("#results"),
        detailPanel: document.querySelector("#detail-panel"),
        authPanel: document.querySelector("#auth-panel"),
        tokenInput: document.querySelector("#token-input"),
        loginButton: document.querySelector("#login-button"),
        clearTokenButton: document.querySelector("#clear-token"),
        statTotal: document.querySelector("#stat-total"),
        statVisible: document.querySelector("#stat-visible"),
        statUpdated: document.querySelector("#stat-updated"),
        resultCount: document.querySelector("#result-count")
      };

      let searchTimer = 0;

      document.addEventListener("keydown", (event) => {
        if (event.key === "/" && document.activeElement !== els.searchInput) {
          event.preventDefault();
          els.searchInput.focus();
        }

        if (event.key === "Escape") {
          if (document.activeElement === els.searchInput && els.searchInput.value) {
            els.searchInput.value = "";
            state.query = "";
            void loadItems();
          } else if (state.selectedId) {
            state.selectedId = "";
            renderAll();
          }
        }
      });

      els.searchInput.addEventListener("input", () => {
        state.query = els.searchInput.value.trim();
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(() => {
          void loadItems();
        }, 180);
      });

      els.sortSelect.addEventListener("change", () => {
        state.sort = els.sortSelect.value;
        deriveVisibleItems();
        renderAll();
      });

      els.tagFilter.addEventListener("change", () => {
        state.onlyTagged = els.tagFilter.checked;
        deriveVisibleItems();
        renderAll();
      });

      els.refreshButton.addEventListener("click", () => {
        void loadItems();
      });

      els.clearSearchButton.addEventListener("click", () => {
        els.searchInput.value = "";
        state.query = "";
        void loadItems();
      });

      els.focusSearchButton.addEventListener("click", () => {
        els.searchInput.focus();
      });

      els.toggleAuthButton.addEventListener("click", () => {
        els.authPanel.hidden = !els.authPanel.hidden;
      });

      els.logoutButton.addEventListener("click", async () => {
        try {
          await fetch("/auth/session", { method: "DELETE" });
          state.authenticated = false;
          state.items = [];
          state.visibleItems = [];
          state.selectedId = "";
          els.authPanel.hidden = false;
          setStatus("Sitzung beendet.");
          renderAll();
        } catch (error) {
          setStatus(error.message || "Abmelden fehlgeschlagen.", true);
        }
      });

      els.loginButton.addEventListener("click", async () => {
        await authenticate();
      });

      els.clearTokenButton.addEventListener("click", () => {
        els.tokenInput.value = "";
        els.tokenInput.focus();
      });

      els.results.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest("[data-delete-id]");
        if (deleteButton) {
          event.stopPropagation();
          await deleteItem(deleteButton.dataset.deleteId);
          return;
        }

        const card = event.target.closest("[data-item-id]");
        if (!card) {
          return;
        }

        state.selectedId = card.dataset.itemId;
        renderResults();
        renderDetail();
      });

      els.detailPanel.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest("[data-delete-id]");
        const openButton = event.target.closest("[data-open-source]");

        if (openButton) {
          const item = state.visibleItems.find((entry) => entry.id === state.selectedId);
          if (item) {
            window.open(item.url, "_blank", "noopener,noreferrer");
          }
        }

        if (deleteButton) {
          await deleteItem(deleteButton.dataset.deleteId);
        }
      });

      void bootstrap();

      async function bootstrap() {
        await loadSession();
        if (state.authenticated) {
          await loadItems();
        } else {
          setStatus("Bitte melde dich mit deinem API-Token an, um die Bibliothek zu laden.");
          renderAll();
        }
      }

      async function loadSession() {
        try {
          const response = await fetch("/api/session");
          const json = await response.json().catch(() => ({}));
          state.authenticated = Boolean(json.authenticated);
          els.authPanel.hidden = state.authenticated;
        } catch {
          state.authenticated = false;
          els.authPanel.hidden = false;
        }
      }

      async function authenticate() {
        const token = els.tokenInput.value.trim();
        if (!token) {
          setStatus("Bitte gib zuerst ein API-Token ein.", true);
          els.authPanel.hidden = false;
          return;
        }

        try {
          const response = await fetch("/auth/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
          });
          const json = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(json.error || "Anmeldung fehlgeschlagen.");
          }
          state.authenticated = true;
          els.authPanel.hidden = true;
          els.tokenInput.value = "";
          setStatus("Sitzung aktiv.");
          await loadItems();
        } catch (error) {
          state.authenticated = false;
          els.authPanel.hidden = false;
          setStatus(error.message || "Anmeldung fehlgeschlagen.", true);
        }
      }

      async function loadItems() {
        if (!state.authenticated) {
          renderAll();
          return;
        }

        state.loading = true;
        renderResults();
        setStatus("Lade Bibliothek...");

        try {
          const search = new URLSearchParams();
          if (state.query) {
            search.set("q", state.query);
          }

          const response = await fetch("/api/bookmarks?" + search.toString());
          const json = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(json.error || "Bibliothek konnte nicht geladen werden.");
          }

          state.items = json.items || [];
          state.totalCount = Number(json.totalCount || state.items.length || 0);
          deriveVisibleItems();
          setStatus(
            state.query
              ? state.visibleItems.length + ' Treffer für "' + state.query + '".'
              : state.visibleItems.length + " Einträge geladen."
          );
        } catch (error) {
          state.items = [];
          state.visibleItems = [];
          state.selectedId = "";
          setStatus(error.message || "Bibliothek konnte nicht geladen werden.", true);
        } finally {
          state.loading = false;
          renderAll();
        }
      }

      async function deleteItem(id) {
        try {
          const response = await fetch("/api/bookmarks/" + encodeURIComponent(id), {
            method: "DELETE"
          });
          const json = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(json.error || "Eintrag konnte nicht gelöscht werden.");
          }
          setStatus("Eintrag gelöscht.");
          await loadItems();
        } catch (error) {
          setStatus(error.message || "Eintrag konnte nicht gelöscht werden.", true);
        }
      }

      function deriveVisibleItems() {
        let items = state.items.slice();

        if (state.onlyTagged) {
          items = items.filter((item) => Array.isArray(item.tags) && item.tags.length > 0);
        }

        items.sort((a, b) => {
          if (state.sort === "updated-asc") {
            return new Date(a.updatedAt) - new Date(b.updatedAt);
          }
          if (state.sort === "title-asc") {
            return String(a.title || a.normalizedUrl).localeCompare(String(b.title || b.normalizedUrl), "de");
          }
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        state.visibleItems = items;

        if (!state.selectedId || !state.visibleItems.some((item) => item.id === state.selectedId)) {
          state.selectedId = state.visibleItems[0]?.id || "";
        }
      }

      function renderAll() {
        renderStats();
        renderResults();
        renderDetail();
      }

      function renderStats() {
        els.statTotal.textContent = String(state.totalCount);
        els.statVisible.textContent = String(state.visibleItems.length);
        els.statUpdated.textContent = state.visibleItems[0] ? formatShortDate(state.visibleItems[0].updatedAt) : "-";
        els.resultCount.textContent = state.visibleItems.length + " Einträge";
      }

      function renderResults() {
        if (!state.authenticated) {
          els.results.innerHTML = emptyState(
            "Anmeldung fehlt",
            "Öffne rechts den Zugangsbereich, melde dich mit deinem API-Token an und die Bibliothek lädt sofort los."
          );
          return;
        }

        if (state.loading) {
          els.results.innerHTML = emptyState(
            "Bibliothek lädt",
            "Ich hole gerade deine gespeicherten Seiten und sortiere sie in diese Ansicht ein."
          );
          return;
        }

        if (!state.visibleItems.length) {
          els.results.innerHTML = emptyState(
            state.query || state.onlyTagged ? "Keine Treffer" : "Noch keine Einträge",
            state.query || state.onlyTagged
              ? "Mit der aktuellen Suche oder dem aktiven Filter ist im Moment nichts sichtbar."
              : "Speichere zuerst eine Seite über die Extension, dann taucht sie hier automatisch auf."
          );
          return;
        }

        els.results.innerHTML = state.visibleItems.map((item) => {
          const tags = item.tags?.length
            ? '<p class="result-tags">' + item.tags.map(escapeHtml).join(" · ") + '</p>'
            : "";
          const active = item.id === state.selectedId ? "true" : "false";

          return '<article class="result-card" tabindex="0" data-item-id="' + escapeAttr(item.id) + '" data-active="' + active + '">' +
            '<h3 class="result-title">' + escapeHtml(item.title || item.normalizedUrl) + '</h3>' +
            '<p class="result-url">' + escapeHtml(item.normalizedUrl || item.url) + '</p>' +
            tags +
            '<p class="result-excerpt">' + escapeHtml(item.excerpt || item.description || "Kein Auszug verfügbar.") + '</p>' +
            '<p class="result-meta">Aktualisiert: ' + escapeHtml(formatDate(item.updatedAt)) + '</p>' +
          '</article>';
        }).join("");
      }

      function renderDetail() {
        const item = state.visibleItems.find((entry) => entry.id === state.selectedId);
        if (!item) {
          els.detailPanel.innerHTML = emptyState(
            "Noch kein Eintrag ausgewählt",
            "Wähle links einen gespeicherten Artikel aus. Dann bekommst du Quelle, Metadaten und den gesicherten Volltext in einer ruhigeren Detailansicht."
          );
          return;
        }

        const tags = item.tags?.length
          ? '<p class="detail-meta">Tags: ' + item.tags.map(escapeHtml).join(" · ") + "</p>"
          : "";

        els.detailPanel.innerHTML =
          '<h2 class="detail-title">' + escapeHtml(item.title || item.normalizedUrl) + '</h2>' +
          '<p class="detail-url"><a href="' + escapeAttr(item.url) + '" target="_blank" rel="noreferrer">' + escapeHtml(item.url) + "</a></p>" +
          '<p class="detail-meta">Gespeichert: ' + escapeHtml(formatDate(item.createdAt)) + "</p>" +
          '<p class="detail-meta">Zuletzt aktualisiert: ' + escapeHtml(formatDate(item.updatedAt)) + "</p>" +
          tags +
          '<p class="detail-excerpt">' + escapeHtml(item.excerpt || item.description || "Kein Auszug verfügbar.") + "</p>" +
          '<div class="detail-actions">' +
            '<button class="primary-button" type="button" data-open-source>Quelle öffnen</button>' +
            '<button class="danger-button" type="button" data-delete-id="' + escapeAttr(item.id) + '">Löschen</button>' +
          "</div>" +
          '<p class="detail-content">' + escapeHtml(item.content || item.description || item.excerpt || "") + "</p>";
      }

      function setStatus(message, isError = false) {
        els.statusLine.textContent = message;
        els.statusLine.dataset.error = isError ? "true" : "false";
      }

      function formatDate(value) {
        return new Date(value).toLocaleString("de-DE", {
          dateStyle: "medium",
          timeStyle: "short"
        });
      }

      function formatShortDate(value) {
        return new Date(value).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit"
        });
      }

      function emptyState(title, copy) {
        return '<div class="empty-state"><h3>' + escapeHtml(title) + '</h3><p class="empty-copy">' + escapeHtml(copy) + "</p></div>";
      }

      function escapeHtml(value) {
        return String(value || "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      }

      function escapeAttr(value) {
        return escapeHtml(value);
      }
    </script>
  </body>
</html>`;
}

module.exports = { renderLibraryPage };
