const adminMoney = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const productSeed = [
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
  ["pants-white", "Blossom Pants White", "Feminino", "Calças", "Branco", 189.9, "pants-white", false],
  ["tee-pink-logo", "Blossom Tee Pink Logo", "Drops Exclusivos", "Camisetas", "Preto", 129.9, "tee-pink", false],
  ["varsity", "Blossom Varsity Jacket", "Drops Exclusivos", "Jaquetas", "Preto", 399.9, "varsity", true],
  ["side-bag", "Blossom Side Bag", "Acessórios", "Outros", "Preto", 139.9, "bag", false],
  ["dress-pink", "Blossom Mini Dress Pink", "Feminino", "Outros", "Rosa", 159.9, "dress", false],
  ["cargo-grey", "Blossom Cargo Grey", "Masculino", "Calças", "Cinza", 189.9, "cargo-grey", false],
  ["beanie-black", "Blossom Beanie Black", "Acessórios", "Bonés", "Preto", 79.9, "beanie", false],
  ["set-pink", "Blossom Set Pink", "Conjuntos", "Outros", "Rosa", 299.9, "set-pink", true],
  ["jogger-blue", "Blossom Jogger Blue", "Masculino", "Calças", "Azul", 179.9, "jogger", false],
  ["tank-white", "Blossom Tank White", "Feminino", "Camisetas", "Branco", 89.9, "tank", false],
  ["hoodie-grey", "Blossom Hoodie Grey", "Masculino", "Moletons", "Cinza", 199.9, "hoodie-grey", false],
  ["cap-beige", "Blossom Cap Beige", "Acessórios", "Bonés", "Bege", 89.9, "cap-beige", false],
  ["windbreaker", "Blossom Windbreaker", "Drops Exclusivos", "Jaquetas", "Preto", 279.9, "wind", true],
  ["skirt-black", "Blossom Skirt Black", "Feminino", "Outros", "Preto", 119.9, "skirt", false],
  ["tee-blue", "Blossom Tee Blue", "Masculino", "Camisetas", "Azul", 129.9, "tee-blue", false],
  ["bag-pink", "Blossom Bag Pink", "Acessórios", "Outros", "Rosa", 139.9, "bag-pink", false],
  ["shorts-grey", "Blossom Shorts Grey", "Masculino", "Shorts", "Cinza", 119.9, "shorts-grey", false],
  ["cropped-pink", "Blossom Cropped Pink", "Feminino", "Camisetas", "Rosa", 99.9, "crop-pink", true],
  ["track-set", "Blossom Track Set", "Conjuntos", "Outros", "Preto", 329.9, "track", false],
  ["mask-black", "Blossom Mask Black", "Acessórios", "Outros", "Preto", 59.9, "mask", false],
  ["polo-white", "Blossom Polo White", "Masculino", "Camisetas", "Branco", 149.9, "polo-white", false],
  ["polo-black", "Blossom Polo Black", "Masculino", "Camisetas", "Preto", 149.9, "polo-black", false],
  ["jacket-beige", "Blossom Jacket Beige", "Feminino", "Jaquetas", "Bege", 249.9, "jacket-beige", false],
  ["cargo-pink", "Blossom Cargo Pink", "Feminino", "Calças", "Rosa", 189.9, "cargo-pink", false],
  ["hoodie-blue", "Blossom Hoodie Blue", "Drops Exclusivos", "Moletons", "Azul", 219.9, "hoodie-blue", true],
  ["bucket-black", "Blossom Bucket Black", "Acessórios", "Bonés", "Preto", 99.9, "bucket", false],
  ["sweater-white", "Blossom Sweater White", "Feminino", "Moletons", "Branco", 199.9, "sweater", false],
  ["shorts-pink", "Blossom Shorts Pink", "Feminino", "Shorts", "Rosa", 119.9, "shorts-pink", false],
  ["duffle-bag", "Blossom Duffle Bag", "Acessórios", "Outros", "Preto", 199.9, "duffle", false],
  ["limited-tee", "Blossom Limited Tee", "Drops Exclusivos", "Camisetas", "Preto", 159.9, "limited", true],
  ["varsity-white", "Blossom Varsity White", "Drops Exclusivos", "Jaquetas", "Branco", 399.9, "varsity-white", false],
  ["set-beige", "Blossom Set Beige", "Conjuntos", "Outros", "Bege", 299.9, "set-beige", false],
  ["gloves-black", "Blossom Gloves Black", "Acessórios", "Outros", "Preto", 69.9, "gloves", false],
  ["zip-grey", "Blossom Zip Grey", "Masculino", "Jaquetas", "Cinza", 249.9, "zip-grey", false],
  ["pants-beige", "Blossom Pants Beige", "Feminino", "Calças", "Bege", 189.9, "pants-beige", false],
  ["premium-drop", "Blossom Premium Drop", "Drops Exclusivos", "Conjuntos", "Preto", 499.9, "premium", true],
].map(([id, name, category, type, color, price, visual, isNew], created) => ({ id, name, category, type, color, price, visual, isNew, created }));

