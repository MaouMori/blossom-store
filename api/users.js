const { supabase } = require("./_supabase");

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role || (user.username === "admin" ? "admin" : "cliente"),
    createdAt: user.createdAt || null,
  };
}

function requireAdmin(req, res) {
  const role = req.headers["x-blossom-role"];
  if (role !== "admin") {
    res.status(403).json({ error: "Apenas contas admin podem gerenciar usuários." });
    return false;
  }
  return true;
}

module.exports = async function handler(req, res) {
  try {
    if (!requireAdmin(req, res)) return;

    if (req.method === "GET") {
      const users = await supabase("admin_users?select=*&order=createdAt.desc");
      res.status(200).json({ users: (users || []).map(publicUser) });
      return;
    }

    if (req.method === "PATCH") {
      const { username, role } = req.body || {};
      if (!username || !role) {
        res.status(400).json({ error: "Informe usuário e cargo." });
        return;
      }
      try {
        const rows = await supabase(`admin_users?username=eq.${encodeURIComponent(username)}`, {
          method: "PATCH",
          body: JSON.stringify({ role }),
        });
        res.status(200).json({ ok: true, user: publicUser(Array.isArray(rows) ? rows[0] : { username, role }) });
      } catch (error) {
        if (String(error.message).includes("role")) {
          res.status(400).json({ error: "A tabela admin_users precisa de uma coluna text chamada role para alterar cargos." });
          return;
        }
        throw error;
      }
      return;
    }

    res.setHeader("Allow", "GET, PATCH");
    res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
