// api/auth.js — Login admin via Supabase
const SUPABASE_URL = "https://zbvmznzdrqwervmcvxye.supabase.co";
const SUPABASE_KEY = "sb_publishable_YCJRhgVFdoB94uEow3Ss0w_P8pZcspm";

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
};

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    try {
      const { username, password } = req.body || {};

      const sbRes = await fetch(
        `${SUPABASE_URL}/rest/v1/admin_users?username=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}&select=id,username`,
        { headers }
      );

      const users = await sbRes.json();

      if (Array.isArray(users) && users.length > 0) {
        return res.status(200).json({ ok: true, user: users[0] });
      }

      return res.status(401).json({ ok: false, error: "Usuário ou senha inválidos." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: "Método não permitido" });
};