const collectionSeed = [
  { id: "spring-25", name: "Blossom Spring '25", label: "Coleção Primavera 2025", description: "Peças leves e estilosas para dominar as ruas.", pieces: 12, price: 299.9, visual: "spring", badge: "Nova" },
  { id: "essentials", name: "Blossom Essentials", label: "Coleção Essentials", description: "Peças básicas com o padrão de qualidade Blossom.", pieces: 18, price: 349.9, visual: "essentials", badge: "" },
  { id: "nightfall", name: "Blossom Nightfall", label: "Coleção Nightfall", description: "Cores escuras. Estilo pesado. Presença marcante.", pieces: 10, price: 399.9, visual: "nightfall", badge: "" },
  { id: "luxury", name: "Blossom Luxury", label: "Coleção Luxury", description: "Detalhes premium para quem vive o topo do roleplay.", pieces: 8, price: 499.9, visual: "luxury", badge: "" },
  { id: "sport", name: "Blossom Sport", label: "Coleção Sport", description: "Performance, conforto e estilo para qualquer missão.", pieces: 11, price: 329.9, visual: "sport", badge: "" },
  { id: "oversized", name: "Blossom Oversized", label: "Coleção Oversized", description: "Modelagens amplas para um visual urbano e autêntico.", pieces: 14, price: 369.9, visual: "oversized", badge: "" },
  { id: "pink-label", name: "Blossom Pink Label", label: "Coleção Pink Label", description: "A identidade rosa da Blossom. Única, forte e feminina.", pieces: 9, price: 289.9, visual: "pink-label", badge: "" },
  { id: "collabs", name: "Blossom Collabs", label: "Coleção Collabs", description: "Parcerias especiais que viram história.", pieces: 7, price: 449.9, visual: "collabs", badge: "" },
];

const taxonomySeed = {
  categories: ["Masculino", "Feminino", "Acessórios", "Drops Exclusivos", "Conjuntos"],
  types: ["Camisetas", "Moletons", "Jaquetas", "Calças", "Shorts", "Bonés", "Outros", "Conjuntos"],
  colors: ["Preto", "Branco", "Rosa", "Cinza", "Bege", "Azul"],
  visuals: [
    "hoodie-dark", "tee-white", "jersey", "zip", "cargo", "cap-pink", "puffer", "crop",
    "tee-dark", "hoodie-white", "shorts", "cap-black", "bag", "premium",
    "spring", "essentials", "nightfall", "luxury", "sport", "oversized", "pink-label", "collabs"
  ],
};

