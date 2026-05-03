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
        --bg: #f7f5ef;
        --surface: #ffffff;
        --surface-subtle: #fcfbf8;
        --surface-muted: #f2efe8;
        --line: #dfdbd1;
        --line-strong: #c9c3b8;
        --text: #17211f;
        --muted: #687670;
        --muted-strong: #4e5d57;
        --accent: #1f7a72;
        --accent-strong: #175d57;
        --accent-soft: #e2f0ed;
        --danger: #b24f44;
        --danger-soft: #f8e6e3;
        --shadow: 0 18px 40px rgba(22, 33, 31, 0.06);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.92), transparent 28%),
          linear-gradient(180deg, #faf8f3 0%, #f5f2eb 100%);
        color: var(--text);
      }

      button,
      input,
      select {
        font: inherit;
      }

      .shell {
        width: min(1440px, calc(100vw - 40px));
        margin: 0 auto;
        padding: 24px 0 36px;
      }

      .masthead {
        display: grid;
        gap: 18px;
        margin-bottom: 18px;
      }

      .topline {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
      }

      .eyebrow {
        margin: 0 0 10px;
        color: var(--accent);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: clamp(34px, 5vw, 64px);
        line-height: 0.92;
        letter-spacing: 0;
      }

      .lede {
        max-width: 720px;
        margin: 12px 0 0;
        color: var(--muted);
        font-size: 17px;
        line-height: 1.55;
      }

      .top-actions,
      .settings-actions,
      .detail-actions,
      .secondary-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 40px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
        transition: border-color 140ms ease, background 140ms ease, transform 140ms ease, box-shadow 140ms ease;
      }

      button:hover,
      button:focus-visible {
        border-color: var(--line-strong);
        box-shadow: 0 4px 14px rgba(22, 33, 31, 0.07);
        outline: none;
      }

      .primary-button {
        background: var(--accent);
        border-color: var(--accent);
        color: #fff;
      }

      .primary-button:hover,
      .primary-button:focus-visible {
        background: var(--accent-strong);
        border-color: var(--accent-strong);
      }

      .ghost-button {
        background: var(--surface-subtle);
      }

      .danger-button {
        background: var(--danger-soft);
        border-color: rgba(178, 79, 68, 0.18);
        color: var(--danger);
      }

      .toolbar,
      .panel,
      .metric,
      .reader-hero {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
        box-shadow: var(--shadow);
      }

      .toolbar {
        display: grid;
        gap: 14px;
        padding: 16px;
      }

      .toolbar-top {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
      }

      .toolbar-bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .search-input,
      .field input,
      .field select {
        width: 100%;
        min-height: 44px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text);
      }

      .search-input {
        min-height: 48px;
        padding: 0 16px;
        font-size: 15px;
      }

      .search-input:focus,
      .field input:focus,
      .field select:focus {
        border-color: rgba(15, 118, 110, 0.48);
        outline: none;
      }

      .filter-row,
      .toolbar-actions,
      .segment-group,
      .quick-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 40px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface-subtle);
        color: var(--text);
      }

      .pill input {
        margin: 0;
        accent-color: var(--accent);
      }

      .quick-stat {
        display: inline-flex;
        align-items: baseline;
        gap: 8px;
        min-height: 40px;
        padding: 0 12px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface-subtle);
      }

      .quick-stat strong {
        font-size: 18px;
      }

      .quick-stat span {
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .dashboard {
        display: grid;
        grid-template-columns: minmax(350px, 420px) minmax(0, 1fr);
        gap: 18px;
        margin-top: 18px;
      }

      .column {
        display: grid;
        align-content: start;
        gap: 16px;
      }

      .panel {
        padding: 18px;
      }

      .results-panel {
        padding: 0;
        overflow: hidden;
      }

      .results-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--line);
        background: var(--surface-subtle);
      }

      .results-title-wrap {
        display: grid;
        gap: 4px;
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
      .auth-title,
      .reader-title {
        margin: 0;
        font-size: 22px;
        line-height: 1.2;
      }

      .panel-kicker {
        margin: 0;
        color: var(--muted);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .result-count {
        color: var(--muted);
        font-size: 13px;
      }

      .status-line {
        min-height: 20px;
        padding: 0 4px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.5;
      }

      .status-line[data-error="true"] {
        color: var(--danger);
      }

      .results {
        display: grid;
        gap: 0;
      }

      .result-card {
        position: relative;
        padding: 16px 18px;
        border: 0;
        border-bottom: 1px solid var(--line);
        background: transparent;
        cursor: pointer;
        transition: background 120ms ease, border-color 120ms ease;
      }

      .result-card:hover,
      .result-card:focus-visible,
      .result-card[data-active="true"] {
        background: var(--surface-subtle);
        outline: none;
      }

      .result-card[data-active="true"]::before {
        content: "";
        position: absolute;
        inset: 10px auto 10px 0;
        width: 3px;
        border-radius: 99px;
        background: var(--accent);
      }

      .result-topline {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .result-title {
        margin: 0;
        font-size: 16px;
        font-weight: 760;
        line-height: 1.34;
      }

      .result-url,
      .result-domain,
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

      .result-domain,
      .result-meta,
      .result-tags,
      .result-excerpt,
      .detail-url,
      .detail-excerpt,
      .detail-content,
      .detail-description,
      .reader-copy {
        margin: 8px 0 0;
      }

      .result-excerpt,
      .detail-excerpt,
      .detail-content {
        font-size: 14px;
        line-height: 1.68;
      }

      .result-excerpt {
        color: var(--muted-strong);
      }

      .result-meta {
        white-space: nowrap;
      }

      .reader-hero {
        padding: 22px;
        background:
          linear-gradient(180deg, rgba(226, 240, 237, 0.7) 0%, rgba(255, 255, 255, 0.92) 100%);
      }

      .reader-title {
        font-size: clamp(28px, 3vw, 42px);
        line-height: 1.06;
      }

      .reader-copy {
        max-width: 62ch;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.7;
      }

      .detail-panel {
        overflow: hidden;
      }

      .detail-card {
        padding: 22px;
      }

      .detail-header {
        display: grid;
        gap: 10px;
        padding-bottom: 18px;
        border-bottom: 1px solid var(--line);
      }

      .detail-url a {
        color: var(--accent-strong);
        text-decoration: none;
        word-break: break-word;
      }

      .detail-url a:hover {
        text-decoration: underline;
      }

      .detail-description {
        color: var(--muted-strong);
        font-size: 15px;
        line-height: 1.7;
      }

      .detail-grid {
        display: grid;
        grid-template-columns: 220px minmax(0, 1fr);
        gap: 22px;
        margin-top: 18px;
      }

      .detail-sidebar {
        display: grid;
        align-content: start;
        gap: 16px;
      }

      .meta-block {
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface-subtle);
      }

      .meta-label {
        margin: 0 0 8px;
        color: var(--muted);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .meta-value {
        margin: 0;
        font-size: 14px;
        line-height: 1.55;
      }

      .detail-body {
        min-width: 0;
      }

      .detail-body h3 {
        margin: 0 0 10px;
        font-size: 18px;
      }

      .detail-content {
        padding: 16px 18px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface-subtle);
        color: var(--muted-strong);
        white-space: pre-wrap;
        word-break: break-word;
      }

      .detail-actions {
        margin-top: 16px;
      }

      .empty-state,
      .auth-state {
        padding: 18px;
        border: 1px dashed var(--line-strong);
        border-radius: 8px;
        background: var(--surface-subtle);
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

      .auth-panel {
        border-style: dashed;
        background: linear-gradient(180deg, #fbfaf7 0%, #f7f4ec 100%);
      }

      .auth-panel[hidden] {
        display: none !important;
      }

      [hidden] {
        display: none !important;
      }

      @media (max-width: 1100px) {
        .dashboard {
          grid-template-columns: 1fr;
        }

        .detail-grid {
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

        .toolbar-top,
        .toolbar-bottom {
          grid-template-columns: 1fr;
        }

        .top-actions,
        .settings-actions,
        .detail-actions,
        .secondary-actions,
        .toolbar-actions,
        .filter-row {
          width: 100%;
        }

        button {
          width: 100%;
        }

        .result-topline {
          flex-direction: column;
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
            <p class="lede">Deine gespeicherten Seiten an einem Ort. Die Extension sammelt ein, hier sichtest, suchst und liest du ruhig weiter.</p>
          </div>
          <div class="top-actions">
            <button id="focus-search" class="ghost-button" type="button">Suche fokussieren</button>
            <button id="refresh-results" class="primary-button" type="button">Neu laden</button>
          </div>
        </div>

        <section class="toolbar">
          <div class="toolbar-top">
            <input id="search-input" class="search-input" type="search" placeholder="Suche nach Titel, URL, Volltext oder Tags">
            <button id="clear-search" class="ghost-button" type="button">Zurücksetzen</button>
          </div>
          <div class="toolbar-bottom">
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
                <span>Nur mit Tags</span>
              </label>
            </div>
            <div class="toolbar-actions">
              <div class="quick-stats">
                <div class="quick-stat"><strong id="stat-total">0</strong><span>Gesamt</span></div>
                <div class="quick-stat"><strong id="stat-visible">0</strong><span>Im Blick</span></div>
                <div class="quick-stat"><strong id="stat-updated">-</strong><span>Zuletzt</span></div>
              </div>
              <div class="secondary-actions">
                <button id="toggle-auth" class="ghost-button" type="button">Zugang</button>
                <button id="logout-button" class="ghost-button" type="button">Abmelden</button>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section class="dashboard">
        <div class="column">
          <section class="panel results-panel">
            <div class="results-header">
              <div class="results-title-wrap">
                <p class="panel-kicker">Ablage</p>
                <h2>Ergebnisse</h2>
              </div>
              <p id="result-count" class="result-count">0 Einträge</p>
            </div>
            <p id="status-line" class="status-line" aria-live="polite"></p>
            <section id="results" class="results" aria-live="polite"></section>
          </section>
        </div>

        <div class="column">
          <section class="reader-hero">
            <p class="panel-kicker">Reader</p>
            <h2 class="reader-title">Ein Ort zum Wiederfinden, nicht nur zum Wegklicken.</h2>
            <p class="reader-copy">Wähle links einen gespeicherten Eintrag aus. Rechts bekommst du Quelle, Zeitpunkte, Metadaten und den extrahierten Text in einer ruhigeren Lesefläche.</p>
          </section>

          <section id="detail-panel" class="panel detail-panel">
            <div class="empty-state">
              <h3>Noch kein Eintrag ausgewählt</h3>
              <p class="empty-copy">Sobald du links etwas auswählst, wird daraus hier eine lesbare Detailansicht mit Quelle, Metadaten und Volltext.</p>
            </div>
          </section>

          <section id="auth-panel" class="panel auth-state auth-panel">
            <h3 class="auth-title">Zugang zum Backend</h3>
            <p class="auth-copy">Diese Web-Oberfläche meldet sich einmal mit deinem API-Token an und arbeitet danach mit einer Sitzung auf dieser Domain weiter.</p>
            <label class="field">
              <span>API-Token</span>
              <input id="token-input" type="password" placeholder="Token eingeben">
            </label>
            <p class="token-hint">Das Token bleibt nicht im Frontend liegen. Der Server setzt nur eine Sitzung für diese Domain.</p>
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
        syncAuthButtonLabel();
      });

      els.logoutButton.addEventListener("click", async () => {
        try {
          await fetch("/auth/session", { method: "DELETE" });
          state.authenticated = false;
          state.items = [];
          state.visibleItems = [];
          state.selectedId = "";
          els.authPanel.hidden = false;
          syncAuthButtonLabel();
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
          syncAuthButtonLabel();
        } catch {
          state.authenticated = false;
          els.authPanel.hidden = false;
          syncAuthButtonLabel();
        }
      }

      async function authenticate() {
        const token = els.tokenInput.value.trim();
        if (!token) {
          setStatus("Bitte gib zuerst ein API-Token ein.", true);
          els.authPanel.hidden = false;
          syncAuthButtonLabel();
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
          syncAuthButtonLabel();
          els.tokenInput.value = "";
          setStatus("Sitzung aktiv.");
          await loadItems();
        } catch (error) {
          state.authenticated = false;
          els.authPanel.hidden = false;
          syncAuthButtonLabel();
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
        syncAuthButtonLabel();
      }

      function syncAuthButtonLabel() {
        els.toggleAuthButton.textContent = els.authPanel.hidden ? "Zugang zeigen" : "Zugang";
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
            "Öffne den Bereich Zugang, melde dich mit deinem API-Token an und die Bibliothek lädt sofort los."
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
          const domain = escapeHtml(formatDomain(item.normalizedUrl || item.url));

          return '<article class="result-card" tabindex="0" data-item-id="' + escapeAttr(item.id) + '" data-active="' + active + '">' +
            '<div class="result-topline">' +
              '<div>' +
                '<p class="result-domain">' + domain + '</p>' +
                '<h3 class="result-title">' + escapeHtml(item.title || item.normalizedUrl) + '</h3>' +
              '</div>' +
              '<p class="result-meta">' + escapeHtml(formatRelativeDate(item.updatedAt)) + '</p>' +
            '</div>' +
            tags +
            '<p class="result-excerpt">' + escapeHtml(item.excerpt || item.description || "Kein Auszug verfügbar.") + '</p>' +
            '<p class="result-url">' + escapeHtml(item.normalizedUrl || item.url) + '</p>' +
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
          ? '<div class="meta-block"><p class="meta-label">Tags</p><p class="meta-value">' + item.tags.map(escapeHtml).join(" · ") + "</p></div>"
          : "";

        els.detailPanel.innerHTML =
          '<article class="detail-card">' +
            '<div class="detail-header">' +
              '<p class="panel-kicker">' + escapeHtml(formatDomain(item.normalizedUrl || item.url)) + '</p>' +
              '<h2 class="detail-title">' + escapeHtml(item.title || item.normalizedUrl) + '</h2>' +
              '<p class="detail-url"><a href="' + escapeAttr(item.url) + '" target="_blank" rel="noreferrer">' + escapeHtml(item.url) + "</a></p>" +
              '<p class="detail-description">' + escapeHtml(item.excerpt || item.description || "Kein Auszug verfügbar.") + "</p>" +
              '<div class="detail-actions">' +
                '<button class="primary-button" type="button" data-open-source>Quelle öffnen</button>' +
                '<button class="danger-button" type="button" data-delete-id="' + escapeAttr(item.id) + '">Löschen</button>' +
              "</div>" +
            "</div>" +
            '<div class="detail-grid">' +
              '<aside class="detail-sidebar">' +
                '<div class="meta-block"><p class="meta-label">Gespeichert</p><p class="meta-value">' + escapeHtml(formatDate(item.createdAt)) + "</p></div>" +
                '<div class="meta-block"><p class="meta-label">Aktualisiert</p><p class="meta-value">' + escapeHtml(formatDate(item.updatedAt)) + "</p></div>" +
                tags +
              "</aside>" +
              '<div class="detail-body">' +
                '<h3>Gesicherter Text</h3>' +
                '<div class="detail-content">' + escapeHtml(item.content || item.description || item.excerpt || "Kein Text gespeichert.") + "</div>" +
              "</div>" +
            "</div>" +
          "</article>";
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

      function formatRelativeDate(value) {
        const date = new Date(value);
        const diffMs = Date.now() - date.getTime();
        const diffHours = Math.max(1, Math.round(diffMs / 36e5));

        if (diffHours < 24) {
          return "vor " + diffHours + " h";
        }

        const diffDays = Math.round(diffHours / 24);
        if (diffDays < 7) {
          return "vor " + diffDays + " T";
        }

        return formatShortDate(value);
      }

      function formatDomain(value) {
        try {
          return new URL(value).hostname.replace(/^www\./, "");
        } catch {
          return value;
        }
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
