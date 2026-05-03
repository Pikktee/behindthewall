const MENU_ITEMS = [
  ["archive-is-view", "Archive.is anzeigen"],
  ["wayback-view", "Wayback anzeigen"]
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    for (const [id, title] of MENU_ITEMS) {
      chrome.contextMenus.create({
        id,
        title,
        contexts: ["page", "link", "selection"]
      });
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const sourceUrl = info.linkUrl || tab?.url;
  openArchiveAction(info.menuItemId, sourceUrl);
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "open-archive-is") {
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  openArchiveAction("archive-is-view", tab?.url);
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "ensure-content-script") {
    return;
  }

  void (async () => {
    try {
      if (!chrome.scripting?.executeScript) {
        throw new Error("Die Scripting-API ist nicht verfügbar. Bitte Erweiterung neu laden.");
      }

      await chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ["src/content.js"]
      });

      sendResponse({ ok: true });
    } catch (error) {
      sendResponse({
        ok: false,
        error: error instanceof Error ? error.message : "Content Script konnte nicht geladen werden."
      });
    }
  })();

  return true;
});

function openArchiveAction(action, sourceUrl) {
  if (!sourceUrl || !isSupportedUrl(sourceUrl)) {
    return;
  }

  const targetUrl = buildServiceUrl(action, sourceUrl);
  if (!targetUrl) {
    return;
  }

  chrome.tabs.create({ url: targetUrl });
}

function isSupportedUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function buildServiceUrl(action, sourceUrl) {
  const canonicalUrl = getCanonicalSourceUrl(sourceUrl);
  const encodedCanonicalUrl = encodeURIComponent(canonicalUrl);

  switch (action) {
    case "archive-is-view":
      return `https://archive.is/${encodedCanonicalUrl}`;
    case "wayback-view":
      return `https://web.archive.org/web/*/${canonicalUrl}`;
    default:
      return "";
  }
}

function getCanonicalSourceUrl(sourceUrl) {
  const url = new URL(sourceUrl);
  url.search = "";
  url.hash = "";
  return url.toString();
}