const featuredSeed = [
  ["ambassadors", "Luna Vex", "Embaixadora", "pink", "sobre.html#time"],
  ["ambassadors", "Kai Mori", "Embaixador", "dark", "sobre.html#time"],
  ["ambassadors", "Nikki Bloom", "Embaixadora", "rose", "sobre.html#time"],
  ["ambassadors", "Drey Saint", "Embaixador", "black", "sobre.html#time"],
  ["ambassadors", "Mila Knox", "Embaixadora", "pink", "sobre.html#time"],
  ["ambassadors", "Zion Park", "Embaixador", "dark", "sobre.html#time"],
  ["influencers", "@babyxgeon", "Creator", "soft", "contato.html"],
  ["influencers", "@str4wb3rry", "Creator", "vivid", "contato.html"],
  ["influencers", "@gobbimoon", "Creator", "soft", "contato.html"],
  ["influencers", "@otaviokim", "Creator", "mono", "contato.html"],
  ["influencers", "@dudamills", "Creator", "vivid", "contato.html"],
  ["influencers", "@heartzui", "Creator", "soft", "contato.html"],
].map(([section, name, role, visual, href], index) => ({
  id: `${section}-${index}`,
  section,
  name,
  role,
  visual,
  href,
  image: "",
  images: [],
  position: index,
  created: index,
}));

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const apiEnabled = location.protocol.startsWith("http");
let adminSession = readSession();

function field(form, name) {
  return form.elements.namedItem(name);
}

function itemImages(item) {
  if (Array.isArray(item?.images) && item.images.length) return item.images;
  return item?.image ? [item.image] : [];
}

function primaryImage(item) {
  return itemImages(item)[0] || "";
}

function errorText(error) {
  if (!error) return "Erro desconhecido.";
  try {
    const parsed = JSON.parse(error.message);
    return parsed.error || parsed.message || error.message;
  } catch {
    return error.message || "Erro desconhecido.";
  }
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("blossom-user-account")) || null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  adminSession = user;
  localStorage.setItem("blossom-user-account", JSON.stringify({
    logged: true,
    id: user.id,
    name: user.username,
    username: user.username,
    email: user.email || "",
    role: user.role || "cliente",
  }));
  if ((user.role || "cliente") === "admin") {
    localStorage.setItem("blossom-admin-session", "active");
  } else {
    localStorage.removeItem("blossom-admin-session");
  }
}

function authMessage(text, type = "info") {
  const target = $("[data-auth-message]");
  if (!target) return;
  target.textContent = text;
  target.dataset.type = type;
}

async function apiPost(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Erro na API.");
  return body;
}

function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `item-${Date.now()}`;
}

function getData(key, seed) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Array.isArray(saved) ? saved : seed;
  } catch {
    return seed;
  }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getObjectData(key, seed) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved && typeof saved === "object" ? { ...seed, ...saved } : seed;
  } catch {
    return seed;
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Use uma imagem menor que 5MB."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 1100;
        const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => reject(new Error("Não foi possível processar a imagem."));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.readAsDataURL(file);
  });
}

async function filesToDataUrls(files) {
  const selected = Array.from(files || []);
  const images = [];
  for (const file of selected) {
    images.push(await fileToDataUrl(file));
  }
  return images.filter(Boolean);
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

$$("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-auth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    $$("[data-auth-form]").forEach((form) => {
      form.hidden = form.dataset.authForm !== button.dataset.authTab;
    });
    authMessage("");
  });
});

$$("[data-toggle-password]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.closest(".password-field").querySelector("input");
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.textContent = visible ? "Ver" : "Ocultar";
  });
});

$$("[data-auth-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const action = form.dataset.authForm === "forgot" ? "reset" : form.dataset.authForm;
    const submitButton = form.querySelector("[type='submit']");
    const label = submitButton.querySelector("span");
    const originalText = label.textContent;
    submitButton.disabled = true;
    label.textContent = "Aguarde...";

    try {
      const result = await apiPost("/api/auth", {
        action,
        username: data.get("username"),
        password: data.get("password"),
      });
      writeSession(result.user);
      authMessage(action === "register" ? "Conta criada com sucesso." : "Login realizado.", "success");
      window.location.href = result.user.role === "admin" ? "admin.html" : "index.html";
    } catch (error) {
      if (data.get("username") === ADMIN_USER && data.get("password") === ADMIN_PASS) {
        writeSession({ username: ADMIN_USER, role: "admin" });
        window.location.href = "admin.html";
        return;
      }
      authMessage(error.message, "error");
    } finally {
      submitButton.disabled = false;
      label.textContent = originalText;
    }
  });
});

const loginForm = $("[data-login-form]");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    if (data.get("user") === ADMIN_USER && data.get("password") === ADMIN_PASS) {
      writeSession({ username: ADMIN_USER, role: "admin" });
      window.location.href = "admin.html";
      return;
    }
    toast("Usuário ou senha inválidos.");
  });
}

