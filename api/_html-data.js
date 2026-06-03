function safeInlineJson(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function injectPreloadedStore(html, store) {
  const payload = `<script>window.__BLOSSOM_PRELOADED_STORE__=${safeInlineJson(store)};</script>`;
  if (html.includes("window.__BLOSSOM_PRELOADED_STORE__")) return html;
  if (html.includes('<script src="script.js"></script>')) {
    return html.replace('<script src="script.js"></script>', `${payload}\n  <script src="script.js"></script>`);
  }
  return html.replace("</head>", `${payload}\n</head>`);
}

module.exports = { injectPreloadedStore };
