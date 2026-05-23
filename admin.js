const adminMoney = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

function setAdminTheme(theme) {
  const light = theme === "light";
  document.documentElement.classList.toggle("site-light", light);
  document.documentElement.dataset.siteTheme = light ? "light" : "dark";
  document.body.classList.toggle("home-light", light);
  document.body.classList.toggle("editorial-light", light);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => button.setAttribute("aria-pressed", String(light)));
  localStorage.setItem("blossom-site-theme", light ? "light" : "dark");
}

setAdminTheme(localStorage.getItem("blossom-site-theme") || localStorage.getItem("blossom-home-theme") || "dark");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => setAdminTheme(document.body.classList.contains("home-light") ? "dark" : "light"));
  });
});

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
  ["ambassadors", "Luna Vex", "Cherry", "pink", "sobre.html#time"],
  ["ambassadors", "Kai Mori", "Cherry", "dark", "sobre.html#time"],
  ["ambassadors", "Nikki Bloom", "Cherry", "rose", "sobre.html#time"],
  ["ambassadors", "Drey Saint", "Cherry", "black", "sobre.html#time"],
  ["ambassadors", "Mila Knox", "Cherry", "pink", "sobre.html#time"],
  ["ambassadors", "Zion Park", "Cherry", "dark", "sobre.html#time"],
  ["influencers", "@babyxgeon", "Creator", "soft", "livro.html?aba=influencers"],
  ["influencers", "@str4wb3rry", "Creator", "vivid", "livro.html?aba=influencers"],
  ["influencers", "@gobbimoon", "Creator", "soft", "livro.html?aba=influencers"],
  ["influencers", "@otaviokim", "Creator", "mono", "livro.html?aba=influencers"],
  ["influencers", "@dudamills", "Creator", "vivid", "livro.html?aba=influencers"],
  ["influencers", "@heartzui", "Creator", "soft", "livro.html?aba=influencers"],
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

const futureDropSeed = {
  eyebrow: "Featured drop",
  title: "Blossom Future",
  description: "Uma nova colecao esta sendo preparada para trazer uma identidade mais intensa, exclusiva e feita para quem quer se destacar no roleplay.",
  button: "Lancamento em breve",
  href: "colecoes.html",
  badge: "Soon",
  cardTitle: "Blossom",
  image: "",
  images: [],
};

const siteBannersSeed = {
  homeHero: {
    title: "Blossom Store",
    subtitle: "Store",
    heading: "Moda que expressa.<br>Atitude que floresce.",
    description: "BLOSSOM nasceu da fusao entre o drama e o desejo de se destacar. Criamos pecas digitais que representam forca, beleza e rebeldia.",
    primaryText: "Discord",
    primaryHref: "https://discord.gg/blossom",
    secondaryText: "Patreon",
    secondaryHref: "https://www.patreon.com",
    image: "",
    images: [],
  },
  collectionsHero: {
    eyebrow: "Colecoes",
    title: "Explore o universo",
    highlight: "Blossom",
    description: "Cada colecao carrega uma essencia unica. Estetica, atitude e exclusividade em cada detalhe.",
    button: "Descubra todas as colecoes",
    href: "#todas-colecoes",
    imageTitle: "blossom",
    image: "",
    images: [],
  },
};

const bookSettingsSeed = {
  titleLine1: "Livro da",
  titleLine2: "Comunidade",
  overviewKicker: "Sobre o livro",
  overviewHeading: "Conheca quem faz parte da Blossom",
  ambassadorsIntro: "Conheca os Cherrys e influenciadores que fazem parte da historia da Blossom. Cada pagina guarda essencia, conexao e inspiracao.",
  influencersIntro: "Conheca os influenciadores que espalham a essencia Blossom, criando conexao, estilo e presenca em cada conteudo.",
  imageLabel: "Imagem preparada",
};

const aboutSettingsSeed = {
  heroKicker: "Sobre nos",
  heroTitle: "Nosso time",
  heroDescription: "Por tras da Blossom existe um time apaixonado por moda, criatividade e autenticidade. Cada pessoa aqui carrega o proposito de criar mais que roupas: criamos um movimento.",
  heroImage: "",
  heroImages: [],
  teamKicker: "Nossa equipe",
  newsletterText: "Receba novidades e lancamentos exclusivos.",
  members: [
    { id: "madison", name: "Madison Montgomery", role: "Founder & CEO", instagram: "Instagram", bio: "Madison Montgomery e a mente criativa por tras da Blossom. Lidera o conceito visual, a direcao de moda e a identidade da marca.", isFounder: true, visual: "team-one", image: "", images: [] },
    { id: "malik", name: "Malik Montgomery", role: "Co-founder", instagram: "Instagram", bio: "Malik cuida da estrategia, conexoes e expansao da Blossom, mantendo cada lancamento alinhado com a comunidade.", isFounder: false, visual: "team-two", image: "", images: [] },
    { id: "aika", name: "Aika Prinxx", role: "Design Director", instagram: "Instagram", bio: "Aika transforma referencias em pecas digitais com acabamento, atitude e assinatura visual forte.", isFounder: false, visual: "team-three", image: "", images: [] },
    { id: "diana", name: "Diana Hyperion", role: "Community Manager", instagram: "Instagram", bio: "Diana aproxima a Blossom de quem vive a marca, ouvindo a comunidade e cuidando da experiencia diaria.", isFounder: false, visual: "team-four", image: "", images: [] },
    { id: "paty", name: "Paty Montgomery", role: "Content Creator", instagram: "Instagram", bio: "Paty cria narrativas, imagens e presenca digital para apresentar a estetica Blossom em cada detalhe.", isFounder: false, visual: "team-five", image: "", images: [] },
    { id: "felipe", name: "Felipe Gilmore", role: "Creative Director", instagram: "Instagram", bio: "Felipe conduz ideias, campanhas e direcao artistica para manter a Blossom intensa, elegante e memoravel.", isFounder: false, visual: "team-six", image: "", images: [] },
  ],
};

function normalizeAboutSettings(settings = {}) {
  const source = isPlainObject(settings) ? settings : {};
  const members = Array.isArray(source.members) && source.members.length ? source.members : aboutSettingsSeed.members;
  const founderIndex = Math.max(0, members.findIndex((member) => member?.isFounder));
  return {
    ...aboutSettingsSeed,
    ...source,
    members: members.map((member, index) => ({
      ...aboutSettingsSeed.members[index % aboutSettingsSeed.members.length],
      ...member,
      id: member?.id || `member-${index}`,
      isFounder: index === founderIndex,
      images: Array.isArray(member?.images) ? member.images : [],
      image: member?.image || "",
      bio: member?.bio || "",
    })),
  };
}