if (document.body.classList.contains("admin-body") && location.pathname.endsWith("admin.html")) {
  const isAdmin = adminSession?.role === "admin";
  if (!isAdmin) {
    window.location.href = "login.html";
  }
}

let adminProducts = apiEnabled ? [] : getData("blossom-products", productSeed);
let adminCollections = apiEnabled ? [] : getData("blossom-collections", collectionSeed);
let adminTaxonomies = apiEnabled ? { categories: [], types: [], colors: [], visuals: [] } : getObjectData("blossom-taxonomies", taxonomySeed);
let adminFeaturedCards = apiEnabled ? featuredSeed : getData("blossom-featured-cards", featuredSeed);
let adminOrders = [];
let adminUsers = [];

async function loadApiStore() {
  if (!apiEnabled || !$("[data-product-list]")) return;
  try {
    const response = await fetch("/api/store");
    if (!response.ok) return;
    const store = await response.json();
    adminProducts = Array.isArray(store.products) ? store.products : [];
    adminCollections = Array.isArray(store.collections) ? store.collections : [];
    adminTaxonomies = store.taxonomies && Object.keys(store.taxonomies).length ? store.taxonomies : { categories: [], types: [], colors: [], visuals: [] };
    adminFeaturedCards = Array.isArray(adminTaxonomies.featuredCards) && adminTaxonomies.featuredCards.length ? adminTaxonomies.featuredCards : featuredSeed;
    adminOrders = Array.isArray(store.orders) ? store.orders : [];
    renderAdmin();
  } catch {
    renderAdmin();
  }
}

async function saveApiStore() {
  if (!apiEnabled) return;
  adminTaxonomies.featuredCards = adminFeaturedCards;
  const response = await fetch("/api/store", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products: adminProducts,
      collections: adminCollections,
      taxonomies: adminTaxonomies,
      orders: adminOrders,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Nao foi possivel salvar no servidor.");
  }
}

