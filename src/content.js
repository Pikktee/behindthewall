chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "extract-page-payload") {
    return;
  }

  try {
    const descriptionMeta = document.querySelector(
      'meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]'
    );
    const titleMeta = document.querySelector('meta[property="og:title"], meta[name="twitter:title"]');
    const root = document.querySelector("article, main") || document.body;
    const text = (root?.innerText || document.body?.innerText || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 50000);

    sendResponse({
      ok: true,
      payload: {
        title: titleMeta?.content?.trim() || document.title || "",
        description: descriptionMeta?.content?.trim() || "",
        content: text,
        excerpt: text.slice(0, 320)
      }
    });
  } catch (error) {
    sendResponse({
      ok: false,
      error: error instanceof Error ? error.message : "Extraktion fehlgeschlagen"
    });
  }
});
