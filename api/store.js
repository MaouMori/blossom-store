const {
  replaceTable,
  supabase,
  taxonomiesArrayToObject,
  taxonomiesObjectToArray,
  upsertRows,
} = require("./_supabase");

const TAXONOMY_SCOPES = new Set([
  "taxonomies",
  "featuredCards",
  "futureDrop",
  "siteBanners",
  "bookSettings",
  "aboutSettings",
]);

async function saveTaxonomyObject(taxonomies = {}) {
  const rows = taxonomiesObjectToArray(taxonomies);
  return upsertRows("taxonomies", rows, "key");
}

function requireAdmin(req, res) {
  if (req.headers["x-blossom-role"] !== "admin") {
    res.status(403).json({ error: "Apenas contas admin podem salvar alteracoes." });
    return false;
  }
  return true;
}

function requireArray(value, name) {
  if (!Array.isArray(value)) throw new Error(`${name} precisa ser uma lista.`);
  return value;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const [products, collections, taxonomyRows, orders] = await Promise.all([
        supabase("products?select=*&order=created.desc"),
        supabase("collections?select=*"),
        supabase("taxonomies?select=*"),
        supabase("orders?select=*&order=createdAt.desc"),
      ]);

      res.status(200).json({
        products: products || [],
        collections: collections || [],
        taxonomies: taxonomiesArrayToObject(taxonomyRows),
        orders: orders || [],
      });
      return;
    }

    if (req.method === "PUT") {
      if (!requireAdmin(req, res)) return;

      const body = req.body || {};
      const scope = String(body.scope || "all");

      if (scope === "products") {
        await replaceTable("products", requireArray(body.products, "products"));
        res.status(200).json({ ok: true, scope });
        return;
      }

      if (scope === "collections") {
        await replaceTable("collections", requireArray(body.collections, "collections"));
        res.status(200).json({ ok: true, scope });
        return;
      }

      if (TAXONOMY_SCOPES.has(scope)) {
        await saveTaxonomyObject(body.taxonomies || {});
        res.status(200).json({ ok: true, scope });
        return;
      }

      if (scope === "all") {
        const products = Array.isArray(body.products) ? body.products : [];
        const collections = Array.isArray(body.collections) ? body.collections : [];
        const taxonomies = taxonomiesObjectToArray(body.taxonomies);

        await Promise.all([
          replaceTable("products", products),
          replaceTable("collections", collections),
          replaceTable("taxonomies", taxonomies, "key"),
        ]);

        res.status(200).json({ ok: true, scope });
        return;
      }

      res.status(400).json({ error: "Escopo de salvamento invalido." });
      return;
    }

    res.setHeader("Allow", "GET, PUT");
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
