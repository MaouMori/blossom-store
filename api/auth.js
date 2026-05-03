const { supabase } = require("./_supabase");
const { randomUUID, createHash } = require("crypto");

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

function passwordMatches(savedPassword, password) {
  const raw = String(password || "");
  const trimmed = raw.trim();
  const candidates = new Set([raw, trimmed]);
  for (const candidate of candidates) {
    if (savedPassword === hashPassword(candidate) || savedPassword === candidate) return true;
  }
  return false;
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
      password: hashPassword(password),
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
      if (!user && username === "admin" && password === "admin123") {
        res.status(200).json({
          ok: true,
          user: publicUser({ id: "fallback-admin", username: "admin", role: "admin" }),
        });
        return;
      }
      if (!user || !passwordMatches(user.password, password)) {
        res.status(401).json({ error: "Usuário ou senha inválidos." });
        return;
      }
      if (user.password === password || user.password === password.trim()) {
        supabase(`admin_users?username=eq.${encodeURIComponent(username)}`, {
          method: "PATCH",
          body: JSON.stringify({ password: hashPassword(password.trim()) }),
        }).catch(() => {});
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
        body: JSON.stringify({ password: hashPassword(password) }),
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
