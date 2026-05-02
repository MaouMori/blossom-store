const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const dataDir = path.join(root, "data");
const storePath = path.join(dataDir, "store.json");
const usersPath = path.join(dataDir, "users.json");
const port = process.env.PORT || 3000;

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

const initialStore = {
  products: [
    ["hoodie-black", "Blossom Hoodie Black", "Masculino", "Moletons", "Preto", 199.9, "hoodie-dark", true],
    ["tee-white", "Blossom Tee White", "Masculino", "Camisetas", "Branco", 129.9, "tee-white", true],
    ["jersey", "Blossom Jersey", "Masculino", "Camisetas", "Preto", 169.9, "jersey", true],
    ["zip-pink", "Blossom Zip Pink", "Feminino", "Jaquetas", "Rosa", 249.9, "zip", true],
    ["cargo-black", "Blossom Cargo Black", "Masculino", "Calças", "Preto", 189.9, "cargo", false],
    ["cap-pink", "Blossom Cap Pink", "Acessórios", "Bonés", "Rosa", 89.9, "cap-pink", false],
    ["puffer-jacket", "Blossom Puffer Jacket", "Drops Exclusivos", "Jaquetas", "Preto", 249.9, "puffer", true],
    ["crop-white", "Blossom Crop Top White", "Feminino", "Camisetas", "Branco", 99.9, "crop", true],
    ["oversized-black", "Blossom Oversized Black", "Masculino", "Camisetas", "Preto", 139.9, "tee-dark", true],
    ["hoodie-white", "Blossom Hoodie White", "Masculino", "Moletons", "Branco", 199.9, "hoodie-white", false],
    ["shorts-black", "Blossom Shorts Black", "Masculino", "Shorts", "Preto", 119.9, "shorts", false],
    ["cap-black", "Blossom Cap Black", "Acessórios", "Bonés", "Preto", 89.9, "cap-black", false],
  ].map(([id, name, category, type, color, price, visual, isNew], created) => ({
    id, name, category, type, color, price, visual, isNew, created,
  })),
  collections: [
    { id: "spring-25", name: "Blossom Spring '25", label: "Coleção Primavera 2025", description: "Peças leves e estilosas para dominar as ruas.", pieces: 12, visual: "spring", badge: "Nova" },
    { id: "essentials", name: "Blossom Essentials", label: "Coleção Essentials", description: "Peças básicas com o padrão de qualidade Blossom.", pieces: 18, visual: "essentials", badge: "" },
    { id: "nightfall", name: "Blossom Nightfall", label: "Coleção Nightfall", description: "Cores escuras. Estilo pesado. Presença marcante.", pieces: 10, visual: "nightfall", badge: "" },
    { id: "luxury", name: "Blossom Luxury", label: "Coleção Luxury", description: "Detalhes premium para quem vive o topo do roleplay.", pieces: 8, visual: "luxury", badge: "" },
    { id: "sport", name: "Blossom Sport", label: "Coleção Sport", description: "Performance, conforto e estilo para qualquer missão.", pieces: 11, visual: "sport", badge: "" },
    { id: "oversized", name: "Blossom Oversized", label: "Coleção Oversized", description: "Modelagens amplas para um visual urbano e autêntico.", pieces: 14, visual: "oversized", badge: "" },
    { id: "pink-label", name: "Blossom Pink Label", label: "Coleção Pink Label", description: "A identidade rosa da Blossom. Única, forte e feminina.", pieces: 9, visual: "pink-label", badge: "" },
    { id: "collabs", name: "Blossom Collabs", label: "Coleção Collabs", description: "Parcerias especiais que viram história.", pieces: 7, visual: "collabs", badge: "" },
  ],
  taxonomies: {
    categories: ["Masculino", "Feminino", "Acessórios", "Drops Exclusivos", "Conjuntos"],
    types: ["Camisetas", "Moletons", "Jaquetas", "Calças", "Shorts", "Bonés", "Outros", "Conjuntos"],
    colors: ["Preto", "Branco", "Rosa", "Cinza", "Bege", "Azul"],
    visuals: ["hoodie-dark", "tee-white", "jersey", "zip", "cargo", "cap-pink", "puffer", "crop", "tee-dark", "hoodie-white", "shorts", "cap-black", "bag", "premium", "spring", "essentials", "nightfall", "luxury", "sport", "oversized", "pink-label", "collabs"],
  },
  orders: [],
};

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(storePath)) writeStore(readInitialStore());
}

function readInitialStore() {
  try {
    const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
    const rows = extractConstArray(source, "defaultProductRows", "defaultProducts");
    const collections = extractConstArray(source, "defaultCollections", "defaultTaxonomies");
    const taxonomies = extractConstObject(source, "defaultTaxonomies");
    return {
      products: rows.map(([id, name, category, type, color, price, visual, isNew], created) => ({
        id, name, category, type, color, price, visual, isNew, created,
      })),
      collections,
      taxonomies,
      orders: [],
    };
  } catch {
    return initialStore;
  }
}