function featuredSectionLabel(section) {
  if (section === "ambassadors") return "Cherrys";
  if (section === "influencers") return "Influenciadores";
  if (section === "cherrys") return "Cherrys";
  return section || "Destaques";
}

function canBeCherrySpotlight(section) {
  return section === "ambassadors" || section === "cherrys";
}

function enforceSingleCherrySpotlight(activeId) {
  adminFeaturedCards = adminFeaturedCards.map((item) => ({
    ...item,
    isCherrySpotlight: item.id === activeId && canBeCherrySpotlight(item.section),
  }));
}

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const apiEnabled = location.protocol.startsWith("http");
let adminSession = readSession();

function field(form, name) {
  return form.elements.namedItem(name);
}

function escapeAttr(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
    return saved && typeof saved === "object" && !Array.isArray(saved) ? { ...seed, ...saved } : seed;
  } catch {
    return seed;
  }
}

function isPlainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) { resolve(""); return; }
    if (file.size > 10 * 1024 * 1024) { reject(new Error("Use uma imagem menor que 10MB.")); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 1980;
        const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
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
  for (const file of selected) { images.push(await fileToDataUrl(file)); }
  return images.filter(Boolean);
}

const adminPreviewUrls = new WeakMap();

function clearAdminPreviewUrls(input) {
  const urls = adminPreviewUrls.get(input) || [];
  urls.forEach((url) => URL.revokeObjectURL(url));
  adminPreviewUrls.delete(input);
}

function findImagePreviewHost(input, noteSelector = ".admin-image-note") {
  const scope = input.closest("[data-about-member-row], form, .admin-content-panel") || input.parentElement;
  const note = scope?.querySelector(noteSelector);
  if (!note) return null;
  let preview = note.nextElementSibling?.classList?.contains("admin-image-preview") ? note.nextElementSibling : null;
  if (!preview) {
    preview = document.createElement("div");
    preview.className = "admin-image-preview";
    note.insertAdjacentElement("afterend", preview);
  }
  preview.classList.toggle("is-member-preview", /^memberImage/.test(input.name || ""));
  return preview;
}

function setAdminImagePreview(input, images = [], noteSelector) {
  if (!input) return;
  clearAdminPreviewUrls(input);
  const preview = findImagePreviewHost(input, noteSelector);
  if (!preview) return;
  preview.innerHTML = images.map((src, index) => `
    <figure>
      <img src="${escapeAttr(src)}" alt="Preview ${index + 1}">
      <figcaption>Imagem ${index + 1}</figcaption>
    </figure>
  `).join("");
}

function previewSelectedImages(input, noteSelector) {
  if (!input) return;
  clearAdminPreviewUrls(input);
  const files = Array.from(input.files || []);
  const urls = files.map((file) => URL.createObjectURL(file));
  adminPreviewUrls.set(input, urls);
  const preview = findImagePreviewHost(input, noteSelector);
  if (!preview) return;
  preview.innerHTML = files.map((file, index) => `
    <figure>
      <img src="${escapeAttr(urls[index])}" alt="Preview ${index + 1}">
      <figcaption>${escapeHtml(file.name || `Imagem ${index + 1}`)}</figcaption>
    </figure>
  `).join("");
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  el.style.cssText = "position:fixed;right:24px;bottom:24px;z-index:70;max-width:min(340px,calc(100% - 48px));padding:14px 16px;border:1px solid rgba(201,123,123,0.42);border-radius:7px;background:rgba(255,255,255,0.98);color:#2d1f1f;box-shadow:0 16px 46px rgba(0,0,0,0.1);font-size:13px;font-weight:800;";
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(12px)"; setTimeout(() => el.remove(), 300); }, 3000);
}

/* Auth forms on login page */
$$("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-auth-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    $$("[data-auth-form]").forEach((form) => { form.hidden = form.dataset.authForm !== button.dataset.authTab; });
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
      const result = await apiPost("/api/auth", { action, username: data.get("username"), password: data.get("password") });
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

/* Admin guard */
if (document.body.classList.contains("admin-new-body") && location.pathname.endsWith("admin.html")) {
  const isAdmin = adminSession?.role === "admin";
  if (!isAdmin) { window.location.href = "login.html"; }
}

let adminProducts = apiEnabled ? [] : getData("blossom-products", productSeed);
let adminCollections = apiEnabled ? [] : getData("blossom-collections", collectionSeed);
let adminTaxonomies = apiEnabled ? { categories: [], types: [], colors: [], visuals: [] } : getObjectData("blossom-taxonomies", taxonomySeed);
let adminFeaturedCards = apiEnabled ? featuredSeed : getData("blossom-featured-cards", featuredSeed);
let adminFutureDrop = apiEnabled ? futureDropSeed : getObjectData("blossom-future-drop", futureDropSeed);
let adminSiteBanners = apiEnabled ? siteBannersSeed : getObjectData("blossom-site-banners", siteBannersSeed);
let adminBookSettings = apiEnabled ? bookSettingsSeed : { ...bookSettingsSeed, ...getObjectData("blossom-book-settings", bookSettingsSeed) };
let adminAboutSettings = apiEnabled ? aboutSettingsSeed : normalizeAboutSettings(getObjectData("blossom-about-settings", aboutSettingsSeed));
let adminOrders = [];
let adminUsers = [];

async function loadApiStore() {
  if (!apiEnabled) return;
  try {
    const response = await fetch("/api/store");
    if (!response.ok) return;
    const store = await response.json();
    adminProducts = Array.isArray(store.products) ? store.products : [];
    adminCollections = Array.isArray(store.collections) ? store.collections : [];
    adminTaxonomies = store.taxonomies && Object.keys(store.taxonomies).length ? store.taxonomies : { categories: [], types: [], colors: [], visuals: [] };
    adminFeaturedCards = Array.isArray(adminTaxonomies.featuredCards) && adminTaxonomies.featuredCards.length ? adminTaxonomies.featuredCards : featuredSeed;
    adminFutureDrop = isPlainObject(adminTaxonomies.futureDrop) ? { ...futureDropSeed, ...adminTaxonomies.futureDrop } : getObjectData("blossom-future-drop", futureDropSeed);
    adminSiteBanners = isPlainObject(adminTaxonomies.siteBanners) ? { ...siteBannersSeed, ...adminTaxonomies.siteBanners } : getObjectData("blossom-site-banners", siteBannersSeed);
    adminBookSettings = isPlainObject(adminTaxonomies.bookSettings) ? { ...bookSettingsSeed, ...adminTaxonomies.bookSettings } : getObjectData("blossom-book-settings", bookSettingsSeed);
    adminAboutSettings = isPlainObject(adminTaxonomies.aboutSettings) ? normalizeAboutSettings(adminTaxonomies.aboutSettings) : normalizeAboutSettings(getObjectData("blossom-about-settings", aboutSettingsSeed));
    adminOrders = Array.isArray(store.orders) ? store.orders : [];
    renderAll();
  } catch { renderAll(); }
}

async function saveApiStore() {
  if (!apiEnabled) return;
  adminTaxonomies.featuredCards = adminFeaturedCards;
  adminTaxonomies.futureDrop = adminFutureDrop;
  adminTaxonomies.siteBanners = adminSiteBanners;
  adminTaxonomies.bookSettings = adminBookSettings;
  adminTaxonomies.aboutSettings = adminAboutSettings;
  const response = await fetch("/api/store", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products: adminProducts, collections: adminCollections, taxonomies: adminTaxonomies, orders: adminOrders }),
  });
  if (!response.ok) { const detail = await response.text(); throw new Error(detail || "Nao foi possivel salvar no servidor."); }
}

