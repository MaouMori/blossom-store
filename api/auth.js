const { supabase } = require("./_supabase");
const { randomUUID } = require("crypto");

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role || (user.username === "admin" ? "admin" : "cliente"),
    createdAt: user.createdAt || null,
  };
}

async function findUser(username) {
  const rows = await supabase(`admin_users?username=eq.${encodeURIComponent(username)}&select=*`);
  return Array.isArray(rows) ? rows[0] : null;
}

async function createUser(username, password) {
  const rows = await supabase("admin_users", {
    method: "POST",
    body: JSON.stringify({
      id: randomUUID(),
      username,
      password,
      createdAt: new Date().toISOString(),
    }),
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ error: "Método não permitido" });
      return;
    }

    const body = req.body || {};
    const action = body.action || "login";
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username) {
      res.status(400).json({ error: "Informe o usuário." });
      return;
    }

    if (action === "login") {
      const user = await findUser(username);
      if (!user || user.password !== password) {
        res.status(401).json({ error: "Usuário ou senha inválidos." });
        return;
      }
      res.status(200).json({ ok: true, user: publicUser(user) });
      return;
    }

    if (action === "register") {
      if (password.length < 4) {
        res.status(400).json({ error: "Use uma senha com pelo menos 4 caracteres." });
        return;
      }
      const existing = await findUser(username);
      if (existing) {
        res.status(409).json({ error: "Esse usuário já existe." });
        return;
      }
      const user = await createUser(username, password);
      res.status(201).json({ ok: true, user: publicUser(user) });
      return;
    }

    if (action === "reset") {
      if (password.length < 4) {
        res.status(400).json({ error: "Use uma senha com pelo menos 4 caracteres." });
        return;
      }
      const existing = await findUser(username);
      if (!existing) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return;
      }
      const rows = await supabase(`admin_users?username=eq.${encodeURIComponent(username)}`, {
        method: "PATCH",
        body: JSON.stringify({ password }),
      });
      res.status(200).json({ ok: true, user: publicUser(Array.isArray(rows) ? rows[0] : existing) });
      return;
    }

    if (action === "forgot") {
      const existing = await findUser(username);
      res.status(200).json({
        ok: Boolean(existing),
        message: existing ? "Usuário encontrado. Defina uma nova senha." : "Usuário não encontrado.",
      });
      return;
    }

    res.status(400).json({ error: "Ação inválida." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