function extractConstArray(source, name, nextName) {
  const start = source.indexOf(`const ${name} = `);
  const end = source.indexOf(`\n\nconst ${nextName}`, start);
  if (start < 0 || end < 0) throw new Error(`Cannot extract ${name}`);
  const code = source.slice(start + `const ${name} = `.length, end).trim().replace(/;$/, "");
  return Function(`return (${code});`)();
}

function extractConstObject(source, name) {
  const start = source.indexOf(`const ${name} = `);
  const end = source.indexOf(`\n};`, start) + 3;
  if (start < 0 || end < 3) throw new Error(`Cannot extract ${name}`);
  const code = source.slice(start + `const ${name} = `.length, end).trim().replace(/;$/, "");
  return Function(`return (${code});`)();
}

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(storePath, "utf8"));
}

function readUsers() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, JSON.stringify([
      { id: "local-admin", username: "admin", password: hashPassword("admin123"), role: "admin", createdAt: new Date().toISOString() },
    ], null, 2));
  }
  return JSON.parse(fs.readFileSync(usersPath, "utf8"));
}

function writeUsers(users) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role || "cliente",
    createdAt: user.createdAt || null,
  };
}

function writeStore(store) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12 * 1024 * 1024) {
        req.destroy();
        reject(new Error("Payload muito grande."));
      }
    });
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
    req.on("error", reject);
  });
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(root, requested));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mime[path.extname(filePath)] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/store" && req.method === "GET") {
      sendJson(res, 200, readStore());
      return;
    }

    if (url.pathname === "/api/store" && req.method === "PUT") {
      const nextStore = await readBody(req);
      writeStore({
        products: Array.isArray(nextStore.products) ? nextStore.products : [],
        collections: Array.isArray(nextStore.collections) ? nextStore.collections : [],
        taxonomies: nextStore.taxonomies || initialStore.taxonomies,
        orders: Array.isArray(nextStore.orders) ? nextStore.orders : [],
      });
      sendJson(res, 200, { ok: true });
      return;
    }

    if (url.pathname === "/api/auth" && req.method === "POST") {
      const body = await readBody(req);
      const users = readUsers();
      const username = String(body.username || "").trim();
      const password = String(body.password || "");
      const action = body.action || "login";
      const user = users.find((item) => item.username === username);

      if (action === "login") {
        if (!user || user.password !== hashPassword(password)) return sendJson(res, 401, { error: "Usuário ou senha inválidos." });
        return sendJson(res, 200, { ok: true, user: publicUser(user) });
      }

      if (action === "register") {
        if (user) return sendJson(res, 409, { error: "Esse usuário já existe." });
        const nextUser = { id: `local-${Date.now()}`, username, password: hashPassword(password), role: "cliente", createdAt: new Date().toISOString() };
        users.unshift(nextUser);
        writeUsers(users);
        return sendJson(res, 201, { ok: true, user: publicUser(nextUser) });
      }

      if (action === "reset") {
        if (!user) return sendJson(res, 404, { error: "Usuário não encontrado." });
        user.password = hashPassword(password);
        writeUsers(users);
        return sendJson(res, 200, { ok: true, user: publicUser(user) });
      }

      return sendJson(res, 400, { error: "Ação inválida." });
    }

    if (url.pathname === "/api/users" && req.method === "GET") {
      if (req.headers["x-blossom-role"] !== "admin") return sendJson(res, 403, { error: "Apenas contas admin podem gerenciar usuários." });
      return sendJson(res, 200, { users: readUsers().map(publicUser) });
    }

    if (url.pathname === "/api/users" && req.method === "PATCH") {
      if (req.headers["x-blossom-role"] !== "admin") return sendJson(res, 403, { error: "Apenas contas admin podem gerenciar usuários." });
      const body = await readBody(req);
      const users = readUsers();
      const user = users.find((item) => item.username === body.username);
      if (!user) return sendJson(res, 404, { error: "Usuário não encontrado." });
      user.role = body.role || "cliente";
      writeUsers(users);
      return sendJson(res, 200, { ok: true, user: publicUser(user) });
    }

    if (url.pathname === "/api/orders" && req.method === "POST") {
      const store = readStore();
      const order = await readBody(req);
      store.orders = [{ ...order, id: `BLS-${Date.now()}`, createdAt: new Date().toISOString() }, ...(store.orders || [])];
      writeStore(store);
      sendJson(res, 201, store.orders[0]);
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

ensureStore();
server.listen(port, () => {
  console.log(`Blossom Store rodando em http://localhost:${port}`);
});
