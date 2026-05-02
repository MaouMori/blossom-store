// api/store.js — Vercel Serverless + Supabase
const SUPABASE_URL = "https://zbvmznzdrqwervmcvxye.supabase.co";
const SUPABASE_KEY = "sb_publishable_YCJRhgVFdoB94uEow3Ss0w_P8pZcspm";

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Prefer": "return=representation",
};

async function sbGet(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, { headers });
  return res.json();
}

async function sbUpsertMany(table, rows) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...headers, "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify(rows),
  });
}

async function sbUpsertTaxonomies(taxonomies) {
  const rows = Object.entries(taxonomies).map(([key, values]) => ({ key, values }));
  await fetch(`${SUPABASE_URL}/rest/v1/taxonomies`, {
    method: "POST",
    headers: { ...headers, "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify(rows),
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {
      const [products, collections, taxonomyRows] = await Promise.all([
        sbGet("products"),
        sbGet("collections"),
        sbGet("taxonomies"),
      ]);

      const taxonomies = {};
      if (Array.isArray(taxonomyRows)) {
        taxonomyRows.forEach(({ key, values }) => { taxonomies[key] = values; });
      }

      return res.status(200).json({ products, collections, taxonomies, orders: [] });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { products, collections, taxonomies } = req.body || {};
      await Promise.all([
        products?.length ? sbUpsertMany("products", products) : Promise.resolve(),
        collections?.length ? sbUpsertMany("collections", collections) : Promise.resolve(),
        taxonomies ? sbUpsertTaxonomies(taxonomies) : Promise.resolve(),
      ]);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Método não permitido" });
};