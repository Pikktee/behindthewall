export const DEFAULT_BACKEND_URL = "http://127.0.0.1:8787";

export async function getBackendConfig() {
  const storage = getStorageArea();
  const stored = await storage.get({
    backendUrl: DEFAULT_BACKEND_URL,
    apiToken: ""
  });

  return {
    backendUrl: String(stored.backendUrl || DEFAULT_BACKEND_URL).trim().replace(/\/+$/, ""),
    apiToken: String(stored.apiToken || "").trim()
  };
}

export async function saveBackendConfig(config) {
  const storage = getStorageArea();
  await storage.set({
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

function getStorageArea() {
  const storage = globalThis.chrome?.storage?.sync || globalThis.chrome?.storage?.local;
  if (!storage) {
    throw new Error("Die Storage-API der Erweiterung ist nicht verfuegbar. Bitte Erweiterung neu laden.");
  }
  return storage;
}
