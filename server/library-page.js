function renderLibraryPage() {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Behind The Wall — Bibliothek</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon32.png">
    <link rel="icon" type="image/png" sizes="128x128" href="/icons/icon128.png">
    <link rel="apple-touch-icon" href="/icons/icon128.png">
    <style>
      :root {
        color-scheme: light;
        --bg: #faf8f3;
        --surface: #ffffff;
        --surface-subtle: #fcfbf8;
        --surface-muted: #f2efe8;
        --line: #e5e0d4;
        --line-strong: #c9c3b8;
        --text: #17211f;
        --muted: #6b7872;
        --muted-strong: #4e5d57;
        --accent: #1f7a72;
        --accent-strong: #175d57;
        --accent-soft: #e2f0ed;
        --accent-ring: rgba(31, 122, 114, 0.18);
        --danger: #b24f44;
        --danger-soft: #f8e6e3;
        --warn-soft: #fbf1d9;
        --shadow-xs: 0 1px 2px rgba(22, 33, 31, 0.04);
        --shadow-sm: 0 4px 14px rgba(22, 33, 31, 0.05);
        --shadow: 0 8px 24px rgba(22, 33, 31, 0.06);
        --radius-sm: 8px;
        --radius: 10px;
        --radius-lg: 14px;
        --transition: 160ms cubic-bezier(0.4, 0, 0.2, 1);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-feature-settings: "cv11", "ss01";
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
      }

      body {
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.9), transparent 32%),
          linear-gradient(180deg, #faf8f3 0%, #f5f2ea 100%);
      }

      button,
      input,
      select,
      textarea {
        font: inherit;
        color: inherit;
      }

      a {
        color: inherit;
      }

      .shell {
        width: min(1440px, calc(100vw - 40px));
        margin: 0 auto;
        padding: 28px 0 36px;
      }

      /* ---------- Header ---------- */
      .masthead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 0 4px;
        margin-bottom: 18px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .brand-mark {
        display: block;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        object-fit: cover;
        background: var(--surface);
        box-shadow: 0 6px 16px rgba(31, 122, 114, 0.18), 0 0 0 1px var(--line);
      }

      .brand-text .eyebrow {
        margin: 0;
        color: var(--accent);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .brand-text h1 {
        margin: 2px 0 0;
        font-size: 26px;
        line-height: 1;
        letter-spacing: -0.01em;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* ---------- Buttons ---------- */
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 38px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
        font-weight: 530;
        transition: border-color var(--transition), background var(--transition),
          box-shadow var(--transition), color var(--transition), transform var(--transition);
      }

      button:hover {
        border-color: var(--line-strong);
        background: var(--surface-subtle);
      }

      button:focus-visible {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-ring);
      }

      button:active {
        transform: translateY(0.5px);
      }

      .primary-button {
        background: var(--accent);
        border-color: var(--accent);
        color: #fff;
      }

      .primary-button:hover {
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

      .danger-button:hover {
        background: #f3d6d1;
        border-color: rgba(178, 79, 68, 0.32);
      }

      .icon-button {
        width: 38px;
        height: 38px;
        min-height: 0;
        padding: 0;
      }

      .icon-button svg {
        width: 16px;
        height: 16px;
      }

      .auth-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 38px;
        padding: 0 12px 0 10px;
        border-radius: 999px;
        background: var(--surface);
        border: 1px solid var(--line);
        font-size: 13px;
        font-weight: 600;
      }

      .auth-pill[data-state="ok"] {
        background: var(--accent-soft);
        border-color: rgba(31, 122, 114, 0.18);
        color: var(--accent-strong);
      }

      .auth-pill[data-state="off"] {
        background: var(--warn-soft);
        border-color: rgba(170, 130, 40, 0.22);
        color: #7a5c0f;
      }

      .auth-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        opacity: 0.7;
      }

      /* ---------- Tooltip ---------- */
      [data-tooltip] {
        position: relative;
      }

      [data-tooltip]::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translate(-50%, 4px);
        padding: 6px 9px;
        background: #17211f;
        color: #fff;
        font-size: 11.5px;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;
        border-radius: 6px;
        opacity: 0;
        pointer-events: none;
        z-index: 50;
        transition: opacity 140ms ease, transform 140ms ease;
      }

      [data-tooltip]::before {
        content: "";
        position: absolute;
        bottom: calc(100% + 2px);
        left: 50%;
        transform: translate(-50%, 4px);
        border: 5px solid transparent;
        border-top-color: #17211f;
        opacity: 0;
        pointer-events: none;
        z-index: 50;
        transition: opacity 140ms ease, transform 140ms ease;
      }

      [data-tooltip]:hover::after,
      [data-tooltip]:hover::before,
      [data-tooltip]:focus-visible::after,
      [data-tooltip]:focus-visible::before {
        opacity: 1;
        transform: translate(-50%, 0);
      }

      [data-tooltip-anchor="end"]::after,
      [data-tooltip-anchor="end"]::before {
        left: auto;
        right: 0;
        transform: translate(0, 4px);
      }

      [data-tooltip-anchor="end"]:hover::after,
      [data-tooltip-anchor="end"]:hover::before,
      [data-tooltip-anchor="end"]:focus-visible::after,
      [data-tooltip-anchor="end"]:focus-visible::before {
        transform: translate(0, 0);
      }

      [data-tooltip-anchor="end"]::before {
        right: 12px;
      }

      /* ---------- Toolbar ---------- */
      .toolbar {
        display: grid;
        gap: 14px;
        padding: 14px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
      }

      .search-shell {
        position: relative;
      }

      .search-shell .search-icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        color: var(--muted);
        pointer-events: none;
      }

      .search-shell .kbd-hint {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--muted);
        font-size: 11px;
        pointer-events: none;
      }

      .search-shell .kbd-hint kbd {
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
        font-size: 11px;
        padding: 2px 6px;
        border: 1px solid var(--line);
        border-bottom-width: 2px;
        border-radius: 5px;
        background: var(--surface-muted);
        color: var(--muted-strong);
      }

      .search-shell.has-value .kbd-hint {
        display: none;
      }

      .search-shell .search-clear {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        min-height: 0;
        padding: 0;
        border-radius: 8px;
        border: 0;
        background: transparent;
        color: var(--muted);
        display: none;
      }

      .search-shell.has-value .search-clear {
        display: inline-flex;
      }

      .search-shell .search-clear:hover {
        background: var(--surface-muted);
        color: var(--text);
      }

      .search-shell input {
        width: 100%;
        height: 50px;
        padding: 0 56px 0 46px;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface-subtle);
        font-size: 15px;
        transition: border-color var(--transition), box-shadow var(--transition),
          background var(--transition);
      }

      .search-shell input::placeholder {
        color: var(--muted);
      }

      .search-shell input:focus {
        background: var(--surface);
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-ring);
        outline: none;
      }

      .filter-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }

      .filter-row .stats-strip {
        margin-left: auto;
      }

      /* ---------- Custom select ---------- */
      .select-shell {
        position: relative;
        display: inline-flex;
      }

      .select-shell select {
        appearance: none;
        -webkit-appearance: none;
        height: 38px;
        padding: 0 38px 0 14px;
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        background: var(--surface-subtle);
        color: var(--text);
        font-weight: 530;
        cursor: pointer;
        transition: border-color var(--transition), background var(--transition),
          box-shadow var(--transition);
      }

      .select-shell select:hover {
        border-color: var(--line-strong);
        background: var(--surface);
      }

      .select-shell select:focus-visible {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-ring);
      }

      .select-chevron {
        position: absolute;
        right: 12px;
        top: 50%;
        width: 14px;
        height: 14px;
        margin-top: -7px;
        color: var(--muted-strong);
        pointer-events: none;
      }

      /* ---------- Stats strip ---------- */
      .stats-strip {
        display: inline-flex;
        align-items: center;
        gap: 18px;
        padding: 0 14px;
        height: 38px;
        border-radius: var(--radius-sm);
        background: var(--surface-subtle);
        border: 1px solid var(--line);
        color: var(--muted-strong);
        font-size: 13px;
      }

      .stats-strip .sep {
        width: 1px;
        height: 14px;
        background: var(--line);
      }

      .stats-strip strong {
        color: var(--text);
        font-weight: 700;
        margin-right: 4px;
      }

      /* ---------- Dashboard ---------- */
      .dashboard {
        display: grid;
        grid-template-columns: minmax(360px, 460px) minmax(0, 1fr);
        gap: 18px;
        margin-top: 18px;
        align-items: start;
      }

      .panel {
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        background: var(--surface);
        box-shadow: var(--shadow-sm);
      }

      .results-panel {
        overflow: hidden;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        min-height: calc(100vh - 240px);
        max-height: calc(100vh - 180px);
      }

      .results-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 18px;
        border-bottom: 1px solid var(--line);
        background: var(--surface-subtle);
      }

      .results-header h2 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted-strong);
      }

      .result-count {
        color: var(--muted);
        font-size: 13px;
        font-variant-numeric: tabular-nums;
      }

      .results {
        overflow: auto;
        scroll-behavior: smooth;
      }

      .results::-webkit-scrollbar {
        width: 10px;
      }
      .results::-webkit-scrollbar-thumb {
        background: var(--line);
        border-radius: 999px;
        border: 2px solid var(--surface);
      }
      .results::-webkit-scrollbar-thumb:hover {
        background: var(--line-strong);
      }

      .result-card {
        position: relative;
        display: block;
        width: 100%;
        text-align: left;
        padding: 16px 18px;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid var(--line);
        background: transparent;
        cursor: pointer;
        transition: background var(--transition), padding-left var(--transition);
        font-weight: 400;
        color: var(--text);
      }

      .result-card:hover {
        background: var(--surface-subtle);
      }

      .result-card:focus-visible {
        outline: none;
        background: var(--surface-subtle);
        box-shadow: inset 3px 0 0 var(--accent);
      }

      .result-card[data-active="true"] {
        background: linear-gradient(90deg, var(--accent-soft) 0%, rgba(252, 251, 248, 0) 80%);
      }

      .result-card[data-active="true"]::before {
        content: "";
        position: absolute;
        inset: 12px auto 12px 0;
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

      .result-domain {
        margin: 0;
        font-size: 11.5px;
        color: var(--muted);
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: lowercase;
      }

      .result-title {
        margin: 4px 0 0;
        font-size: 15.5px;
        font-weight: 650;
        line-height: 1.34;
        letter-spacing: -0.005em;
      }

      .result-meta {
        margin: 0;
        font-size: 12px;
        color: var(--muted);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
        flex-shrink: 0;
      }

      .result-excerpt {
        margin: 8px 0 0;
        font-size: 13.5px;
        line-height: 1.55;
        color: var(--muted-strong);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .result-tags {
        margin: 10px 0 0;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .tag-chip {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        font-size: 11.5px;
        font-weight: 600;
        color: var(--accent-strong);
        background: var(--accent-soft);
        border-radius: 999px;
      }

      /* ---------- Detail panel ---------- */
      .detail-panel {
        overflow: hidden;
      }

      .detail-card {
        padding: 26px 28px 22px;
      }

      .detail-domain {
        margin: 0;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        background: var(--surface-muted);
        border-radius: 999px;
        color: var(--muted-strong);
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: lowercase;
      }

      .detail-title {
        margin: 12px 0 0;
        font-size: clamp(22px, 2.4vw, 30px);
        line-height: 1.2;
        letter-spacing: -0.01em;
        font-weight: 700;
      }

      .detail-url {
        margin: 8px 0 0;
        font-size: 13px;
        color: var(--muted);
        word-break: break-all;
      }

      .detail-url a {
        color: var(--accent-strong);
        text-decoration: none;
      }

      .detail-url a:hover {
        text-decoration: underline;
      }

      .detail-meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }

      .meta-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        background: var(--surface-muted);
        border-radius: 999px;
        color: var(--muted-strong);
        font-size: 12.5px;
      }

      .meta-chip svg {
        width: 12px;
        height: 12px;
        color: var(--muted);
      }

      .meta-chip strong {
        color: var(--text);
        font-weight: 600;
      }

      .detail-description {
        margin: 18px 0 0;
        max-width: 64ch;
        color: var(--muted-strong);
        font-size: 15px;
        line-height: 1.7;
      }

      .detail-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 22px;
        padding-top: 20px;
        border-top: 1px solid var(--line);
      }

      .detail-actions .grow {
        flex: 1;
      }

      .content-toggle {
        gap: 6px;
      }

      .content-toggle .chevron {
        width: 14px;
        height: 14px;
        transition: transform var(--transition);
      }

      .content-toggle[data-expanded="true"] .chevron {
        transform: rotate(180deg);
      }

      .detail-content-wrap {
        margin-top: 18px;
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 320ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .detail-content-wrap[data-expanded="true"] {
        grid-template-rows: 1fr;
      }

      .detail-content-wrap > .detail-content-inner {
        overflow: hidden;
      }

      .detail-content {
        padding: 22px 24px;
        margin: 0;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: #fffefb;
        color: var(--muted-strong);
        white-space: pre-wrap;
        word-break: break-word;
        max-width: 76ch;
        font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
        font-size: 16px;
        line-height: 1.82;
      }

      /* ---------- Empty / loading ---------- */
      .empty-state {
        display: grid;
        place-items: center;
        gap: 12px;
        padding: 48px 24px;
        text-align: center;
        color: var(--muted-strong);
      }

      .empty-state .empty-icon {
        display: grid;
        place-items: center;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--surface-muted);
        color: var(--muted);
      }

      .empty-state .empty-icon svg {
        width: 24px;
        height: 24px;
      }

      .empty-state h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 650;
        color: var(--text);
      }

      .empty-state p {
        margin: 0;
        max-width: 38ch;
        font-size: 13.5px;
        line-height: 1.55;
        color: var(--muted);
      }

      .skeleton-list {
        display: grid;
      }

      .skeleton-row {
        display: grid;
        gap: 8px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--line);
      }

      .skeleton-bar {
        height: 10px;
        border-radius: 4px;
        background: linear-gradient(90deg, var(--surface-muted) 0%, #ece8de 50%, var(--surface-muted) 100%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite linear;
      }

      .skeleton-bar.short { width: 40%; }
      .skeleton-bar.medium { width: 70%; }
      .skeleton-bar.tall { height: 16px; }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* ---------- Auth panel ---------- */
      .auth-panel {
        margin-top: 18px;
        padding: 22px 24px;
        max-width: 520px;
        border: 1px dashed var(--line-strong);
        background: linear-gradient(180deg, #fbfaf7 0%, #f7f4ec 100%);
        border-radius: var(--radius-lg);
      }

      .auth-panel[hidden] {
        display: none !important;
      }

      .auth-title {
        margin: 0;
        font-size: 17px;
        font-weight: 650;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .info-icon {
        display: inline-grid;
        place-items: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--surface-muted);
        color: var(--muted);
        cursor: help;
      }

      .info-icon svg {
        width: 11px;
        height: 11px;
      }

      .field {
        display: grid;
        gap: 6px;
        margin-top: 14px;
      }

      .field-label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 600;
        color: var(--muted-strong);
      }

      .field input {
        width: 100%;
        height: 42px;
        padding: 0 14px;
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        background: var(--surface);
        transition: border-color var(--transition), box-shadow var(--transition);
      }

      .field input:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-ring);
        outline: none;
      }

      .auth-actions {
        margin-top: 14px;
      }

      /* ---------- Toast ---------- */
      .toast-host {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        pointer-events: none;
      }

      .toast {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        background: #17211f;
        color: #f3eeda;
        border-radius: 999px;
        font-size: 13.5px;
        box-shadow: 0 12px 36px rgba(22, 33, 31, 0.18);
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 200ms ease, transform 200ms ease;
      }

      .toast[data-visible="true"] {
        opacity: 1;
        transform: translateY(0);
      }

      .toast[data-error="true"] {
        background: #5d2620;
        color: #fde8e3;
      }

      .toast svg {
        width: 14px;
        height: 14px;
      }

      [hidden] {
        display: none !important;
      }

      /* ---------- Responsive ---------- */
      @media (max-width: 1100px) {
        .dashboard {
          grid-template-columns: 1fr;
        }

        .results-panel {
          min-height: 0;
          max-height: 60vh;
        }
      }

      @media (max-width: 760px) {
        .shell {
          width: min(100vw - 20px, 1360px);
          padding-top: 20px;
        }

        .masthead {
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .filter-row {
          gap: 8px;
        }

        .filter-row .stats-strip {
          margin-left: 0;
          width: 100%;
          justify-content: space-between;
        }

        .detail-card {
          padding: 22px 18px;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="masthead">
        <div class="brand">
          <img src="/icons/icon128.png" alt="" class="brand-mark" width="44" height="44">
          <div class="brand-text">
            <p class="eyebrow">Behind The Wall</p>
            <h1>Bibliothek</h1>
          </div>
        </div>
        <div class="header-actions">
          <button id="toggle-auth" class="auth-pill" type="button" data-state="off" data-tooltip="Sitzungsstatus" data-tooltip-anchor="end">
            <span class="auth-dot" aria-hidden="true"></span>
            <span id="auth-pill-label">Nicht verbunden</span>
          </button>
          <button id="logout-button" class="icon-button" type="button" data-tooltip="Abmelden" data-tooltip-anchor="end" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </header>

      <section class="toolbar">
        <div class="search-shell" id="search-shell">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="search-input" type="search" placeholder="Suche nach Titel, URL, Volltext oder Tag" autocomplete="off" spellcheck="false">
          <span class="kbd-hint" aria-hidden="true"><kbd>/</kbd></span>
          <button id="clear-search" class="search-clear" type="button" data-tooltip="Zurücksetzen" aria-label="Suche zurücksetzen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="filter-row">
          <div class="select-shell" data-tooltip="Sortierung">
            <select id="sort-select" aria-label="Sortierung">
              <option value="updated-desc">Neueste zuerst</option>
              <option value="updated-asc">Älteste zuerst</option>
              <option value="title-asc">Titel A–Z</option>
            </select>
            <svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="stats-strip" aria-live="polite">
            <span><strong id="stat-total">0</strong>Gesamt</span>
            <span class="sep" aria-hidden="true"></span>
            <span><strong id="stat-visible">0</strong>Sichtbar</span>
            <span class="sep" aria-hidden="true"></span>
            <span data-tooltip="Letzte Aktualisierung"><strong id="stat-updated">–</strong>Zuletzt</span>
          </div>
        </div>
      </section>

      <section class="dashboard">
        <section class="panel results-panel">
          <div class="results-header">
            <h2>Ergebnisse</h2>
            <p id="result-count" class="result-count">0 Einträge</p>
          </div>
          <section id="results" class="results" aria-live="polite"></section>
        </section>

        <section id="detail-panel" class="panel detail-panel"></section>
      </section>

      <section id="auth-panel" class="auth-panel" hidden>
        <h3 class="auth-title">
          Zugang zum Backend
          <span class="info-icon" data-tooltip="Einmal anmelden mit API-Token. Der Server setzt nur eine Sitzung für diese Domain." tabindex="0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
        </h3>
        <label class="field">
          <span class="field-label">
            API-Token
            <span class="info-icon" data-tooltip="Das Token bleibt nicht im Frontend liegen." tabindex="0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </span>
          </span>
          <input id="token-input" type="password" placeholder="Token eingeben" autocomplete="current-password">
        </label>
        <div class="auth-actions">
          <button id="login-button" class="primary-button" type="button">Anmelden</button>
        </div>
      </section>
    </main>

    <div class="toast-host" aria-live="polite">
      <div id="toast" class="toast" role="status"></div>
    </div>

    <script>
      const state = {
        authenticated: false,
        loading: false,
        query: "",
        sort: "updated-desc",
        totalCount: 0,
        items: [],
        visibleItems: [],
        selectedId: "",
        contentExpanded: false
      };

      const els = {
        searchShell: document.querySelector("#search-shell"),
        searchInput: document.querySelector("#search-input"),
        sortSelect: document.querySelector("#sort-select"),
        clearSearchButton: document.querySelector("#clear-search"),
        toggleAuthButton: document.querySelector("#toggle-auth"),
        authPillLabel: document.querySelector("#auth-pill-label"),
        logoutButton: document.querySelector("#logout-button"),
        results: document.querySelector("#results"),
        detailPanel: document.querySelector("#detail-panel"),
        authPanel: document.querySelector("#auth-panel"),
        tokenInput: document.querySelector("#token-input"),
        loginButton: document.querySelector("#login-button"),
        statTotal: document.querySelector("#stat-total"),
        statVisible: document.querySelector("#stat-visible"),
        statUpdated: document.querySelector("#stat-updated"),
        resultCount: document.querySelector("#result-count"),
        toast: document.querySelector("#toast")
      };

      let searchTimer = 0;
      let toastTimer = 0;

      document.addEventListener("keydown", (event) => {
        const inField = event.target.matches && event.target.matches("input, select, textarea");

        if (event.key === "/" && !inField) {
          event.preventDefault();
          els.searchInput.focus();
          els.searchInput.select();
          return;
        }

        if (event.key === "Escape") {
          if (document.activeElement === els.searchInput && els.searchInput.value) {
            clearSearch();
          } else if (state.contentExpanded) {
            toggleContent(false);
          } else if (state.selectedId) {
            state.selectedId = "";
            renderAll();
          }
        }
      });

      els.searchInput.addEventListener("input", () => {
        state.query = els.searchInput.value.trim();
        els.searchShell.classList.toggle("has-value", els.searchInput.value.length > 0);
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(() => {
          void loadItems();
        }, 180);
      });

      els.clearSearchButton.addEventListener("click", () => {
        clearSearch();
      });

      els.sortSelect.addEventListener("change", () => {
        state.sort = els.sortSelect.value;
        deriveVisibleItems();
        renderAll();
      });

      els.toggleAuthButton.addEventListener("click", () => {
        els.authPanel.hidden = !els.authPanel.hidden;
        if (!els.authPanel.hidden) {
          els.tokenInput.focus();
        }
        syncAuthIndicator();
      });

      els.logoutButton.addEventListener("click", async () => {
        try {
          await fetch("/auth/session", { method: "DELETE" });
          state.authenticated = false;
          state.items = [];
          state.visibleItems = [];
          state.selectedId = "";
          els.authPanel.hidden = false;
          showToast("Abgemeldet.");
          renderAll();
        } catch (error) {
          showToast(error.message || "Abmelden fehlgeschlagen.", true);
        }
      });

      els.loginButton.addEventListener("click", () => {
        void authenticate();
      });

      els.tokenInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          void authenticate();
        }
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

        if (state.selectedId !== card.dataset.itemId) {
          state.selectedId = card.dataset.itemId;
          state.contentExpanded = false;
          renderResults();
          renderDetail();
        }
      });

      els.results.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const card = event.target.closest("[data-item-id]");
        if (!card) return;
        event.preventDefault();
        if (state.selectedId !== card.dataset.itemId) {
          state.selectedId = card.dataset.itemId;
          state.contentExpanded = false;
          renderResults();
          renderDetail();
        }
      });

      els.detailPanel.addEventListener("click", async (event) => {
        const toggleButton = event.target.closest("[data-toggle-content]");
        if (toggleButton) {
          toggleContent(!state.contentExpanded);
          return;
        }

        const openButton = event.target.closest("[data-open-source]");
        if (openButton) {
          const item = state.visibleItems.find((entry) => entry.id === state.selectedId);
          if (item) {
            window.open(item.url, "_blank", "noopener,noreferrer");
          }
          return;
        }

        const deleteButton = event.target.closest("[data-delete-id]");
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
          renderAll();
        }
      }

      function clearSearch() {
        els.searchInput.value = "";
        els.searchShell.classList.remove("has-value");
        state.query = "";
        void loadItems();
      }

      function toggleContent(open) {
        state.contentExpanded = Boolean(open);
        const wrap = els.detailPanel.querySelector(".detail-content-wrap");
        const button = els.detailPanel.querySelector("[data-toggle-content]");
        if (!wrap || !button) return;
        wrap.dataset.expanded = state.contentExpanded ? "true" : "false";
        button.dataset.expanded = state.contentExpanded ? "true" : "false";
        const label = button.querySelector(".toggle-label");
        if (label) {
          label.textContent = state.contentExpanded ? "Volltext einklappen" : "Volltext anzeigen";
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
        syncAuthIndicator();
      }

      async function authenticate() {
        const token = els.tokenInput.value.trim();
        if (!token) {
          showToast("Bitte gib zuerst ein API-Token ein.", true);
          els.authPanel.hidden = false;
          els.tokenInput.focus();
          return;
        }

        try {
          const response = await fetch("/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
          });
          const json = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(json.error || "Anmeldung fehlgeschlagen.");
          }
          state.authenticated = true;
          els.authPanel.hidden = true;
          els.tokenInput.value = "";
          syncAuthIndicator();
          showToast("Sitzung aktiv.");
          await loadItems();
        } catch (error) {
          state.authenticated = false;
          els.authPanel.hidden = false;
          syncAuthIndicator();
          showToast(error.message || "Anmeldung fehlgeschlagen.", true);
        }
      }

      async function loadItems() {
        if (!state.authenticated) {
          renderAll();
          return;
        }

        state.loading = true;
        renderResults();

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
        } catch (error) {
          state.items = [];
          state.visibleItems = [];
          state.selectedId = "";
          showToast(error.message || "Bibliothek konnte nicht geladen werden.", true);
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
          showToast("Eintrag gelöscht.");
          await loadItems();
        } catch (error) {
          showToast(error.message || "Eintrag konnte nicht gelöscht werden.", true);
        }
      }

      function deriveVisibleItems() {
        let items = state.items.slice();

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
          const newSelected = state.visibleItems[0]?.id || "";
          if (newSelected !== state.selectedId) {
            state.contentExpanded = false;
          }
          state.selectedId = newSelected;
        }
      }

      function renderAll() {
        renderStats();
        renderResults();
        renderDetail();
        syncAuthIndicator();
      }

      function syncAuthIndicator() {
        if (state.authenticated) {
          els.toggleAuthButton.dataset.state = "ok";
          els.authPillLabel.textContent = els.authPanel.hidden ? "Verbunden" : "Sitzung";
          els.logoutButton.hidden = false;
        } else {
          els.toggleAuthButton.dataset.state = "off";
          els.authPillLabel.textContent = "Anmelden";
          els.logoutButton.hidden = true;
        }
      }

      function renderStats() {
        els.statTotal.textContent = String(state.totalCount);
        els.statVisible.textContent = String(state.visibleItems.length);
        els.statUpdated.textContent = state.visibleItems[0]
          ? formatShortDate(state.visibleItems[0].updatedAt)
          : "–";
        const word = state.visibleItems.length === 1 ? "Eintrag" : "Einträge";
        els.resultCount.textContent = state.visibleItems.length + " " + word;
      }

      function renderResults() {
        if (!state.authenticated) {
          els.results.innerHTML = renderEmpty(
            iconKey(),
            "Anmeldung fehlt",
            "Melde dich oben rechts mit deinem API-Token an."
          );
          return;
        }

        if (state.loading) {
          els.results.innerHTML = renderSkeleton(4);
          return;
        }

        if (!state.visibleItems.length) {
          if (state.query) {
            els.results.innerHTML = renderEmpty(
              iconSearch(),
              "Keine Treffer",
              "Andere Suchbegriffe oder Suche zurücksetzen."
            );
          } else {
            els.results.innerHTML = renderEmpty(
              iconBookmark(),
              "Noch leer",
              "Speichere die erste Seite über die Extension."
            );
          }
          return;
        }

        els.results.innerHTML = state.visibleItems.map((item) => {
          const tags = item.tags?.length
            ? '<div class="result-tags">' + item.tags.map((t) => '<span class="tag-chip">' + escapeHtml(t) + '</span>').join("") + '</div>'
            : "";
          const active = item.id === state.selectedId ? "true" : "false";
          const domain = escapeHtml(formatDomain(item.normalizedUrl || item.url));
          const excerpt = summarize(item.content, 220) || item.excerpt || item.description;

          return '<button class="result-card" type="button" data-item-id="' + escapeAttr(item.id) + '" data-active="' + active + '">' +
            '<div class="result-topline">' +
              '<div>' +
                '<p class="result-domain">' + domain + '</p>' +
                '<h3 class="result-title">' + escapeHtml(item.title || item.normalizedUrl) + '</h3>' +
              '</div>' +
              '<p class="result-meta">' + escapeHtml(formatRelativeDate(item.updatedAt)) + '</p>' +
            '</div>' +
            (excerpt ? '<p class="result-excerpt">' + escapeHtml(excerpt) + '</p>' : "") +
            tags +
          '</button>';
        }).join("");
      }

      function renderDetail() {
        const item = state.visibleItems.find((entry) => entry.id === state.selectedId);
        if (!item) {
          els.detailPanel.innerHTML = renderEmpty(
            iconReader(),
            "Kein Eintrag gewählt",
            "Wähle links einen Eintrag, um Quelle, Metadaten und Volltext zu sehen."
          );
          return;
        }

        const tagsRow = item.tags?.length
          ? item.tags.map((t) => '<span class="tag-chip">' + escapeHtml(t) + '</span>').join("")
          : "";

        const hasContent = Boolean(item.content);
        const expanded = state.contentExpanded ? "true" : "false";
        const toggleLabel = state.contentExpanded ? "Volltext einklappen" : "Volltext anzeigen";

        const createdStr = formatDate(item.createdAt);
        const updatedStr = formatDate(item.updatedAt);
        const sameDate = createdStr === updatedStr;
        const dateChips = sameDate
          ? '<span class="meta-chip" data-tooltip="Gespeichert am">' + iconCalendar() + '<strong>' + escapeHtml(createdStr) + '</strong></span>'
          : '<span class="meta-chip" data-tooltip="Gespeichert am">' + iconCalendar() + '<strong>' + escapeHtml(createdStr) + '</strong></span>' +
            '<span class="meta-chip" data-tooltip="Zuletzt aktualisiert">' + iconClock() + '<strong>' + escapeHtml(updatedStr) + '</strong></span>';

        const summary = summarize(item.content, 480) || item.excerpt || item.description;

        els.detailPanel.innerHTML =
          '<article class="detail-card">' +
            '<p class="detail-domain">' + escapeHtml(formatDomain(item.normalizedUrl || item.url)) + '</p>' +
            '<h2 class="detail-title">' + escapeHtml(item.title || item.normalizedUrl) + '</h2>' +
            '<p class="detail-url"><a href="' + escapeAttr(item.url) + '" target="_blank" rel="noreferrer">' + escapeHtml(item.url) + '</a></p>' +
            '<div class="detail-meta-row">' +
              dateChips +
              tagsRow +
            '</div>' +
            (summary ? '<p class="detail-description">' + escapeHtml(summary) + '</p>' : "") +
            '<div class="detail-actions">' +
              '<button class="primary-button" type="button" data-open-source>' + iconExternal() + 'Quelle öffnen</button>' +
              (hasContent
                ? '<button class="ghost-button content-toggle" type="button" data-toggle-content data-expanded="' + expanded + '">' + iconChevron() + '<span class="toggle-label">' + toggleLabel + '</span></button>'
                : "") +
              '<span class="grow"></span>' +
              '<button class="danger-button icon-button" type="button" data-delete-id="' + escapeAttr(item.id) + '" data-tooltip="Eintrag löschen" data-tooltip-anchor="end">' + iconTrash() + '</button>' +
            '</div>' +
            (hasContent
              ? '<div class="detail-content-wrap" data-expanded="' + expanded + '"><div class="detail-content-inner"><div class="detail-content">' + escapeHtml(item.content) + '</div></div></div>'
              : "") +
          '</article>';
      }

      function showToast(message, isError = false) {
        els.toast.textContent = "";
        els.toast.appendChild(isError ? iconNode(iconAlert()) : iconNode(iconCheck()));
        const span = document.createElement("span");
        span.textContent = message;
        els.toast.appendChild(span);
        els.toast.dataset.error = isError ? "true" : "false";
        els.toast.dataset.visible = "true";
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
          els.toast.dataset.visible = "false";
        }, 2800);
      }

      function iconNode(svgString) {
        const tpl = document.createElement("template");
        tpl.innerHTML = svgString;
        return tpl.content.firstChild;
      }

      function renderEmpty(icon, title, copy) {
        return '<div class="empty-state">' +
          '<div class="empty-icon">' + icon + '</div>' +
          '<h3>' + escapeHtml(title) + '</h3>' +
          '<p>' + escapeHtml(copy) + '</p>' +
        '</div>';
      }

      function renderSkeleton(rows) {
        let html = '<div class="skeleton-list" aria-hidden="true">';
        for (let i = 0; i < rows; i++) {
          html += '<div class="skeleton-row">' +
            '<div class="skeleton-bar short"></div>' +
            '<div class="skeleton-bar tall medium"></div>' +
            '<div class="skeleton-bar"></div>' +
          '</div>';
        }
        html += '</div>';
        return html;
      }

      function formatDate(value) {
        return new Date(value).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
      }

      function formatShortDate(value) {
        return new Date(value).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
      }

      function formatRelativeDate(value) {
        const date = new Date(value);
        const diffMs = Date.now() - date.getTime();
        const diffMin = Math.round(diffMs / 60000);
        if (diffMin < 60) return diffMin <= 1 ? "gerade eben" : "vor " + diffMin + " min";
        const diffHours = Math.round(diffMin / 60);
        if (diffHours < 24) return "vor " + diffHours + " h";
        const diffDays = Math.round(diffHours / 24);
        if (diffDays < 7) return "vor " + diffDays + " T";
        return formatShortDate(value);
      }

      function formatDomain(value) {
        try {
          return new URL(value).hostname.replace(/^www\\./, "");
        } catch {
          return value;
        }
      }

      function summarize(text, maxLen) {
        if (!text) return "";
        const cleaned = String(text).replace(/\\s+/g, " ").trim();
        if (!cleaned) return "";
        if (cleaned.length <= maxLen) return cleaned;
        const slice = cleaned.slice(0, maxLen);
        const tailStart = Math.max(0, maxLen - 90);
        const tail = slice.slice(tailStart);
        const sentenceMatch = tail.match(/^.*[.!?…]/);
        if (sentenceMatch && sentenceMatch[0].length > 30) {
          return cleaned.slice(0, tailStart + sentenceMatch[0].length).trim() + " …";
        }
        const lastSpace = slice.lastIndexOf(" ");
        const cut = lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice;
        return cut.trim() + " …";
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

      // ---------- icons (inline SVG strings) ----------
      function iconExternal() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
      }
      function iconChevron() {
        return '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
      }
      function iconTrash() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>';
      }
      function iconCalendar() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
      }
      function iconClock() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
      }
      function iconKey() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="M10.85 12.15 19 4"/><path d="M18 5l3 3"/><path d="M15 8l3 3"/></svg>';
      }
      function iconSearch() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
      }
      function iconBookmark() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
      }
      function iconReader() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
      }
      function iconCheck() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
      }
      function iconAlert() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      }
    </script>
  </body>
</html>`;
}

module.exports = { renderLibraryPage };
