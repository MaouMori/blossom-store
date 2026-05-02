const {
  replaceTable,
  supabase,
  taxonomiesArrayToObject,
  taxonomiesObjectToArray,
} = require("./_supabase");

module.exports = async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const [products, collections, taxonomyRows, orders] = await Promise.all([
        supabase("products?select=*&order=created.asc"),
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
      const body = req.body || {};
      const products = Array.isArray(body.products) ? body.products : [];
      const collections = Array.isArray(body.collections) ? body.collections : [];
      const taxonomies = taxonomiesObjectToArray(body.taxonomies);

      await Promise.all([
        replaceTable("products", products),
        replaceTable("collections", collections),
        replaceTable("taxonomies", taxonomies, "key"),
      ]);

      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader("Allow", "GET, PUT");
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