async function loadUsers() {
  const list = $("[data-users-list]");
  if (!apiEnabled || !list) return;
  try {
    const response = await fetch("/api/users", {
      headers: { "x-blossom-role": adminSession?.role || "admin" },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "Não foi possível carregar usuários.");
    adminUsers = Array.isArray(body.users) ? body.users : [];
    renderUsers();
  } catch (error) {
    $("[data-users-note]").textContent = error.message;
  }
}

async function updateUserRole(username, role) {
  const response = await fetch("/api/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-blossom-role": adminSession?.role || "admin",
    },
    body: JSON.stringify({ username, role }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Não foi possível alterar o cargo.");
  return body.user;
}

function saveProducts() {
  setData("blossom-products", adminProducts);
  return saveApiStore();
}

function saveCollections() {
  setData("blossom-collections", adminCollections);
  return saveApiStore();
}

function saveTaxonomies() {
  adminTaxonomies.featuredCards = adminFeaturedCards;
  setData("blossom-taxonomies", adminTaxonomies);
  return saveApiStore();
}

function saveFeaturedCards() {
  adminTaxonomies.featuredCards = adminFeaturedCards;
  setData("blossom-featured-cards", adminFeaturedCards);
  return saveApiStore();
}

function optionMarkup(values, selected = "") {
  return [...new Set(values)].map((value) => `<option ${value === selected ? "selected" : ""}>${value}</option>`).join("");
}

function populateProductSelects(product = null) {
  const form = $("[data-product-form]");
  if (!form) return;
  field(form, "category").innerHTML = optionMarkup(adminTaxonomies.categories, product?.category);
  field(form, "type").innerHTML = optionMarkup(adminTaxonomies.types, product?.type);
  field(form, "color").innerHTML = optionMarkup(adminTaxonomies.colors, product?.color);
  field(form, "visual").innerHTML = optionMarkup(adminTaxonomies.visuals, product?.visual || "hoodie-dark");
  field(form, "collection").innerHTML = `<option value="">Sem coleção</option>${adminCollections.map((collection) => `<option value="${collection.id}" ${product?.collection === collection.id ? "selected" : ""}>${collection.name}</option>`).join("")}`;
  field(form, "visibility").value = product?.visibility || "store";
}

function populateCollectionSelects(collection = null) {
  const form = $("[data-collection-form]");
  if (!form) return;
  field(form, "visual").innerHTML = optionMarkup(adminTaxonomies.visuals, collection?.visual || "spring");
}

function renderAdmin() {
  const productList = $("[data-product-list]");
  const collectionList = $("[data-collection-list]");
  if (!productList || !collectionList) return;

  const search = ($("[data-admin-product-search]")?.value || "").toLowerCase();
  const visibleProducts = adminProducts.filter((item) => item.name.toLowerCase().includes(search));

  $("[data-product-total]").textContent = adminProducts.length;
  $("[data-collection-total]").textContent = adminCollections.length;
  $("[data-feature-total]").textContent = adminProducts.filter((item) => item.isNew).length;

  productList.innerHTML = visibleProducts.map((item) => `
    <article class="admin-row">
      <div class="admin-thumb ${item.visual}" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.category} • ${item.type} • ${item.color}</p>
        <strong>${item.visibility === "collection-only" ? "Sem preço individual" : adminMoney.format(Number(item.price))}${item.isNew ? " • Novo" : ""}${item.visibility === "collection-only" ? " • Somente coleção" : ""}${itemImages(item).length ? ` • ${itemImages(item).length} fotos` : ""}</strong>
      </div>
      <div>
        <button type="button" data-edit-product="${item.id}">Editar</button>
        <button type="button" data-delete-product="${item.id}">Remover</button>
      </div>
    </article>
  `).join("") || '<p class="empty-cart">Nenhum produto encontrado.</p>';

  collectionList.innerHTML = adminCollections.map((item) => `
    <article class="admin-row">
      <div class="admin-thumb ${item.visual}" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.label}</p>
        <strong>${adminMoney.format(Number(item.price || 0))} • ${adminProducts.filter((product) => product.collection === item.id).length} peças${item.badge ? ` • ${item.badge}` : ""}${itemImages(item).length ? ` • ${itemImages(item).length} fotos` : ""}</strong>
      </div>
      <div>
        <button type="button" data-edit-collection="${item.id}">Editar</button>
        <button type="button" data-delete-collection="${item.id}">Remover</button>
      </div>
    </article>
  `).join("") || '<p class="empty-cart">Nenhuma coleção cadastrada.</p>';

  renderFeaturedCards();
  renderTaxonomies();
}

function renderFeaturedCards() {
  const list = $("[data-featured-list]");
  if (!list) return;
  list.innerHTML = [...adminFeaturedCards]
    .sort((a, b) => String(a.section).localeCompare(String(b.section)) || Number(a.position || 0) - Number(b.position || 0))
    .map((item) => `
      <article class="admin-row">
        <div class="admin-thumb ${item.visual}" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
        <div>
          <h3>${item.name}</h3>
          <p>${item.section === "ambassadors" ? "Embaixadores" : "Influenciadores"} â€¢ ${item.role || "Sem subtÃ­tulo"}</p>
          <strong>PosiÃ§Ã£o ${Number(item.position || 0)}${itemImages(item).length ? ` â€¢ ${itemImages(item).length} foto` : ""}</strong>
        </div>
        <div>
          <button type="button" data-edit-featured-card="${item.id}">Editar</button>
          <button type="button" data-delete-featured-card="${item.id}">Remover</button>
        </div>
      </article>
    `).join("") || '<p class="empty-cart">Nenhum card cadastrado.</p>';
}

function renderTaxonomies() {
  Object.entries(adminTaxonomies).forEach(([key, values]) => {
    const list = $(`[data-taxonomy-list="${key}"]`);
    if (!list) return;
    list.innerHTML = values.map((value) => `
      <span>${value}<button type="button" data-remove-taxonomy="${key}" data-value="${value}">×</button></span>
    `).join("");
  });
}

function renderUsers() {
  const list = $("[data-users-list]");
  if (!list) return;
  list.innerHTML = adminUsers.map((user) => `
    <article class="admin-row user-row">
      <div class="admin-avatar">${user.username.slice(0, 1).toUpperCase()}</div>
      <div>
        <h3>${user.username}</h3>
        <p>${user.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "Conta registrada"}</p>
        <strong>${user.role || "cliente"}</strong>
      </div>
      <div>
        <select data-user-role="${user.username}" ${user.username === adminSession?.username ? "disabled" : ""}>
          <option value="cliente" ${user.role !== "admin" ? "selected" : ""}>Cliente</option>
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
        </select>
      </div>
    </article>
  `).join("") || '<p class="empty-cart">Nenhuma conta cadastrada.</p>';
}

function openProductForm(product = null) {
  const dialog = $("[data-product-dialog]");
  const form = $("[data-product-form]");
  form.reset();
  populateProductSelects(product);
  $("[data-product-form-title]").textContent = product ? "Editar produto" : "Novo produto";
  field(form, "id").value = product?.id || "";
  field(form, "name").value = product?.name || "";
  field(form, "price").value = product?.price || "";
  field(form, "isNew").checked = Boolean(product?.isNew);
  form.dataset.currentImages = JSON.stringify(itemImages(product));
  const count = itemImages(product).length;
  $("[data-product-image-note]").textContent = count ? `${count} imagem(ns) atuais. Envie outras para substituir.` : "Nenhuma imagem anexada.";
  dialog.showModal();
}

function openCollectionForm(collection = null) {
  const dialog = $("[data-collection-dialog]");
  const form = $("[data-collection-form]");
  form.reset();
  populateCollectionSelects(collection);
  $("[data-collection-form-title]").textContent = collection ? "Editar coleção" : "Nova coleção";
  field(form, "id").value = collection?.id || "";
  field(form, "name").value = collection?.name || "";
  field(form, "label").value = collection?.label || "";
  field(form, "description").value = collection?.description || "";
  field(form, "pieces").value = collection?.pieces || "";
  field(form, "price").value = collection?.price || "";
  field(form, "badge").value = collection?.badge || "";
  form.dataset.currentImages = JSON.stringify(itemImages(collection));
  const count = itemImages(collection).length;
  $("[data-collection-image-note]").textContent = count ? `${count} imagem(ns) atuais. Envie outras para substituir.` : "Nenhuma imagem anexada.";
  dialog.showModal();
}

function openFeaturedForm(card = null) {
  const dialog = $("[data-featured-dialog]");
  const form = $("[data-featured-form]");
  if (!dialog || !form) return;
  form.reset();
  $("[data-featured-form-title]").textContent = card ? "Editar card destaque" : "Novo card destaque";
  field(form, "id").value = card?.id || "";
  field(form, "section").value = card?.section || "ambassadors";
  field(form, "name").value = card?.name || "";
  field(form, "role").value = card?.role || "";
  field(form, "href").value = card?.href || (card?.section === "influencers" ? "contato.html" : "sobre.html#time");
  field(form, "visual").value = card?.visual || "pink";
  field(form, "position").value = card?.position ?? adminFeaturedCards.length;
  form.dataset.currentImages = JSON.stringify(itemImages(card));
  const count = itemImages(card).length;
  $("[data-featured-image-note]").textContent = count ? `${count} imagem atual. Envie outra para substituir.` : "Nenhuma imagem anexada.";
  dialog.showModal();
}

$("[data-new-product]")?.addEventListener("click", () => openProductForm());
$("[data-new-collection]")?.addEventListener("click", () => openCollectionForm());
$("[data-new-featured-card]")?.addEventListener("click", () => openFeaturedForm());
$("[data-admin-product-search]")?.addEventListener("input", renderAdmin);
$("[data-refresh-users]")?.addEventListener("click", loadUsers);

$("[data-product-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-product-image-note]").textContent = count
    ? `${count} imagem(ns) selecionada(s). Elas serão otimizadas ao salvar.`
    : "Nenhuma imagem anexada.";
});

