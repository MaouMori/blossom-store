const SUPABASE_URL = process.env.SUPABASE_URL || "https://zbvmznzdrqwervmcvxye.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_YCJRhgVFdoB94uEow3Ss0w_P8pZcspm";

async function supabase(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${response.status}: ${detail}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function replaceTable(table, rows, keyColumn = "id") {
  await supabase(`${table}?${keyColumn}=neq.__never__`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });

  if (!rows.length) return [];

  return supabase(table, {
    method: "POST",
    body: JSON.stringify(rows),
  });
}

async function upsertRows(table, rows, conflictColumn = "id") {
  if (!Array.isArray(rows) || !rows.length) return [];

  return supabase(`${table}?on_conflict=${encodeURIComponent(conflictColumn)}`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(rows),
  });
}

function taxonomiesArrayToObject(rows = []) {
  return rows.reduce((acc, row) => {
    acc[row.key] = row.values ?? [];
    return acc;
  }, {});
}

function taxonomiesObjectToArray(taxonomies = {}) {
  return Object.entries(taxonomies).map(([key, values]) => ({
    key,
    values: values ?? [],
  }));
}

module.exports = {
  replaceTable,
  supabase,
  upsertRows,
  taxonomiesArrayToObject,
  taxonomiesObjectToArray,
};
