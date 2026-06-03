const {
  supabase,
  taxonomiesArrayToObject,
} = require("./_supabase");

let cachedStore = null;
let cachedAt = 0;
const CACHE_TTL_MS = 15000;

async function readStoreData() {
  if (cachedStore && Date.now() - cachedAt < CACHE_TTL_MS) return cachedStore;

  const [products, collections, taxonomyRows, orders] = await Promise.all([
    supabase("products?select=*&order=created.desc"),
    supabase("collections?select=*"),
    supabase("taxonomies?select=*"),
    supabase("orders?select=*&order=createdAt.desc"),
  ]);

  cachedStore = {
    products: products || [],
    collections: collections || [],
    taxonomies: taxonomiesArrayToObject(taxonomyRows),
    orders: orders || [],
  };
  cachedAt = Date.now();
  return cachedStore;
}

function clearStoreDataCache() {
  cachedStore = null;
  cachedAt = 0;
}

module.exports = { clearStoreDataCache, readStoreData };
