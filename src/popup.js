import { DEFAULT_BACKEND_URL, getBackendConfig, normalizeSourceUrl } from "./config.js";
import { saveBookmark } from "./backend-client.js";

const titleEl = document.querySelector("#page-title");
const urlEl = document.querySelector("#page-url");
const statusEl = document.querySelector("#popup-status");
const actionsEl = document.querySelector(".actions");
const settingsButtonEl = document.querySelector('[data-action="open-settings"]');

let activeTab = null;

void init();

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  activeTab = tab || null;

  titleEl.textContent = activeTab?.title || "Aktuelle Seite";
  urlEl.textContent = activeTab?.url || "Keine Webseite erkannt";

  const supported = isSupportedUrl(activeTab?.url || "");
  for (const button of actionsEl.querySelectorAll("button")) {
    if (button.dataset.action === "open-library" || button.dataset.action === "open-settings") {
      continue;
    }
    button.disabled = !supported;
  }

  const config = await getBackendConfig();
  if (!config.apiToken) {
    setStatus("Backend noch nicht konfiguriert. Hinterlege zuerst URL und API-Token.");
  }
}

actionsEl.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) {
    return;
  }

  const action = button.dataset.action;

  try {
    switch (action) {
      case "save-page":
        await handleSave();
        break;
      case "open-library":
        await chrome.tabs.create({ url: buildLibraryUrl(await getBackendConfig()) });
        window.close();
        break;
      case "open-settings":
        await chrome.tabs.create({ url: chrome.runtime.getURL("options.html") });
        window.close();
        break;
      case "archive-is-view":
      case "wayback-view":
        await chrome.tabs.create({ url: buildServiceUrl(action, activeTab?.url || "") });
        window.close();
        break;
      default:
        break;
    }
  } catch (error) {
    setStatus(error.message, true);
  }
});

settingsButtonEl?.addEventListener("click", async () => {
  try {
    await chrome.tabs.create({ url: chrome.runtime.getURL("options.html") });
    window.close();
  } catch (error) {
    setStatus(error.message, true);
  }
});

async function handleSave() {
  if (!activeTab?.id || !activeTab.url || !isSupportedUrl(activeTab.url)) {
    throw new Error("Diese Seite kann nicht gespeichert werden.");
  }

  setStatus("Extrahiere Seiteninhalt...");
  const result = await extractPagePayload(activeTab.id);
  if (!result?.ok) {
    throw new Error(result?.error || "Seitentext konnte nicht gelesen werden.");
  }

  const payload = {
    url: activeTab.url,
    title: result.payload.title || activeTab.title || normalizeSourceUrl(activeTab.url),
    description: result.payload.description,
    content: result.payload.content,
    excerpt: result.payload.excerpt,
    tags: []
  };

  setStatus("Speichere im Backend...");
  await saveBookmark(payload);
  setStatus("Gespeichert.");
}

function buildServiceUrl(action, sourceUrl) {
  const canonicalUrl = normalizeSourceUrl(sourceUrl);
  const encodedCanonicalUrl = encodeURIComponent(canonicalUrl);

  switch (action) {
    case "archive-is-view":
      return `https://archive.is/newest/${encodedCanonicalUrl}`;
    case "wayback-view":
      return `https://web.archive.org/web/*/${canonicalUrl}`;
    default:
      return "";
  }
}

function buildLibraryUrl(config) {
  const backendUrl = String(config.backendUrl || DEFAULT_BACKEND_URL).trim().replace(/\/+$/, "");
  return `${backendUrl}/library/`;
}

function isSupportedUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.dataset.error = isError ? "true" : "false";
}

async function extractPagePayload(tabId) {
  try {
    return await chrome.tabs.sendMessage(tabId, {
      type: "extract-page-payload"
    });
  } catch (error) {
    if (!isMissingReceiverError(error)) {
      throw error;
    }

    const injection = await chrome.runtime.sendMessage({
      type: "ensure-content-script",
      tabId
    });
    if (!injection?.ok) {
      throw new Error(injection?.error || "Content Script konnte nicht geladen werden.");
    }

    return chrome.tabs.sendMessage(tabId, {
      type: "extract-page-payload"
    });
  }
}

function isMissingReceiverError(error) {
  return error instanceof Error && error.message.includes("Receiving end does not exist");
}