async function loadUsers() {
  if (!apiEnabled) return;
  try {
    const response = await fetch("/api/users", { headers: { "x-blossom-role": adminSession?.role || "admin" } });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "Não foi possível carregar usuários.");
    adminUsers = Array.isArray(body.users) ? body.users : [];
    renderUsers();
  } catch (error) { toast(error.message); }
}

async function updateUserRole(username, role) {
  const response = await fetch("/api/users", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-blossom-role": adminSession?.role || "admin" },
    body: JSON.stringify({ username, role }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Não foi possível alterar o cargo.");
  return body.user;
}

function saveProducts() { setData("blossom-products", adminProducts); return saveApiStore(); }
function saveCollections() { setData("blossom-collections", adminCollections); return saveApiStore(); }
function syncAdminTaxonomies() { adminTaxonomies.featuredCards = adminFeaturedCards; adminTaxonomies.futureDrop = adminFutureDrop; adminTaxonomies.siteBanners = adminSiteBanners; adminTaxonomies.bookSettings = adminBookSettings; adminTaxonomies.aboutSettings = adminAboutSettings; }
function saveTaxonomies() { syncAdminTaxonomies(); setData("blossom-taxonomies", adminTaxonomies); return saveApiStore(); }
function saveFeaturedCards() { syncAdminTaxonomies(); setData("blossom-featured-cards", adminFeaturedCards); return saveApiStore(); }
function saveFutureDrop() { syncAdminTaxonomies(); setData("blossom-future-drop", adminFutureDrop); return saveApiStore(); }
function saveSiteBanners() { syncAdminTaxonomies(); setData("blossom-site-banners", adminSiteBanners); return saveApiStore(); }
function saveBookSettings() { syncAdminTaxonomies(); setData("blossom-book-settings", adminBookSettings); return saveApiStore(); }
function saveAboutSettings() { adminAboutSettings = normalizeAboutSettings(adminAboutSettings); syncAdminTaxonomies(); setData("blossom-about-settings", adminAboutSettings); return saveApiStore(); }

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

/* Navigation */
function navigateTo(section) {
  $$(".admin-section").forEach((s) => s.classList.toggle("active", s.dataset.section === section));
  $$(".admin-nav-link").forEach((l) => l.classList.toggle("active", l.dataset.nav === section));
  const titles = { dashboard: "Painel Administrativo", products: "Produtos", collections: "Coleções", featured: "Destaques", book: "Livro", about: "Sobre nos", users: "Usuários", taxonomies: "Categorias & Tipos", future: "Drop Futuro", settings: "Configurações" };
  const t = $("[data-page-title]");
  if (t) t.textContent = titles[section] || "Painel";
  renderAll();
}

$$(".admin-nav-link").forEach((link) => {
  link.addEventListener("click", () => navigateTo(link.dataset.nav));
});

$$("[data-goto]").forEach((btn) => {
  btn.addEventListener("click", () => navigateTo(btn.dataset.goto));
});

/* Render functions */
function renderAll() {
  renderDashboard();
  renderProducts();
  renderCollections();
  renderFeaturedCards();
  renderBookPages();
  renderBookSettings();
  renderAboutSettings();
  renderTaxonomies();
  renderFutureDropPreview();
  renderSiteBannerForms();
  renderUsers();
  updateStats();
}

function renderBookSettings() {
  const form = $("[data-book-settings-form]");
  if (!form) return;
  field(form, "titleLine1").value = adminBookSettings.titleLine1 || "";
  field(form, "titleLine2").value = adminBookSettings.titleLine2 || "";
  field(form, "overviewKicker").value = adminBookSettings.overviewKicker || "";
  field(form, "overviewHeading").value = adminBookSettings.overviewHeading || "";
  field(form, "ambassadorsIntro").value = adminBookSettings.ambassadorsIntro || "";
  field(form, "influencersIntro").value = adminBookSettings.influencersIntro || "";
  field(form, "imageLabel").value = adminBookSettings.imageLabel || "";
}

function renderAboutSettings() {
  const form = $("[data-about-settings-form]");
  const editor = $("[data-about-team-editor]");
  if (!form || !editor) return;
  adminAboutSettings = normalizeAboutSettings(adminAboutSettings);
  field(form, "heroKicker").value = adminAboutSettings.heroKicker || "";
  field(form, "heroTitle").value = adminAboutSettings.heroTitle || "";
  field(form, "heroDescription").value = adminAboutSettings.heroDescription || "";
  field(form, "teamKicker").value = adminAboutSettings.teamKicker || "";
  field(form, "newsletterText").value = adminAboutSettings.newsletterText || "";
  form.dataset.currentHeroImages = JSON.stringify(adminAboutSettings.heroImages?.length ? adminAboutSettings.heroImages : (adminAboutSettings.heroImage ? [adminAboutSettings.heroImage] : []));
  const heroNote = $("[data-about-hero-note]");
  const heroCount = JSON.parse(form.dataset.currentHeroImages || "[]").length;
  if (heroNote) heroNote.textContent = heroCount ? `${heroCount} imagem atual. Envie outra para substituir.` : "Nenhuma imagem anexada.";
  setAdminImagePreview(field(form, "heroImages"), JSON.parse(form.dataset.currentHeroImages || "[]"));
  editor.innerHTML = adminAboutSettings.members.map((member, index) => {
    const images = itemImages(member);
    const thumbStyle = images[0] ? ` style="background-image:url('${escapeAttr(images[0])}')"` : "";
    return `
      <div class="admin-about-member-card" data-about-member-row="${index}" data-current-images='${JSON.stringify(images)}'>
        <div class="admin-about-member-summary">
          <div class="admin-about-member-thumb"${thumbStyle}></div>
          <div class="admin-about-member-meta">
            <b>${escapeHtml(member.name || `Membro ${index + 1}`)}</b>
            <span>${escapeHtml(member.role || "Cargo")}${images.length ? ` · ${images.length} imagem(ns)` : ""}</span>
          </div>
          <button class="btn-add" type="button" data-about-member-edit="${index}" aria-expanded="false">Modificar</button>
        </div>
        <div class="admin-about-member-fields">
          <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--admin-muted);"><input name="memberFounder${index}" type="checkbox" ${member.isFounder ? "checked" : ""}> Founder em destaque</label>
          <div class="admin-form-grid">
            <label>Nome<input name="memberName${index}" value="${escapeAttr(member.name)}" required></label>
            <label>Cargo<input name="memberRole${index}" value="${escapeAttr(member.role)}" required></label>
          </div>
          <div class="admin-form-grid">
            <label>Instagram ou link<input name="memberInstagram${index}" value="${escapeAttr(member.instagram)}"></label>
            <label>Imagens<input name="memberImage${index}" type="file" accept="image/png,image/jpeg,image/gif,image/webp" multiple></label>
          </div>
          <label>Texto do pop-up<textarea name="memberBio${index}" rows="3">${escapeHtml(member.bio)}</textarea></label>
          <p class="admin-image-note" data-about-member-note="${index}">${images.length ? `${images.length} imagem(ns) atual(is). Envie outras para substituir.` : "Nenhuma imagem anexada."}</p>
        </div>
      </div>
    `;
  }).join("");
  adminAboutSettings.members.forEach((member, index) => {
    setAdminImagePreview(field(form, `memberImage${index}`), itemImages(member));
  });
}

function updateStats() {
  const sProducts = $("[data-stat-products]");
  const sCollections = $("[data-stat-collections]");
  const sFeatured = $("[data-stat-featured]");
  const sUsers = $("[data-stat-users]");
  if (sProducts) sProducts.textContent = adminProducts.length;
  if (sCollections) sCollections.textContent = adminCollections.length;
  if (sFeatured) sFeatured.textContent = adminFeaturedCards.length;
  if (sUsers) sUsers.textContent = adminUsers.length;

  const avatar = $("[data-admin-avatar]");
  const username = $("[data-admin-username]");
  if (avatar) avatar.textContent = (adminSession?.username || "A").slice(0, 1).toUpperCase();
  if (username) username.textContent = adminSession?.username || "Admin";
}

function renderDashboard() {
  const prodContainer = $("[data-dashboard-products]");
  const collContainer = $("[data-dashboard-collections]");
  if (!prodContainer || !collContainer) return;

  const recentProducts = [...adminProducts].sort((a, b) => (b.created || 0) - (a.created || 0)).slice(0, 5);
  const recentCollections = [...adminCollections].sort((a, b) => (b.created || 0) - (a.created || 0)).slice(0, 5);

  prodContainer.innerHTML = recentProducts.length ? `
    <table class="admin-table">
      <tbody>
        ${recentProducts.map((item) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="cell-thumb" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
                <div class="cell-info">
                  <b>${item.name}</b>
                  <small>${item.category} • ${item.type}</small>
                </div>
              </div>
            </td>
            <td class="cell-price">${item.visibility === "collection-only" ? "—" : adminMoney.format(Number(item.price))}</td>
            <td><span class="cell-status">${item.isNew ? "Novo" : "Ativo"}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhum produto cadastrado.</p>';

  collContainer.innerHTML = recentCollections.length ? `
    <table class="admin-table">
      <tbody>
        ${recentCollections.map((item) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="cell-thumb" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
                <div class="cell-info">
                  <b>${item.name}</b>
                  <small>${item.label}</small>
                </div>
              </div>
            </td>
            <td class="cell-price">${adminMoney.format(Number(item.price || 0))}</td>
            <td><span class="cell-status">${item.badge || "Ativo"}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhuma coleção cadastrada.</p>';
}

function renderProducts() {
  const list = $("[data-product-list]");
  if (!list) return;
  list.innerHTML = adminProducts.length ? `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Status</th>
          <th style="width:100px;text-align:right;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${adminProducts.map((item) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="cell-thumb" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
                <div class="cell-info">
                  <b>${item.name}</b>
                  <small>${item.type} • ${item.color}</small>
                </div>
              </div>
            </td>
            <td>${item.category}</td>
            <td class="cell-price">${item.visibility === "collection-only" ? "—" : adminMoney.format(Number(item.price))}</td>
            <td><span class="cell-status">${item.isNew ? "Novo" : "Ativo"}</span></td>
            <td class="cell-actions" style="justify-content:flex-end;">
              <button type="button" data-edit-product="${item.id}" title="Editar">✎</button>
              <button type="button" data-delete-product="${item.id}" title="Remover">🗑</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhum produto cadastrado.</p>';
}

function renderCollections() {
  const list = $("[data-collection-list]");
  if (!list) return;
  list.innerHTML = adminCollections.length ? `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Coleção</th>
          <th>Peças</th>
          <th>Preço</th>
          <th style="width:100px;text-align:right;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${adminCollections.map((item) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="cell-thumb" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
                <div class="cell-info">
                  <b>${item.name}</b>
                  <small>${item.label}</small>
                </div>
              </div>
            </td>
            <td>${adminProducts.filter((p) => p.collection === item.id).length}</td>
            <td class="cell-price">${adminMoney.format(Number(item.price || 0))}</td>
            <td class="cell-actions" style="justify-content:flex-end;">
              <button type="button" data-edit-collection="${item.id}" title="Editar">✎</button>
              <button type="button" data-delete-collection="${item.id}" title="Remover">🗑</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhuma coleção cadastrada.</p>';
}

function renderFeaturedCards() {
  const list = $("[data-featured-list]");
  if (!list) return;
  const sorted = [...adminFeaturedCards].sort((a, b) => String(a.section).localeCompare(String(b.section)) || Number(a.position || 0) - Number(b.position || 0));
  list.innerHTML = sorted.length ? `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Card</th>
          <th>Grupo</th>
          <th>Posição</th>
          <th style="width:100px;text-align:right;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map((item) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="cell-thumb" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
                <div class="cell-info">
                  <b>${item.name}</b>
                  <small>${item.role || "Sem subtítulo"}${item.isCherrySpotlight ? " • Cherry em destaque" : ""}</small>
                </div>
              </div>
            </td>
            <td>${featuredSectionLabel(item.section)}</td>
            <td>${item.position || 0}</td>
            <td class="cell-actions" style="justify-content:flex-end;">
              <button type="button" data-edit-featured-card="${item.id}" title="Editar">✎</button>
              <button type="button" data-delete-featured-card="${item.id}" title="Remover">🗑</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhum card cadastrado.</p>';
}

function renderBookPages() {
  const list = $("[data-book-list]");
  if (!list) return;
  const sorted = adminFeaturedCards
    .filter((item) => item.section === "ambassadors" || item.section === "influencers")
    .sort((a, b) => String(a.section).localeCompare(String(b.section)) || Number(a.position || 0) - Number(b.position || 0));
  list.innerHTML = sorted.length ? `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Página</th>
          <th>Livro</th>
          <th>Desde</th>
          <th>Influência</th>
          <th style="width:100px;text-align:right;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map((item) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="cell-thumb" ${primaryImage(item) ? `style="background-image:url('${primaryImage(item)}')"` : ""}></div>
                <div class="cell-info">
                  <b>${item.name}</b>
                  <small>${item.role || "Sem cargo"}${item.isCherrySpotlight ? " • Cherry em destaque" : ""}${item.quote ? ` • ${String(item.quote).slice(0, 48)}` : ""}</small>
                </div>
              </div>
            </td>
            <td>${featuredSectionLabel(item.section)}</td>
            <td>${item.since || "2024"}</td>
            <td>${item.influence || (item.section === "influencers" ? "Digital" : "Roleplay")}</td>
            <td class="cell-actions" style="justify-content:flex-end;">
              <button type="button" data-edit-book-page="${item.id}" title="Editar">✎</button>
              <button type="button" data-delete-book-page="${item.id}" title="Remover">🗑</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhuma página cadastrada.</p>';
}

function renderTaxonomies() {
  Object.entries(adminTaxonomies).forEach(([key, values]) => {
    const list = $(`[data-taxonomy-list="${key}"]`);
    if (!list) return;
    if (!Array.isArray(values)) return;
    list.innerHTML = values.map((value) => `
      <span class="admin-tag">${value}<button type="button" data-remove-taxonomy="${key}" data-value="${value}">×</button></span>
    `).join("") || '<span style="font-size:12px;color:var(--admin-muted);">Nenhum item cadastrado.</span>';
  });
}

function renderFutureDropPreview() {
  const list = $("[data-future-drop-preview]");
  if (!list) return;
  const drop = { ...futureDropSeed, ...adminFutureDrop };
  const images = Array.isArray(drop.images) && drop.images.length ? drop.images : (drop.image ? [drop.image] : []);
  const image = images[0] || "";
  list.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center;">
      <div>
        <p style="font-size:12px;color:var(--admin-muted);margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">${drop.eyebrow || "Featured drop"}</p>
        <h3 style="margin:0 0 12px;font-size:22px;">${drop.title || "Blossom Future"}</h3>
        <p style="margin:0 0 16px;font-size:13px;color:var(--admin-muted);line-height:1.6;">${drop.description || ""}</p>
        <p style="margin:0;font-size:12px;"><strong>Botão:</strong> ${drop.button || ""} → ${drop.href || ""}</p>
      </div>
      <div style="border-radius:12px;overflow:hidden;border:1px solid var(--admin-line);min-height:180px;background:${image ? `url('${image}') center/cover` : 'linear-gradient(135deg,#f0e8e4,#e8ddd6)'};">
        ${!image ? '<div style="padding:20px;color:var(--admin-muted);font-size:12px;text-align:center;">Sem imagem</div>' : ''}
      </div>
    </div>
  `;
}

function renderSiteBannerForms() {
  $$("[data-site-banner-form]").forEach((form) => {
    const key = form.dataset.siteBannerForm;
    const banner = { ...(siteBannersSeed[key] || {}), ...(adminSiteBanners[key] || {}) };
    Object.entries(banner).forEach(([name, value]) => {
      const input = field(form, name);
      if (input && input.type !== "file") input.value = value || "";
    });
    form.dataset.currentImages = JSON.stringify(itemImages(banner));
    const note = $(`[data-site-banner-note="${key}"]`);
    if (note) note.textContent = itemImages(banner).length ? `${itemImages(banner).length} imagem atual. Envie outra para substituir.` : "Nenhuma imagem anexada.";
    setAdminImagePreview(field(form, "images"), itemImages(banner));
  });
}

function renderUsers() {
  const list = $("[data-users-list]");
  if (!list) return;
  list.innerHTML = adminUsers.length ? `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Cargo</th>
          <th style="width:140px;">Ação</th>
        </tr>
      </thead>
      <tbody>
        ${adminUsers.map((user) => `
          <tr>
            <td>
              <div class="cell-product">
                <div class="avatar" style="width:36px;height:36px;border-radius:50%;background:var(--admin-avatar);color:white;display:grid;place-items:center;font-size:14px;font-weight:800;flex-shrink:0;">${user.username.slice(0,1).toUpperCase()}</div>
                <div class="cell-info">
                  <b>${user.username}</b>
                  <small>${user.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "Conta registrada"}</small>
                </div>
              </div>
            </td>
            <td><span class="cell-status">${user.role || "cliente"}</span></td>
            <td>
              <select data-user-role="${user.username}" ${user.username === adminSession?.username ? "disabled" : ""} style="height:34px;padding:0 8px;border:1px solid var(--admin-line);border-radius:6px;background:var(--admin-bg);color:var(--admin-text);font:inherit;font-size:12px;">
                <option value="cliente" ${user.role !== "admin" ? "selected" : ""}>Cliente</option>
                <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
              </select>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  ` : '<p class="admin-empty">Nenhuma conta cadastrada.</p>';
}

/* Forms */
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
  setAdminImagePreview(field(form, "images"), itemImages(product));
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
  setAdminImagePreview(field(form, "images"), itemImages(collection));
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
  field(form, "href").value = card?.href || (card?.section === "influencers" ? "livro.html?aba=influencers" : "sobre.html#time");
  field(form, "visual").value = card?.visual || "pink";
  field(form, "position").value = card?.position ?? adminFeaturedCards.length;
  field(form, "isCherrySpotlight").checked = Boolean(card?.isCherrySpotlight);
  form.dataset.currentImages = JSON.stringify(itemImages(card));
  const count = itemImages(card).length;
  $("[data-featured-image-note]").textContent = count ? `${count} imagem atual. Envie outra para substituir.` : "Nenhuma imagem anexada.";
  setAdminImagePreview(field(form, "images"), itemImages(card));
  dialog.showModal();
}

function openBookForm(card = null) {
  const dialog = $("[data-book-dialog]");
  const form = $("[data-book-form]");
  if (!dialog || !form) return;
  form.reset();
  $("[data-book-form-title]").textContent = card ? "Editar página do livro" : "Nova página do livro";
  field(form, "id").value = card?.id || "";
  field(form, "section").value = card?.section || "ambassadors";
  field(form, "name").value = card?.name || "";
  field(form, "role").value = card?.role || "";
  field(form, "quote").value = card?.quote || "";
  field(form, "since").value = card?.since || "2024";
  field(form, "influence").value = card?.influence || (card?.section === "influencers" ? "Digital" : "Roleplay");
  field(form, "about").value = card?.about || "";
  field(form, "instagram").value = card?.instagram || "";
  field(form, "tiktok").value = card?.tiktok || "";
  field(form, "pinterest").value = card?.pinterest || "";
  field(form, "position").value = card?.position ?? adminFeaturedCards.length;
  field(form, "isCherrySpotlight").checked = Boolean(card?.isCherrySpotlight);
  form.dataset.currentImages = JSON.stringify(itemImages(card));
  const count = itemImages(card).length;
  $("[data-book-image-note]").textContent = count ? `${count} imagem atual. Envie outra para substituir.` : "Nenhuma imagem anexada.";
  setAdminImagePreview(field(form, "images"), itemImages(card));
  dialog.showModal();
}

function openFutureForm() {
  const dialog = $("[data-future-dialog]");
  const form = $("[data-future-form]");
  if (!dialog || !form) return;
  form.reset();
  const drop = { ...futureDropSeed, ...adminFutureDrop };
  field(form, "eyebrow").value = drop.eyebrow || "";
  field(form, "title").value = drop.title || "";
  field(form, "description").value = drop.description || "";
  field(form, "button").value = drop.button || "";
  field(form, "href").value = drop.href || "";
  field(form, "badge").value = drop.badge || "";
  field(form, "cardTitle").value = drop.cardTitle || "";
  form.dataset.currentImages = JSON.stringify(itemImages(drop));
  const count = itemImages(drop).length;
  $("[data-future-image-note]").textContent = count ? `${count} imagem atual. Envie outra para substituir.` : "Nenhuma imagem anexada.";
  setAdminImagePreview(field(form, "images"), itemImages(drop));
  dialog.showModal();
}

/* Event listeners */
$("[data-new-product]")?.addEventListener("click", () => openProductForm());
$("[data-new-collection]")?.addEventListener("click", () => openCollectionForm());
$("[data-new-featured-card]")?.addEventListener("click", () => openFeaturedForm());
$("[data-new-book-page]")?.addEventListener("click", () => openBookForm());
$("[data-edit-future-drop]")?.addEventListener("click", () => openFutureForm());
$("[data-refresh-users]")?.addEventListener("click", loadUsers);

$$("[data-site-banner-form] input[name='images']").forEach((input) => {
  input.addEventListener("change", (event) => {
    const form = event.target.closest("[data-site-banner-form]");
    const note = $(`[data-site-banner-note="${form.dataset.siteBannerForm}"]`);
    if (note) note.textContent = event.target.files.length ? `${event.target.files.length} imagem selecionada. Ela sera otimizada ao salvar.` : "Nenhuma imagem anexada.";
    previewSelectedImages(event.target);
  });
});

$("[data-about-settings-form] input[name='heroImages']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  const note = $("[data-about-hero-note]");
  if (note) note.textContent = count ? `${count} imagem selecionada. Ela sera otimizada ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(event.target);
});

$("[data-about-team-editor]")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-about-member-edit]");
  if (!button) return;
  const row = button.closest("[data-about-member-row]");
  const isEditing = row.classList.toggle("is-editing");
  button.setAttribute("aria-expanded", String(isEditing));
  button.textContent = isEditing ? "Fechar" : "Modificar";
});

$("[data-about-team-editor]")?.addEventListener("change", (event) => {
  const input = event.target.closest("input[type='file']");
  if (!input) return;
  const row = input.closest("[data-about-member-row]");
  const note = row ? $(`[data-about-member-note="${row.dataset.aboutMemberRow}"]`) : null;
  if (note) note.textContent = input.files.length ? `${input.files.length} imagem(ns) selecionada(s). Elas serao otimizadas ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(input);
});

$("[data-product-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-product-image-note]").textContent = count ? `${count} imagem(ns) selecionada(s). Elas serão otimizadas ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(event.target);
});

$("[data-collection-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-collection-image-note]").textContent = count ? `${count} imagem(ns) selecionada(s). Elas serão otimizadas ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(event.target);
});

$("[data-featured-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-featured-image-note]").textContent = count ? `${count} imagem selecionada. Ela será otimizada ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(event.target);
});

$("[data-book-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-book-image-note]").textContent = count ? `${count} imagem selecionada. Ela será otimizada ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(event.target);
});

