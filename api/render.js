const fs = require("fs/promises");
const path = require("path");
const { injectPreloadedStore } = require("./_html-data");
const { readStoreData } = require("./_store-data");

const root = process.cwd();
const allowedPages = new Set([
  "index.html",
  "index2.html",
  "colecoes.html",
  "colecao.html",
  "loja.html",
  "loja2.html",
  "livro.html",
  "produto.html",
  "sobre.html",
]);

function pageFromRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const rawPath = String(url.searchParams.get("path") || "/index.html");
  const page = path.basename(rawPath === "/" ? "index.html" : rawPath);
  return allowedPages.has(page) ? page : "index.html";
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      res.status(405).send("Method not allowed");
      return;
    }

    const page = pageFromRequest(req);
    const [html, store] = await Promise.all([
      fs.readFile(path.join(root, page), "utf8"),
      readStoreData(),
    ]);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");
    res.status(200).send(injectPreloadedStore(html, store));
  } catch (error) {
    res.status(500).send(error.message);
  }
};
