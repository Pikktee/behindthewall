import { checkBackend } from "./backend-client.js";
import { DEFAULT_BACKEND_URL, getBackendConfig, saveBackendConfig } from "./config.js";

const form = document.querySelector("#settings-form");
const backendUrlEl = document.querySelector("#backend-url");
const apiTokenEl = document.querySelector("#api-token");
const statusEl = document.querySelector("#settings-status");
const testConnectionButton = document.querySelector("#test-connection");

init();

async function init() {
  const config = await getBackendConfig();
  backendUrlEl.value = config.backendUrl || DEFAULT_BACKEND_URL;
  apiTokenEl.value = config.apiToken;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveSettings();
});

testConnectionButton.addEventListener("click", async () => {
  try {
    await saveSettings(false);
    const health = await checkBackend();
    setStatus(`Backend erreichbar, ${health.count} gespeicherte Eintraege.`);
  } catch (error) {
    setStatus(error.message, true);
  }
});

async function saveSettings(showSaved = true) {
  await saveBackendConfig({
    backendUrl: backendUrlEl.value,
    apiToken: apiTokenEl.value
  });

  if (showSaved) {
    setStatus("Einstellungen gespeichert.");
  }
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.dataset.error = isError ? "true" : "false";
}