$("[data-future-form] input[name='images']")?.addEventListener("change", (event) => {
  const count = event.target.files.length;
  $("[data-future-image-note]").textContent = count ? `${count} imagem selecionada. Ela sera otimizada ao salvar.` : "Nenhuma imagem anexada.";
  previewSelectedImages(event.target);
});

document.addEventListener("click", (event) => {
  const editProduct = event.target.closest("[data-edit-product]");
  const deleteProduct = event.target.closest("[data-delete-product]");
  const editCollection = event.target.closest("[data-edit-collection]");
  const deleteCollection = event.target.closest("[data-delete-collection]");
  const editFeaturedCard = event.target.closest("[data-edit-featured-card]");
  const deleteFeaturedCard = event.target.closest("[data-delete-featured-card]");
  const editBookPage = event.target.closest("[data-edit-book-page]");
  const deleteBookPage = event.target.closest("[data-delete-book-page]");
  const closeDialog = event.target.closest("[data-close-dialog]");

  if (editProduct) openProductForm(adminProducts.find((item) => item.id === editProduct.dataset.editProduct));
  if (editCollection) openCollectionForm(adminCollections.find((item) => item.id === editCollection.dataset.editCollection));
  if (editFeaturedCard) openFeaturedForm(adminFeaturedCards.find((item) => item.id === editFeaturedCard.dataset.editFeaturedCard));
  if (editBookPage) openBookForm(adminFeaturedCards.find((item) => item.id === editBookPage.dataset.editBookPage));

  if (deleteProduct) {
    adminProducts = adminProducts.filter((item) => item.id !== deleteProduct.dataset.deleteProduct);
    saveProducts().catch((error) => console.warn(error));
    renderAll();
    toast("Produto removido.");
  }
  if (deleteCollection) {
    adminCollections = adminCollections.filter((item) => item.id !== deleteCollection.dataset.deleteCollection);
    saveCollections().catch((error) => console.warn(error));
    renderAll();
    toast("Coleção removida.");
  }
  if (deleteFeaturedCard) {
    adminFeaturedCards = adminFeaturedCards.filter((item) => item.id !== deleteFeaturedCard.dataset.deleteFeaturedCard);
    saveFeaturedCards().catch((error) => console.warn(error));
    renderAll();
    toast("Card removido.");
  }
  if (deleteBookPage) {
    adminFeaturedCards = adminFeaturedCards.filter((item) => item.id !== deleteBookPage.dataset.deleteBookPage);
    saveFeaturedCards().catch((error) => console.warn(error));
    renderAll();
    toast("Página removida.");
  }

  const removeTaxonomy = event.target.closest("[data-remove-taxonomy]");
  if (removeTaxonomy) {
    const key = removeTaxonomy.dataset.removeTaxonomy;
    const value = removeTaxonomy.dataset.value;
    adminTaxonomies[key] = adminTaxonomies[key].filter((item) => item !== value);
    saveTaxonomies().catch((error) => console.warn(error));
    renderAll();
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
    toast("Cargo atualizado.");
    await loadUsers();
  } catch (error) {
    roleSelect.value = previous;
    toast(error.message);
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
    id, name: data.get("name"), category: data.get("category"), type: data.get("type"), color: data.get("color"),
    collection: data.get("collection"), visibility: data.get("visibility"),
    price: data.get("visibility") === "collection-only" ? 0 : Number(data.get("price")),
    visual: data.get("visual"), image: images[0] || "", images, isNew: data.has("isNew"),
    created: adminProducts.find((item) => item.id === id)?.created ?? Date.now(),
  };
  adminProducts = adminProducts.some((item) => item.id === id) ? adminProducts.map((item) => item.id === id ? product : item) : [product, ...adminProducts];
  try {
    await saveProducts();
    form.closest("dialog").close();
    renderAll();
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
    id, name: data.get("name"), label: data.get("label"), description: data.get("description"),
    pieces: adminProducts.filter((product) => product.collection === id).length,
    price: Number(data.get("price")), visual: data.get("visual"), badge: data.get("badge"),
    image: images[0] || "", images, created: adminCollections.find((item) => item.id === id)?.created ?? Date.now(),
  };
  adminCollections = adminCollections.some((item) => item.id === id) ? adminCollections.map((item) => item.id === id ? collection : item) : [collection, ...adminCollections];
  try {
    await saveCollections();
    form.closest("dialog").close();
    renderAll();
    toast("Coleção salva.");
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
  const previousCard = adminFeaturedCards.find((item) => item.id === id) || {};
  const section = data.get("section");
  const card = {
    ...previousCard,
    id, section, name: data.get("name"),
    role: data.get("role") || (section === "influencers" ? "Creator" : "Cherry"),
    href: data.get("href") || (section === "influencers" ? "livro.html?aba=influencers" : section === "cherrys" ? "livro.html" : "sobre.html#time"),
    visual: data.get("visual"), position: Number(data.get("position") || 0),
    isCherrySpotlight: data.has("isCherrySpotlight") && canBeCherrySpotlight(section),
    image: images[0] || "", images, created: previousCard.created ?? Date.now(),
  };
  adminFeaturedCards = adminFeaturedCards.some((item) => item.id === id) ? adminFeaturedCards.map((item) => item.id === id ? card : item) : [card, ...adminFeaturedCards];
  if (card.isCherrySpotlight) enforceSingleCherrySpotlight(card.id);
  try {
    await saveFeaturedCards();
    form.closest("dialog").close();
    renderAll();
    toast("Card salvo.");
  } catch (error) {
    console.error(error);
    $("[data-featured-image-note]").textContent = `Erro ao salvar: ${errorText(error)}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$("[data-book-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  const section = data.get("section") || "ambassadors";
  const id = data.get("id") || `${section}-${slugify(data.get("name"))}`;
  let images = JSON.parse(form.dataset.currentImages || "[]");
  try {
    const uploadedImages = await filesToDataUrls(field(form, "images").files);
    images = uploadedImages.length ? uploadedImages : images;
  } catch (error) {
    $("[data-book-image-note]").textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }
  const previousCard = adminFeaturedCards.find((item) => item.id === id) || {};
  const card = {
    ...previousCard,
    id,
    section,
    name: data.get("name"),
    role: data.get("role") || (section === "influencers" ? "Creator" : "Cherry"),
    quote: data.get("quote"),
    since: data.get("since"),
    influence: data.get("influence"),
    about: data.get("about"),
    instagram: data.get("instagram"),
    tiktok: data.get("tiktok"),
    pinterest: data.get("pinterest"),
    href: previousCard.href || `livro.html?aba=${section}`,
    visual: previousCard.visual || (section === "influencers" ? "soft" : "pink"),
    position: Number(data.get("position") || 0),
    isCherrySpotlight: data.has("isCherrySpotlight") && canBeCherrySpotlight(section),
    image: images[0] || "",
    images,
    created: previousCard.created ?? Date.now(),
  };
  adminFeaturedCards = adminFeaturedCards.some((item) => item.id === id) ? adminFeaturedCards.map((item) => item.id === id ? card : item) : [card, ...adminFeaturedCards];
  if (card.isCherrySpotlight) enforceSingleCherrySpotlight(card.id);
  try {
    await saveFeaturedCards();
    form.closest("dialog").close();
    renderAll();
    toast("Página salva.");
  } catch (error) {
    console.error(error);
    $("[data-book-image-note]").textContent = `Erro ao salvar: ${errorText(error)}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$("[data-book-settings-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  adminBookSettings = {
    titleLine1: field(form, "titleLine1").value.trim(),
    titleLine2: field(form, "titleLine2").value.trim(),
    overviewKicker: field(form, "overviewKicker").value.trim(),
    overviewHeading: field(form, "overviewHeading").value.trim(),
    ambassadorsIntro: field(form, "ambassadorsIntro").value.trim(),
    influencersIntro: field(form, "influencersIntro").value.trim(),
    imageLabel: field(form, "imageLabel").value.trim(),
  };
  try {
    await saveBookSettings();
    toast("Configuracoes do livro salvas.");
  } catch (error) {
    toast(`Erro ao salvar: ${errorText(error)}`);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$("[data-future-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  let images = JSON.parse(form.dataset.currentImages || "[]");
  try {
    const uploadedImages = await filesToDataUrls(field(form, "images").files);
    images = uploadedImages.length ? uploadedImages : images;
  } catch (error) {
    $("[data-future-image-note]").textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }
  adminFutureDrop = {
    eyebrow: data.get("eyebrow"), title: data.get("title"), description: data.get("description"),
    button: data.get("button"), href: data.get("href"), badge: data.get("badge"), cardTitle: data.get("cardTitle"),
    image: images[0] || "", images,
  };
  try {
    await saveFutureDrop();
    form.closest("dialog").close();
    renderAll();
    toast("Drop futuro salvo.");
  } catch (error) {
    console.error(error);
    $("[data-future-image-note]").textContent = `Erro ao salvar: ${errorText(error)}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

$$("[data-site-banner-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const key = form.dataset.siteBannerForm;
    const data = new FormData(form);
    const submitButton = form.querySelector("[type='submit']");
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Salvando...";
    let images = JSON.parse(form.dataset.currentImages || "[]");
    try {
      const uploadedImages = await filesToDataUrls(field(form, "images").files);
      images = uploadedImages.length ? uploadedImages : images;
    } catch (error) {
      const note = $(`[data-site-banner-note="${key}"]`);
      if (note) note.textContent = error.message;
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      return;
    }
    const current = { ...(siteBannersSeed[key] || {}), ...(adminSiteBanners[key] || {}) };
    const next = { ...current, image: images[0] || "", images };
    for (const [name, value] of data.entries()) {
      if (name !== "images") next[name] = value;
    }
    adminSiteBanners = { ...adminSiteBanners, [key]: next };
    try {
      await saveSiteBanners();
      renderAll();
      toast("Banner salvo.");
    } catch (error) {
      const note = $(`[data-site-banner-note="${key}"]`);
      if (note) note.textContent = `Erro ao salvar: ${errorText(error)}`;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
});

$("[data-about-settings-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  let heroImages = JSON.parse(form.dataset.currentHeroImages || "[]");
  try {
    const uploadedHero = await filesToDataUrls(field(form, "heroImages").files);
    heroImages = uploadedHero.length ? uploadedHero : heroImages;
  } catch (error) {
    const note = $("[data-about-hero-note]");
    if (note) note.textContent = error.message;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  const checkedFounder = adminAboutSettings.members.findIndex((_, index) => Boolean(field(form, `memberFounder${index}`)?.checked));
  const founderIndex = checkedFounder >= 0 ? checkedFounder : 0;
  const members = [];
  try {
    for (const [index, previous] of adminAboutSettings.members.entries()) {
      const row = form.querySelector(`[data-about-member-row="${index}"]`);
      const fileInput = field(form, `memberImage${index}`);
      let images = JSON.parse(row?.dataset.currentImages || "[]");
      const uploadedImages = await filesToDataUrls(fileInput?.files || []);
      images = uploadedImages.length ? uploadedImages : images;
      members.push({
        ...previous,
        name: data.get(`memberName${index}`),
        role: data.get(`memberRole${index}`),
        instagram: data.get(`memberInstagram${index}`),
        bio: data.get(`memberBio${index}`),
        isFounder: index === founderIndex,
        image: images[0] || "",
        images,
      });
    }
  } catch (error) {
    toast(error.message);
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  adminAboutSettings = normalizeAboutSettings({
    heroKicker: data.get("heroKicker"),
    heroTitle: data.get("heroTitle"),
    heroDescription: data.get("heroDescription"),
    heroImage: heroImages[0] || "",
    heroImages,
    teamKicker: data.get("teamKicker"),
    newsletterText: data.get("newsletterText"),
    members,
  });
  try {
    await saveAboutSettings();
    renderAll();
    toast("Pagina Sobre nos salva.");
  } catch (error) {
    toast(errorText(error));
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
  adminFutureDrop = futureDropSeed;
  adminSiteBanners = siteBannersSeed;
  adminBookSettings = bookSettingsSeed;
  adminAboutSettings = aboutSettingsSeed;
  saveProducts().catch((error) => console.warn(error));
  saveCollections().catch((error) => console.warn(error));
  saveFeaturedCards().catch((error) => console.warn(error));
  renderAll();
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
    renderAll();
    toast("Opção adicionada.");
  });
});

$("[data-logout]")?.addEventListener("click", () => {
  localStorage.removeItem("blossom-user-account");
  localStorage.removeItem("blossom-admin-session");
  window.location.href = "login.html";
});

/* Init */
renderAll();
loadApiStore();
loadUsers();
