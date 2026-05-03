const { supabase } = require("./_supabase");
const { createHash } = require("crypto");

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email || "",
    role: user.role || (user.username === "admin" ? "admin" : "cliente"),
    createdAt: user.createdAt || null,
  };
}

async function findUserById(id) {
  const rows = await supabase(`admin_users?id=eq.${encodeURIComponent(id)}&select=*`);
  return Array.isArray(rows) ? rows[0] : null;
}

async function findUserByUsername(username) {
  const rows = await supabase(`admin_users?username=eq.${encodeURIComponent(username)}&select=*`);
  return Array.isArray(rows) ? rows[0] : null;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "PATCH") {
      res.setHeader("Allow", "PATCH");
      res.status(405).json({ error: "Método não permitido" });
      return;
    }

    const userId = String(req.headers["x-blossom-user-id"] || "").trim();
    if (!userId) {
      res.status(401).json({ error: "Faça login novamente para alterar a conta." });
      return;
    }

    const current = await findUserById(userId);
    if (!current) {
      res.status(404).json({ error: "Conta não encontrada." });
      return;
    }

    const body = req.body || {};
    const username = String(body.username || "").trim();
    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    if (!username) {
      res.status(400).json({ error: "Informe o nome da conta." });
      return;
    }

    const existing = await findUserByUsername(username);
    if (existing && existing.id !== current.id) {
      res.status(409).json({ error: "Esse nome de conta já está em uso." });
      return;
    }

    const update = { username, email };
    if (password) {
      if (password.length < 4) {
        res.status(400).json({ error: "Use uma senha com pelo menos 4 caracteres." });
        return;
      }
      update.password = hashPassword(password);
    }

    const rows = await supabase(`admin_users?id=eq.${encodeURIComponent(current.id)}`, {
      method: "PATCH",
      body: JSON.stringify(update),
    });
    const user = Array.isArray(rows) ? rows[0] : { ...current, ...update };
    res.status(200).json({ ok: true, user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
