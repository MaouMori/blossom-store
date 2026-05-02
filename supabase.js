// supabase.js — cliente compartilhado entre script.js e admin.js
const SUPABASE_URL = "https://zbvmznzdrqwervmcvxye.supabase.co";
const SUPABASE_KEY = "sb_publishable_YCJRhgVFdoB94uEow3Ss0w_P8pZcspm";

const supabase = (() => {
  const headers = {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
  };

  async function from(table) {
    return {
      async select(cols = "*") {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${cols}`, { headers });
        return res.json();
      },
      async insert(data) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: "POST",
          headers: { ...headers, "Prefer": "return=representation" },
          body: JSON.stringify(data),
        });
        return res.json();
      },
      async upsert(data) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: "POST",
          headers: { ...headers, "Prefer": "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(data),
        });
        return res.json();
      },
      async delete(id) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
          method: "DELETE",
          headers,
        });
        return res.ok;
      },
    };
  }

  return { from };
})();