$("[data-collection-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-collection-image-note]").textContent = count
    ? `${count} imagem(ns) selecionada(s). Elas serão otimizadas ao salvar.`
    : "Nenhuma imagem anexada.";
});

document.addEventListener("click", (event) => {
  const editProduct = event.target.closest("[data-edit-product]");
  const deleteProduct = event.target.closest("[data-delete-product]");
  const editCollection = event.target.closest("[data-edit-collection]");
  const deleteCollection = event.target.closest("[data-delete-collection]");
  const editFeaturedCard = event.target.closest("[data-edit-featured-card]");
  const deleteFeaturedCard = event.target.closest("[data-delete-featured-card]");
  const closeDialog = event.target.closest("[data-close-dialog]");

  if (editProduct) openProductForm(adminProducts.find((item) => item.id === editProduct.dataset.editProduct));
  if (editCollection) openCollectionForm(adminCollections.find((item) => item.id === editCollection.dataset.editCollection));
  if (editFeaturedCard) openFeaturedForm(adminFeaturedCards.find((item) => item.id === editFeaturedCard.dataset.editFeaturedCard));

  if (deleteProduct) {
    adminProducts = adminProducts.filter((item) => item.id !== deleteProduct.dataset.deleteProduct);
    saveProducts().catch((error) => console.warn(error));
    renderAdmin();
    toast("Produto removido.");
  }

  if (deleteCollection) {
    adminCollections = adminCollections.filter((item) => item.id !== deleteCollection.dataset.deleteCollection);
    saveCollections().catch((error) => console.warn(error));
    renderAdmin();
    toast("Coleção removida.");
  }

  if (deleteFeaturedCard) {
    adminFeaturedCards = adminFeaturedCards.filter((item) => item.id !== deleteFeaturedCard.dataset.deleteFeaturedCard);
    saveFeaturedCards().catch((error) => console.warn(error));
    renderAdmin();
    toast("Card removido.");
  }

  const removeTaxonomy = event.target.closest("[data-remove-taxonomy]");
  if (removeTaxonomy) {
    const key = removeTaxonomy.dataset.removeTaxonomy;
    const value = removeTaxonomy.dataset.value;
    adminTaxonomies[key] = adminTaxonomies[key].filter((item) => item !== value);
    saveTaxonomies().catch((error) => console.warn(error));
    renderAdmin();
    toast("Opção removida.");
  }

  if (closeDialog) closeDialog.closest("dialog").close();
});

