const { randomUUID, createHash } = require("crypto");
const { supabase } = require("./_supabase");

function hashPassword(value) {
  return createHash("sha256").update(value).digest("hex");
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email || "",
    role: user.role || "cliente",
    createdAt: user.createdAt || null,
  };
}

function appOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return process.env.SITE_URL || `${proto}://${host}`;
}

function redirectUri(req) {
  return process.env.DISCORD_REDIRECT_URI || `${appOrigin(req)}/api/discord-auth?action=callback`;
}

async function discordToken(code, req) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID || "",
    client_secret: process.env.DISCORD_CLIENT_SECRET || "",
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(req),
  });
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error_description || body.error || "Discord não autorizou o login.");
  return body.access_token;
}

async function discordUser(token) {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || "Não foi possível ler o usuário do Discord.");
  return body;
}

async function findExisting(discord) {
  const byDiscord = await supabase(`admin_users?discordId=eq.${encodeURIComponent(discord.id)}&select=*`);
  if (Array.isArray(byDiscord) && byDiscord[0]) return byDiscord[0];
  if (discord.email) {
    const byEmail = await supabase(`admin_users?email=eq.${encodeURIComponent(discord.email)}&select=*`);
    if (Array.isArray(byEmail) && byEmail[0]) return byEmail[0];
  }
  return null;
}

async function saveDiscordUser(discord) {
  const existing = await findExisting(discord);
  const baseUsername = discord.global_name || discord.username || `discord-${discord.id}`;
  const avatar = discord.avatar
    ? `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`
    : "";

  if (existing) {
    const rows = await supabase(`admin_users?id=eq.${encodeURIComponent(existing.id)}`, {
      method: "PATCH",
      body: JSON.stringify({
        username: existing.username || baseUsername,
        email: existing.email || discord.email || "",
        discordId: discord.id,
        avatar,
      }),
    });
    return Array.isArray(rows) ? rows[0] : { ...existing, discordId: discord.id, avatar };
  }

  const rows = await supabase("admin_users", {
    method: "POST",
    body: JSON.stringify({
      id: randomUUID(),
      username: baseUsername,
      email: discord.email || "",
      password: hashPassword(randomUUID()),
      role: "cliente",
      discordId: discord.id,
      avatar,
      createdAt: new Date().toISOString(),
    }),
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

module.exports = async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const action = url.searchParams.get("action") || "start";

    if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
      res.status(500).send("Configure DISCORD_CLIENT_ID e DISCORD_CLIENT_SECRET no Vercel.");
      return;
    }

    if (action === "start") {
      const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.DISCORD_CLIENT_ID,
        redirect_uri: redirectUri(req),
        scope: "identify email",
        prompt: "consent",
      });
      res.writeHead(302, { Location: `https://discord.com/oauth2/authorize?${params.toString()}` });
      res.end();
      return;
    }

    const code = url.searchParams.get("code");
    if (!code) {
      res.status(400).send("Código do Discord ausente.");
      return;
    }

    const token = await discordToken(code, req);
    const discord = await discordUser(token);
    const user = publicUser(await saveDiscordUser(discord));
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`<!doctype html><meta charset="utf-8"><script>
      localStorage.setItem("blossom-user-account", ${JSON.stringify(JSON.stringify({ logged: true, ...user, name: user.username }))});
      ${user.role === "admin" ? 'localStorage.setItem("blossom-admin-session", "active");' : 'localStorage.removeItem("blossom-admin-session");'}
      location.href = "/index.html";
    </script>`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
