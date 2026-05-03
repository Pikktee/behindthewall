export const DEFAULT_BACKEND_URL = "http://127.0.0.1:8787";

export async function getBackendConfig() {
  const stored = await chrome.storage.sync.get({
    backendUrl: DEFAULT_BACKEND_URL,
    apiToken: ""
  });

  return {
    backendUrl: String(stored.backendUrl || DEFAULT_BACKEND_URL).trim().replace(/\/+$/, ""),
    apiToken: String(stored.apiToken || "").trim()
  };
}

export async function saveBackendConfig(config) {
  await chrome.storage.sync.set({
    backendUrl: String(config.backendUrl || DEFAULT_BACKEND_URL).trim().replace(/\/+$/, ""),
    apiToken: String(config.apiToken || "").trim()
  });
}

export function normalizeSourceUrl(value) {
  const url = new URL(value);
  url.search = "";
  url.hash = "";
  return url.toString();
}