document.addEventListener("change", async (event) => {
  const roleSelect = event.target.closest("[data-user-role]");
  if (!roleSelect) return;
  const previous = adminUsers.find((user) => user.username === roleSelect.dataset.userRole)?.role || "cliente";
  try {
    await updateUserRole(roleSelect.dataset.userRole, roleSelect.value);
    $("[data-users-note]").textContent = "Cargo atualizado.";
    await loadUsers();
  } catch (error) {
    roleSelect.value = previous;
    $("[data-users-note]").textContent = error.message;
  }
});

$("[data-product-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  const id = data.get("id") || slugify(data.get("name"));
  let images = JSON.parse(form.dataset.currentImages || "[]");
  try {
    const uploadedImages = await filesToDataUrls(field(form, "images").files);
    images = uploadedImages.length ? uploadedImages : images;
  } catch (error) {
    $("[data-product-image-note]").textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  if (data.get("visibility") === "collection-only" && !data.get("collection")) {
    $("[data-product-image-note]").textContent = "Escolha uma coleção para produtos que aparecem somente na coleção.";
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }
  if (data.get("visibility") !== "collection-only" && !data.get("price")) {
    $("[data-product-image-note]").textContent = "Informe o preço para produtos que aparecem na loja.";
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  const product = {
    id,
    name: data.get("name"),
    category: data.get("category"),
    type: data.get("type"),
    color: data.get("color"),
    collection: data.get("collection"),
    visibility: data.get("visibility"),
    price: data.get("visibility") === "collection-only" ? 0 : Number(data.get("price")),
    visual: data.get("visual"),
    image: images[0] || "",
    images,
    isNew: data.has("isNew"),
    created: adminProducts.find((item) => item.id === id)?.created ?? Date.now(),
  };

  adminProducts = adminProducts.some((item) => item.id === id)
    ? adminProducts.map((item) => item.id === id ? product : item)
    : [product, ...adminProducts];

  try {
    await saveProducts();
    form.closest("dialog").close();
    renderAdmin();
    toast("Produto salvo.");
  } catch (error) {
    console.error(error);
    $("[data-product-image-note]").textContent = `Erro ao salvar: ${errorText(error)}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$("[data-collection-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  const id = data.get("id") || slugify(data.get("name"));
  let images = JSON.parse(form.dataset.currentImages || "[]");
  try {
    const uploadedImages = await filesToDataUrls(field(form, "images").files);
    images = uploadedImages.length ? uploadedImages : images;
  } catch (error) {
    $("[data-collection-image-note]").textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  const collection = {
    id,
    name: data.get("name"),
    label: data.get("label"),
    description: data.get("description"),
    pieces: adminProducts.filter((product) => product.collection === id).length,
    price: Number(data.get("price")),
    visual: data.get("visual"),
    badge: data.get("badge"),
    image: images[0] || "",
    images,
    created: adminCollections.find((item) => item.id === id)?.created ?? Date.now(),
  };

  adminCollections = adminCollections.some((item) => item.id === id)
    ? adminCollections.map((item) => item.id === id ? collection : item)
    : [collection, ...adminCollections];

  try {
    await saveCollections();
    form.closest("dialog").close();
    renderAdmin();
  } catch (error) {
    console.error(error);
    $("[data-collection-image-note]").textContent = `Erro ao salvar: ${errorText(error)}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$("[data-featured-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  const id = data.get("id") || `${data.get("section")}-${slugify(data.get("name"))}`;
  let images = JSON.parse(form.dataset.currentImages || "[]");
  try {
    const uploadedImages = await filesToDataUrls(field(form, "images").files);
    images = uploadedImages.length ? uploadedImages : images;
  } catch (error) {
    $("[data-featured-image-note]").textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  const card = {
    id,
    section: data.get("section"),
    name: data.get("name"),
    role: data.get("role") || (data.get("section") === "influencers" ? "Creator" : "Embaixador"),
    href: data.get("href") || (data.get("section") === "influencers" ? "contato.html" : "sobre.html#time"),
    visual: data.get("visual"),
    position: Number(data.get("position") || 0),
    image: images[0] || "",
    images,
    created: adminFeaturedCards.find((item) => item.id === id)?.created ?? Date.now(),
  };

  adminFeaturedCards = adminFeaturedCards.some((item) => item.id === id)
    ? adminFeaturedCards.map((item) => item.id === id ? card : item)
    : [card, ...adminFeaturedCards];

  try {
    await saveFeaturedCards();
    form.closest("dialog").close();
    renderAdmin();
    toast("Card salvo.");
  } catch (error) {
    console.error(error);
    $("[data-featured-image-note]").textContent = `Erro ao salvar: ${errorText(error)}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$("[data-reset-data]")?.addEventListener("click", () => {
  adminProducts = productSeed;
  adminCollections = collectionSeed;
  adminTaxonomies = taxonomySeed;
  adminFeaturedCards = featuredSeed;
  saveProducts().catch((error) => console.warn(error));
  saveCollections().catch((error) => console.warn(error));
  saveFeaturedCards().catch((error) => console.warn(error));
  renderAdmin();
  toast("Dados padrão restaurados.");
});

$$("[data-taxonomy-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const key = form.dataset.taxonomyForm;
    const input = form.querySelector("input");
    const value = input.value.trim();
    if (!value) return;
    adminTaxonomies[key] = [...new Set([...adminTaxonomies[key], value])];
    input.value = "";
    saveTaxonomies().catch((error) => console.warn(error));
    renderAdmin();
    toast("Opção adicionada.");
  });
});

$("[data-logout]")?.addEventListener("click", () => {
  localStorage.removeItem("blossom-user-account");
  localStorage.removeItem("blossom-admin-session");
  window.location.href = "login.html";
});

$("[data-featured-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-featured-image-note]").textContent = count
    ? `${count} imagem selecionada. Ela serÃ¡ otimizada ao salvar.`
    : "Nenhuma imagem anexada.";
});

renderAdmin();
loadApiStore();
loadUsers();

