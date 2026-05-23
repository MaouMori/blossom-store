const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!location.hash) window.scrollTo(0, 0);
window.addEventListener("pageshow", () => { if (!location.hash) window.scrollTo(0, 0); });

function normalizeNavLinks() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav, .mobile-nav, .editorial-nav").forEach((nav) => {
    const hasBook = Array.from(nav.querySelectorAll("a")).some((link) => (link.getAttribute("href") || "").startsWith("livro.html"));
    if (!hasBook) {
      const bookLink = document.createElement("a");
      bookLink.href = "livro.html";
      bookLink.textContent = "Livro";
      const before = Array.from(nav.querySelectorAll("a")).find((link) => /sobre/i.test(link.textContent));
      nav.insertBefore(bookLink, before || null);
    }
    nav.querySelectorAll("a").forEach((link) => {
      const rawHref = link.getAttribute("href") || "";
      const href = rawHref.startsWith("#") ? "" : (rawHref.split("#")[0] || "index.html");
      link.classList.toggle("active", href === current);
    });
  });
}

function initStickyHeader() {
  normalizeNavLinks();
  const header = document.querySelector(".site-header, .editorial-header");
  if (!header) return;
  const update = () => {
    document.body.classList.toggle("nav-scrolled", window.scrollY > 42);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector("[data-mobile-menu-toggle]");
  const overlay = document.querySelector("[data-mobile-nav-overlay]");
  const nav = document.querySelector("[data-mobile-nav]");
  const close = document.querySelector("[data-mobile-nav-close]");
  if (!toggle || !overlay || !nav) return;
  function open() { overlay.classList.add("active"); nav.classList.add("active"); document.body.style.overflow = "hidden"; }
  function closeMenu() { overlay.classList.remove("active"); nav.classList.remove("active"); document.body.style.overflow = ""; }
  toggle.addEventListener("click", open);
  overlay.addEventListener("click", closeMenu);
  if (close) close.addEventListener("click", closeMenu);
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

document.addEventListener("DOMContentLoaded", initStickyHeader);
document.addEventListener("DOMContentLoaded", initMobileMenu);

function initLazyImages() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const src = el.dataset.src;
          if (src) {
            if (el.tagName === "IMG") { el.src = src; } else { el.style.backgroundImage = `url('${src}')`; }
            el.removeAttribute("data-src");
            observer.unobserve(el);
          }
        }
      });
    }, { rootMargin: "200px 0px" });
    window._lazyObserver = observer;
    document.querySelectorAll("[data-src]").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll("[data-src]").forEach((el) => {
      const src = el.dataset.src;
      if (src) { if (el.tagName === "IMG") { el.src = src; } else { el.style.backgroundImage = `url('${src}')`; } el.removeAttribute("data-src"); }
    });
  }
}

function refreshLazyImages() {
  if (window._lazyObserver) { document.querySelectorAll("[data-src]").forEach((el) => window._lazyObserver.observe(el)); }
}

function initHomeCarousels() {
  const pairs = [
    [document.querySelector("[data-home-collections]"), document.querySelector("[data-collection-prev]"), document.querySelector("[data-collection-next]")],
    [document.querySelector("[data-lookbook-track]"), document.querySelector("[data-lookbook-prev]"), document.querySelector("[data-lookbook-next]")],
  ];
  pairs.forEach(([track, prev, next]) => {
    if (!track || track.dataset.carouselReady) return;
    track.dataset.carouselReady = "true";
    const move = (direction = 1) => {
      const card = track.querySelector("article");
      if (!card) return;
      const step = card.getBoundingClientRect().width + 18;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (direction > 0 && end) { track.scrollTo({ left: 0, behavior: "smooth" }); return; }
      track.scrollBy({ left: step * direction, behavior: "smooth" });
    };
    prev?.addEventListener("click", () => move(-1));
    next?.addEventListener("click", () => move(1));
    window.setInterval(() => move(1), 3600);
  });
}

function initThemeToggle() {
  ensureGlobalThemeControl();
  const buttons = document.querySelectorAll("[data-theme-toggle]");
  const saved = localStorage.getItem("blossom-site-theme") || localStorage.getItem("blossom-home-theme") || "dark";
  function setTheme(theme) {
    const light = theme === "light";
    document.documentElement.classList.toggle("site-light", light);
    document.documentElement.dataset.siteTheme = light ? "light" : "dark";
    document.body.classList.toggle("editorial-light", light);
    document.body.classList.toggle("home-light", light);
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(light)));
    localStorage.setItem("blossom-site-theme", light ? "light" : "dark");
  }
  setTheme(saved);
  buttons.forEach((button) => button.addEventListener("click", () => { setTheme(document.body.classList.contains("home-light") ? "dark" : "light"); }));
}

function ensureGlobalThemeControl() {
  if (document.querySelector("[data-theme-toggle]")) return;
  const account = document.querySelector(".site-header .account");
  if (!account) return;
  const control = document.createElement("div");
  control.className = "site-theme-control";
  control.innerHTML = `<span>Claro</span><button class="theme-pill" type="button" aria-label="Alternar tema" data-theme-toggle><i></i></button><span>Escuro</span>`;
  account.prepend(control);
}

function initHomeMotion() {
  if (!document.body.classList.contains("home-editorial")) return;
  const root = document.documentElement;
  let ticking = false;
  const updateScrollMotion = () => {
    const progress = Math.min(window.scrollY / 460, 1);
    root.style.setProperty("--home-scroll", progress.toFixed(3));
    document.body.classList.toggle("home-scrolled", progress > 0.14);
    ticking = false;
  };
  const requestScrollMotion = () => { if (ticking) return; ticking = true; window.requestAnimationFrame(updateScrollMotion); };
  updateScrollMotion();
  window.addEventListener("scroll", requestScrollMotion, { passive: true });
  const revealItems = document.querySelectorAll(".future-drop, .editorial-strip, .movement-banner, .editorial-footer");
  revealItems.forEach((item) => item.classList.add("home-reveal"));
  if (!("IntersectionObserver" in window)) { revealItems.forEach((item) => item.classList.add("is-visible")); return; }
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } });
  }, { threshold: 0.18 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

document.addEventListener("DOMContentLoaded", initLazyImages);
document.addEventListener("DOMContentLoaded", initThemeToggle);
document.addEventListener("DOMContentLoaded", initHomeMotion);

const defaultProductRows = [
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
];

const defaultProducts = defaultProductRows.map(([id, name, category, type, color, price, visual, isNew], index) => ({
  id, name, category, type, color, price, visual, isNew, created: index,
}));

const defaultCollections = [
  { id: "spring-25", name: "Blossom Spring '25", label: "Coleção Primavera 2025", description: "Peças leves e estilosas para dominar as ruas.", pieces: 12, price: 299.9, visual: "spring", badge: "Nova" },
  { id: "essentials", name: "Blossom Essentials", label: "Coleção Essentials", description: "Peças básicas com o padrão de qualidade Blossom.", pieces: 18, price: 349.9, visual: "essentials", badge: "" },
  { id: "nightfall", name: "Blossom Nightfall", label: "Coleção Nightfall", description: "Cores escuras. Estilo pesado. Presença marcante.", pieces: 10, price: 399.9, visual: "nightfall", badge: "" },
  { id: "luxury", name: "Blossom Luxury", label: "Coleção Luxury", description: "Detalhes premium para quem vive o topo do roleplay.", pieces: 8, price: 499.9, visual: "luxury", badge: "" },
  { id: "sport", name: "Blossom Sport", label: "Coleção Sport", description: "Performance, conforto e estilo para qualquer missão.", pieces: 11, price: 329.9, visual: "sport", badge: "" },
  { id: "oversized", name: "Blossom Oversized", label: "Coleção Oversized", description: "Modelagens amplas para um visual urbano e autêntico.", pieces: 14, price: 369.9, visual: "oversized", badge: "" },
  { id: "pink-label", name: "Blossom Pink Label", label: "Coleção Pink Label", description: "A identidade rosa da Blossom. Única, forte e feminina.", pieces: 9, price: 289.9, visual: "pink-label", badge: "" },
  { id: "collabs", name: "Blossom Collabs", label: "Coleção Collabs", description: "Parcerias especiais que viram história.", pieces: 7, price: 449.9, visual: "collabs", badge: "" },
];

const defaultTaxonomies = {
  categories: ["Masculino", "Feminino", "Acessórios", "Drops Exclusivos", "Conjuntos"],
  types: ["Camisetas", "Moletons", "Jaquetas", "Calças", "Shorts", "Bonés", "Outros", "Conjuntos"],
  colors: ["Preto", "Branco", "Rosa", "Cinza", "Bege", "Azul"],
  visuals: ["hoodie-dark", "tee-white", "jersey", "zip", "cargo", "cap-pink", "spring", "essentials"],
};

function readStore(key, fallback) {
  try { const saved = JSON.parse(localStorage.getItem(key)); return Array.isArray(saved) ? saved : fallback; } catch { return fallback; }
}

function readObjectStore(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved && typeof saved === "object" && !Array.isArray(saved) ? { ...fallback, ...saved } : fallback;
  } catch {
    return fallback;
  }
}

function isPlainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const apiEnabled = location.protocol.startsWith("http");
const legacyDemoAccountName = ["vinicius", "silv-33afab"].join("_");

const defaultFeaturedCards = [
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
  id: `${section}-${index}`, section, name, role, visual, href, image: "", images: [], position: index, created: index,
}));

const defaultFutureDrop = {
  eyebrow: "Featured drop", title: "Blossom Future",
  description: "Uma nova colecao esta sendo preparada para trazer uma identidade mais intensa, exclusiva e feita para quem quer se destacar no roleplay.",
  button: "Lancamento em breve", href: "colecoes.html", badge: "Soon", cardTitle: "Blossom", image: "", images: [],
};

const defaultSiteBanners = {
  homeHero: {
    title: "Blossom✿",
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

const defaultAboutSettings = {
  heroKicker: "Sobre nos",
  heroTitle: "Nosso time",
  heroDescription: "Por tras da Blossom existe um time apaixonado por moda, criatividade e autenticidade. Cada pessoa aqui carrega o proposito de criar mais que roupas: criamos um movimento.",
  heroImage: "",
  heroImages: [],
  teamKicker: "Nossa equipe",
  newsletterText: "Receba novidades e lancamentos exclusivos.",
  members: [
    { id: "madison", name: "Madison Montgomery", role: "Founder & CEO", instagram: "Instagram", isFounder: true, visual: "team-one", image: "", images: [] },
    { id: "malik", name: "Malik Montgomery", role: "Co-founder", instagram: "Instagram", isFounder: false, visual: "team-two", image: "", images: [] },
    { id: "aika", name: "Aika Prinxx", role: "Design Director", instagram: "Instagram", isFounder: false, visual: "team-three", image: "", images: [] },
    { id: "diana", name: "Diana Hyperion", role: "Community Manager", instagram: "Instagram", isFounder: false, visual: "team-four", image: "", images: [] },
    { id: "paty", name: "Paty Montgomery", role: "Content Creator", instagram: "Instagram", isFounder: false, visual: "team-five", image: "", images: [] },
    { id: "felipe", name: "Felipe Gilmore", role: "Creative Director", instagram: "Instagram", isFounder: false, visual: "team-six", image: "", images: [] },
  ],
};

function normalizeAboutSettings(settings = {}) {
  const source = isPlainObject(settings) ? settings : {};
  const members = Array.isArray(source.members) && source.members.length ? source.members : defaultAboutSettings.members;
  const founderIndex = Math.max(0, members.findIndex((member) => member?.isFounder));
  return {
    ...defaultAboutSettings,
    ...source,
    members: members.map((member, index) => ({
      ...defaultAboutSettings.members[index % defaultAboutSettings.members.length],
      ...member,
      id: member?.id || `member-${index}`,
      isFounder: index === founderIndex,
      images: Array.isArray(member?.images) ? member.images : [],
      image: member?.image || "",
    })),
  };
}

function recentValue(item) { return Number(item.createdAt || item.created || 0); }
function recentItems(items, limit) { return [...items].sort((a, b) => recentValue(b) - recentValue(a)).slice(0, limit); }

function ownItemImages(item) {
  if (Array.isArray(item?.images) && item.images.length) return item.images;
  if (item?.image) return [item.image];
  return [];
}

function itemImages(item) {
  if (!item) return [];
  const isCollection = item.kind === "collection" || collections.some((collection) => collection.id === item.id);
  if (isCollection) {
    const ownImages = ownItemImages(item);
    if (ownImages.length) return ownImages;
    return collectionProducts(item.collectionId || item.id).flatMap((product) => ownItemImages(product));
  }
  return ownItemImages(item);
}

function primaryImage(item) { return itemImages(item)[0] || ""; }

let products = apiEnabled ? [] : readStore("blossom-products", []);
let collections = apiEnabled ? [] : readStore("blossom-collections", []);
let featuredCards = apiEnabled ? defaultFeaturedCards : readStore("blossom-featured-cards", defaultFeaturedCards);
let futureDrop = apiEnabled ? defaultFutureDrop : readStore("blossom-future-drop", defaultFutureDrop);
let siteBanners = apiEnabled ? defaultSiteBanners : (() => {
  try { return { ...defaultSiteBanners, ...JSON.parse(localStorage.getItem("blossom-site-banners") || "{}") }; } catch { return defaultSiteBanners; }
})();
let aboutSettings = apiEnabled ? defaultAboutSettings : normalizeAboutSettings(readObjectStore("blossom-about-settings", defaultAboutSettings));
let taxonomies = (() => {
  if (apiEnabled) return { categories: [], types: [], colors: [], visuals: [] };
  try { const saved = JSON.parse(localStorage.getItem("blossom-taxonomies")); return saved && typeof saved === "object" ? { ...defaultTaxonomies, ...saved } : defaultTaxonomies; } catch { return defaultTaxonomies; }
})();

const selectors = {
  cartOpen: document.querySelector("[data-cart-open]"),
  cartClose: document.querySelector("[data-cart-close]"),
  cartDrawer: document.querySelector("[data-cart-drawer]"),
  overlay: document.querySelector("[data-overlay]"),
  cartItems: document.querySelector("[data-cart-items]"),
  cartCount: document.querySelector("[data-cart-count]"),
  headerCartTotal: document.querySelector("[data-header-cart-total]"),
  accountName: document.querySelector("[data-account-name]"),
  accountToggle: document.querySelector("[data-account-toggle]"),
  accountMenu: document.querySelector("[data-account-menu]"),
  accountLogout: document.querySelector("[data-account-logout]"),
  accountConfig: document.querySelector("[data-account-config]"),
  accountAdminLinks: document.querySelectorAll('.account-menu a[href="login.html"], .admin-shortcut'),
  subtotal: document.querySelector("[data-subtotal]"),
  total: document.querySelector("[data-total]"),
  checkoutOpen: document.querySelector("[data-checkout-open]"),
  checkoutClose: document.querySelector("[data-checkout-close]"),
  checkoutModal: document.querySelector("[data-checkout-modal]"),
  checkoutItems: document.querySelector("[data-checkout-items]"),
  checkoutTotal: document.querySelector("[data-checkout-total]"),
  checkoutForm: document.querySelector("[data-checkout-form]"),
  paymentPreview: document.querySelector("[data-payment-preview]"),
  paymentInputs: document.querySelectorAll('input[name="payment"]'),
  shopGrid: document.querySelector("[data-shop-grid]"),
  resultCount: document.querySelector("[data-result-count]"),
  pagination: document.querySelector("[data-pagination]"),
  search: document.querySelector("[data-search]"),
  sort: document.querySelector("[data-sort]"),
  categoryList: document.querySelector("[data-category-list]"),
  typeList: document.querySelector("[data-type-list]"),
  colorList: document.querySelector("[data-color-list]"),
  priceRange: document.querySelector("[data-price-range]"),
  priceLabel: document.querySelector("[data-price-label]"),
  clearFilters: document.querySelector("[data-clear-filters]"),
  collectionsGrid: document.querySelector("[data-collections-grid]"),
  collectionTabs: document.querySelector("[data-collection-tabs]"),
  collectionCategory: document.querySelector("[data-collection-category]"),
  collectionType: document.querySelector("[data-collection-type]"),
  collectionColor: document.querySelector("[data-collection-color]"),
  collectionSort: document.querySelector("[data-collection-sort]"),
  collectionDetail: document.querySelector("[data-collection-detail]"),
  collectionProducts: document.querySelector("[data-collection-products]"),
  collectionGallery: document.querySelector("[data-collection-gallery]"),
  collectionAbout: document.querySelector("[data-collection-about]"),
  collectionCta: document.querySelector("[data-collection-cta]"),
  homeProducts: document.querySelector("[data-home-products]"),
  homeCollections: document.querySelector("[data-home-collections]"),
  futureDrop: document.querySelector("[data-future-drop]"),
  homeHero: document.querySelector("[data-home-hero]") || document.querySelector(".editorial-hero"),
  collectionsHero: document.querySelector("[data-collections-hero]"),
  ambassadorShowcase: document.querySelector("[data-ambassador-showcase]"),
  cherryShowcase: document.querySelector("[data-cherry-showcase]"),
  cherryFeature: document.querySelector("[data-cherry-feature]"),
  cherryGrid: document.querySelector("[data-cherry-grid]"),
  cherryToggle: document.querySelector("[data-cherry-toggle]"),
  spotlightTracks: document.querySelectorAll("[data-spotlight-track]"),
  lookbookTrack: document.querySelector("[data-lookbook-track]"),
  cartSummary: document.querySelector(".cart-summary"),
};

const state = {
  category: "Todas as peças", types: new Set(), colors: new Set(), search: "", sort: "recent", maxPrice: 9999, page: 1, perPage: 16,
  collectionCategory: "Todas", collectionType: "Todos", collectionColor: "Todas", collectionSort: "recent",
};

let account = loadAccount();

async function loadApiStore() {
  if (!apiEnabled) return;
  try {
    const response = await fetch("/api/store");
    if (!response.ok) return;
    const store = await response.json();
    products = Array.isArray(store.products) ? store.products : [];
    collections = Array.isArray(store.collections) ? store.collections : [];
    taxonomies = store.taxonomies && Object.keys(store.taxonomies).length ? store.taxonomies : { categories: [], types: [], colors: [], visuals: [] };
    featuredCards = Array.isArray(taxonomies.featuredCards) && taxonomies.featuredCards.length ? taxonomies.featuredCards : defaultFeaturedCards;
    futureDrop = isPlainObject(taxonomies.futureDrop) ? { ...defaultFutureDrop, ...taxonomies.futureDrop } : readObjectStore("blossom-future-drop", defaultFutureDrop);
    siteBanners = isPlainObject(taxonomies.siteBanners) ? { ...defaultSiteBanners, ...taxonomies.siteBanners } : readObjectStore("blossom-site-banners", defaultSiteBanners);
    aboutSettings = isPlainObject(taxonomies.aboutSettings) ? normalizeAboutSettings(taxonomies.aboutSettings) : normalizeAboutSettings(readObjectStore("blossom-about-settings", defaultAboutSettings));
    if (hasShop) { renderFilters(); renderCatalog(); }
    renderHomeSections();
    renderAboutPage();
    renderCollections();
    renderCollectionDetail();
  } catch {
    products = []; collections = []; featuredCards = defaultFeaturedCards; futureDrop = defaultFutureDrop; siteBanners = defaultSiteBanners; aboutSettings = defaultAboutSettings;
    renderHomeSections(); renderAboutPage(); renderCollections(); renderCollectionDetail();
  }
}

const hasShop = Boolean(selectors.shopGrid);
const hasCollections = Boolean(selectors.collectionsGrid);
const hasCollectionDetail = Boolean(selectors.collectionDetail);
const hasHomeProducts = Boolean(selectors.homeProducts);
const hasHomeCollections = Boolean(selectors.homeCollections);

function countBy(key) {
  return products.filter((product) => product.visibility !== "collection-only").reduce((acc, product) => {
    acc[product[key]] = (acc[product[key]] || 0) + 1; return acc;
  }, {});
}

function renderFilters() {
  const saleProducts = products.filter((product) => product.visibility !== "collection-only");
  const categories = { "Todas as peças": saleProducts.length, ...countBy("category") };
  selectors.categoryList.innerHTML = Object.entries(categories).map(([category, count]) => `
    <button class="${state.category === category ? "active" : ""}" type="button" data-category="${category}">
      <span>${category}</span><b>${count}</b>
    </button>
  `).join("");
  const typeCounts = countBy("type");
  selectors.typeList.innerHTML = taxonomies.types.map((type) => `
    <label>
      <input type="checkbox" value="${type}" data-type ${state.types.has(type) ? "checked" : ""}>
      <span>${type}</span><b>${typeCounts[type] || 0}</b>
    </label>
  `).join("");
  const swatches = { Preto: "#050608", Branco: "#f2f0eb", Rosa: "#ff9cbc", Cinza: "#aeb3b8", Bege: "#d9c6a5", Azul: "#2f8cff" };
  const colorCounts = countBy("color");
  selectors.colorList.innerHTML = taxonomies.colors.map((color) => `
    <label>
      <input type="checkbox" value="${color}" data-color ${state.colors.has(color) ? "checked" : ""}>
      <i style="--swatch:${swatches[color] || "#fff"}"></i>
      <span>${color}</span><b>${colorCounts[color] || 0}</b>
    </label>
  `).join("");
}

function getFilteredProducts() {
  let filtered = products.filter((product) => {
    if (product.visibility === "collection-only") return false;
    const matchesCategory = state.category === "Todas as peças" || product.category === state.category;
    const matchesType = state.types.size === 0 || state.types.has(product.type);
    const matchesColor = state.colors.size === 0 || state.colors.has(product.color);
    const matchesPrice = product.price <= state.maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(state.search.toLowerCase());
    return matchesCategory && matchesType && matchesColor && matchesPrice && matchesSearch;
  });
  filtered = [...filtered].sort((a, b) => {
    if (state.sort === "price-asc") return a.price - b.price;
    if (state.sort === "price-desc") return b.price - a.price;
    if (state.sort === "name") return a.name.localeCompare(b.name);
    return recentValue(b) - recentValue(a);
  });
  return filtered;
}

function productCard(product, compact = false) {
  const visual = product.visual || "hoodie-dark";
  const image = primaryImage(product);
  const imageStyle = image ? `data-src="${image}"` : "";
  const label = String(product.type || product.category || "Peça").replace("Moletons", "Moleton").replace("Camisetas", "Camiseta").replace("Calças", "Calça");
  return `
    <article class="product-card ${compact ? "" : "shop-product"}" data-product-id="${product.id}">
      <div class="template-visual product-media ${visual} ${image ? "has-upload" : ""}" ${imageStyle}>
        ${product.isNew ? "<span>Novo</span>" : ""}
      </div>
      <div class="product-copy">
        <h3>${product.name}</h3>
        <p>${label}</p>
        <strong>${money.format(Number(product.price || 0))}</strong>
        <a class="add-button" href="https://www.patreon.com" target="_blank" rel="noreferrer">Adquirir</a>
      </div>
    </article>
  `;
}

function collectionCard(collection) {
  const image = primaryImage(collection);
  const imageStyle = image ? `data-src="${image}"` : "";
  return `
    <article class="collection-card">
      <div class="template-visual collection-media ${collection.visual || "essentials"} ${image ? "has-upload" : ""}" ${imageStyle}>
        ${collection.badge ? `<span>${collection.badge}</span>` : ""}
      </div>
      <div class="collection-copy">
        <h3>${collection.name}</h3>
        <a href="colecao.html?id=${collection.id}">Ver peças</a>
      </div>
    </article>
  `;
}

function homeCollectionCard(collection) {
  const image = primaryImage(collection);
  const imageStyle = image ? `data-src="${image}"` : "";
  const shortName = String(collection.name || "Blossom Collection").replace(/^Blossom\s+/i, "");
  return `
    <a class="editorial-collection-card ${image ? "has-upload" : ""}" href="colecao.html?id=${collection.id}" ${imageStyle}>
      <div>
        <h3>${shortName}</h3>
        <span>↗</span>
      </div>
      <div>
        <span>${image ? "" : "Imagem da coleção"}</span>
      </div>
    </a>
  `;
}

const spotlightLoops = new WeakMap();
let ambassadorShowcaseTimer = null;

function spotlightCard(card) {
  const images = Array.isArray(card.images) && card.images.length ? card.images : (card.image ? [card.image] : []);
  const image = images[0] || "";
  const sectionClass = card.section === "influencers" ? "influencer-shot" : "portrait";
  const visual = card.visual || (card.section === "influencers" ? "soft" : "pink");
  return `
    <a href="#" data-spotlight-card="${card.id}" data-spotlight-name="${card.name || ""}" data-spotlight-role="${card.role || ""}" data-spotlight-image="${image}">
      <div class="${sectionClass} ${visual} ${image ? "has-upload" : ""}" ${image ? `style="background-image:url('${image}')"` : ""}></div>
      <b>${card.name || "Blossom"}</b>
      <small>${card.role || (card.section === "influencers" ? "Creator" : "Cherry")}</small>
    </a>
  `;
}

function featuredBySection(section) {
  return featuredCards
    .filter((card) => card.section === section)
    .sort((a, b) => Number(a.position || 0) - Number(b.position || 0));
}

function cherrySpotlightCards() {
  return featuredCards
    .filter((card) => card.section === "cherrys" || card.section === "ambassadors")
    .sort((a, b) => Number(a.position || 0) - Number(b.position || 0));
}

function applySpotlightBackground(element, card, fallbackLabel) {
  if (!element) return;
  const image = primaryImage(card);
  element.classList.toggle("has-upload", Boolean(image));
  element.style.backgroundImage = image ? `url('${image}')` : "";
  element.dataset.spotlightName = card?.name || fallbackLabel || "Blossom";
  element.dataset.spotlightRole = card?.role || "";
  element.dataset.spotlightImage = image || "";
  const label = element.querySelector("span");
  const title = element.querySelector("strong");
  if (label) label.textContent = image ? "" : "Imagem";
  if (title) title.textContent = card?.name || fallbackLabel || "Blossom";
}

function renderAmbassadorShowcase() {
  if (!selectors.ambassadorShowcase) return;
  const cards = featuredBySection("ambassadors");
  const hero = selectors.ambassadorShowcase.querySelector(".ambassador-hero");
  const fallback = defaultFeaturedCards.filter((card) => card.section === "ambassadors");
  const slides = (cards.length ? cards : fallback).filter(Boolean);
  let index = 0;
  const renderSlide = () => {
    const card = slides[index % Math.max(slides.length, 1)] || {};
    applySpotlightBackground(hero, { ...card, name: "Cherrys Blossom", role: card.role || "Comunidade oficial" }, "Cherrys Blossom");
    hero?.classList.remove("is-switching");
    requestAnimationFrame(() => hero?.classList.add("is-switching"));
  };
  if (ambassadorShowcaseTimer) clearInterval(ambassadorShowcaseTimer);
  renderSlide();
  if (slides.length > 1) {
    ambassadorShowcaseTimer = setInterval(() => {
      index = (index + 1) % slides.length;
      renderSlide();
    }, 3000);
  }
}

function renderCherryShowcase() {
  if (!selectors.cherryShowcase) return;
  const cherrys = cherrySpotlightCards();
  const explicitMain = cherrys.find((card) => card.isCherrySpotlight);
  const legacyCherrys = featuredBySection("cherrys");
  const main = explicitMain || legacyCherrys[0] || { name: "Cherry Blossom", role: "Cherry em destaque", visual: "rose", image: "" };
  const others = cherrys.filter((card) => card.id !== main.id);
  applySpotlightBackground(selectors.cherryFeature, main, "Cherry Blossom");
  if (selectors.cherryGrid) {
    selectors.cherryGrid.innerHTML = others.length
      ? others.map((card) => spotlightCard({ ...card, section: "cherrys" })).join("")
      : '<p class="empty-products">Cadastre outros Cherrys no painel de destaques.</p>';
  }
}

function renderSpotlightTracks() {
  selectors.spotlightTracks.forEach((track) => {
    const section = track.dataset.spotlightTrack;
    const cards = featuredCards.filter((card) => card.section === section).sort((a, b) => Number(a.position || 0) - Number(b.position || 0));
    const fallback = defaultFeaturedCards.filter((card) => card.section === section);
    const visibleCards = cards.length ? cards : fallback;
    track.innerHTML = visibleCards.map((card) => spotlightCard(card)).join("");
    startSpotlightLoop(track);
  });
}

function renderFutureDrop() {
  const section = selectors.futureDrop;
  if (!section) return;
  const drop = { ...defaultFutureDrop, ...futureDrop };
  const images = Array.isArray(drop.images) && drop.images.length ? drop.images : (drop.image ? [drop.image] : []);
  const image = images[0] || "";
  const setText = (selector, value) => { const element = section.querySelector(selector); if (element) element.textContent = value; };
  setText("[data-future-eyebrow]", drop.eyebrow || defaultFutureDrop.eyebrow);
  setText("[data-future-title]", drop.title || defaultFutureDrop.title);
  setText("[data-future-description]", drop.description || defaultFutureDrop.description);
  setText("[data-future-badge]", drop.badge || defaultFutureDrop.badge);
  setText("[data-future-card-title]", drop.cardTitle || drop.title || defaultFutureDrop.cardTitle);
  const link = section.querySelector("[data-future-link]");
  if (link) { link.href = drop.href || "colecoes.html"; link.innerHTML = `${drop.button || defaultFutureDrop.button} <span>↗</span>`; }
  const media = section.querySelector("[data-future-image]");
  if (media) { media.classList.toggle("has-upload", Boolean(image)); media.style.backgroundImage = image ? `url('${image}')` : ""; }
}

function setHeroLink(link, text, href) {
  if (!link) return;
  link.href = href || "#";
  link.textContent = text || "Abrir";
  if (/^https?:\/\//.test(href || "")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  } else {
    link.removeAttribute("target");
    link.removeAttribute("rel");
  }
}

function renderSiteBanners() {
  const home = { ...defaultSiteBanners.homeHero, ...(siteBanners.homeHero || {}) };
  const homeImage = primaryImage(home);
  if (selectors.homeHero) {
    const logo = selectors.homeHero.querySelector(".editorial-logo");
    const title = logo?.querySelector("strong");
    const subtitle = logo?.querySelector("span");
    const heading = selectors.homeHero.querySelector("h1");
    const description = selectors.homeHero.querySelector("p");
    const actions = selectors.homeHero.querySelectorAll(".editorial-actions a");
    const image = selectors.homeHero.querySelector(".editorial-hero-image");
    if (title) title.textContent = home.title || defaultSiteBanners.homeHero.title;
    if (subtitle) subtitle.textContent = home.subtitle || defaultSiteBanners.homeHero.subtitle;
    if (heading) heading.innerHTML = home.heading || defaultSiteBanners.homeHero.heading;
    if (description) description.textContent = home.description || defaultSiteBanners.homeHero.description;
    setHeroLink(actions[0], home.primaryText, home.primaryHref);
    setHeroLink(actions[1], home.secondaryText, home.secondaryHref);
    if (image) {
      image.classList.toggle("has-upload", Boolean(homeImage));
      image.style.backgroundImage = homeImage ? `url('${homeImage}')` : "";
    }
  }

  const collectionsBanner = { ...defaultSiteBanners.collectionsHero, ...(siteBanners.collectionsHero || {}) };
  const collectionsImage = primaryImage(collectionsBanner);
  if (selectors.collectionsHero) {
    const eyebrow = selectors.collectionsHero.querySelector("[data-collections-hero-eyebrow]");
    const title = selectors.collectionsHero.querySelector("[data-collections-hero-title]");
    const highlight = selectors.collectionsHero.querySelector("[data-collections-hero-highlight]");
    const description = selectors.collectionsHero.querySelector("[data-collections-hero-description]");
    const link = selectors.collectionsHero.querySelector("[data-collections-hero-link]");
    const image = selectors.collectionsHero.querySelector("[data-collections-hero-image]");
    const imageTitle = selectors.collectionsHero.querySelector("[data-collections-hero-image-title]");
    if (eyebrow) eyebrow.textContent = collectionsBanner.eyebrow || defaultSiteBanners.collectionsHero.eyebrow;
    if (title) title.firstChild.textContent = `${collectionsBanner.title || defaultSiteBanners.collectionsHero.title} `;
    if (highlight) highlight.textContent = collectionsBanner.highlight || defaultSiteBanners.collectionsHero.highlight;
    if (description) description.textContent = collectionsBanner.description || defaultSiteBanners.collectionsHero.description;
    if (link) { link.href = collectionsBanner.href || "#todas-colecoes"; link.innerHTML = `${collectionsBanner.button || defaultSiteBanners.collectionsHero.button} <span>↗</span>`; }
    if (imageTitle) imageTitle.textContent = collectionsBanner.imageTitle || defaultSiteBanners.collectionsHero.imageTitle;
    if (image) {
      image.classList.toggle("has-upload", Boolean(collectionsImage));
      image.style.backgroundImage = collectionsImage ? `url('${collectionsImage}')` : "";
    }
  }
}

function renderAboutPage() {
  const page = document.querySelector("[data-about-page]");
  if (!page) return;
  const settings = normalizeAboutSettings(aboutSettings);
  const heroImages = settings.heroImages?.length ? settings.heroImages : (settings.heroImage ? [settings.heroImage] : []);
  const heroImage = heroImages[0] || "";
  const text = (selector, value) => { const element = page.querySelector(selector); if (element) element.textContent = value || ""; };
  text("[data-about-kicker]", settings.heroKicker);
  text("[data-about-title]", settings.heroTitle);
  text("[data-about-description]", settings.heroDescription);
  text("[data-about-team-kicker]", settings.teamKicker);
  text("[data-about-newsletter]", settings.newsletterText);
  const visual = page.querySelector("[data-about-visual]");
  if (visual) {
    visual.classList.toggle("has-upload", Boolean(heroImage));
    visual.style.backgroundImage = heroImage ? `url('${heroImage}')` : "";
  }
  const grid = page.querySelector("[data-about-team-grid]");
  if (!grid) return;
  grid.innerHTML = settings.members.map((member, index) => {
    const image = primaryImage(member);
    const style = image ? ` style="background-image:url('${image}')"` : "";
    const externalLink = member.instagram && /^https?:\/\//.test(member.instagram);
    const instagramHref = externalLink ? member.instagram : "#";
    return `
      <article class="about-team-card ${member.isFounder ? "is-founder" : ""}">
        <button class="about-team-photo ${member.visual || ""} ${image ? "has-upload" : ""}" type="button" data-about-member-index="${index}" aria-label="Abrir imagem de ${escapeHtml(member.name)}"${style}></button>
        <div class="about-team-info">
          <span>${escapeHtml(member.role)}</span>
          <h2>${escapeHtml(member.name)}</h2>
          <a href="${escapeHtml(instagramHref)}" ${externalLink ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(member.instagram || "Instagram")}</a>
        </div>
      </article>
    `;
  }).join("");
}

function openAboutMemberModal(index) {
  const modal = document.querySelector("[data-about-member-modal]");
  if (!modal) return;
  const member = normalizeAboutSettings(aboutSettings).members[index];
  if (!member) return;
  const image = primaryImage(member);
  const externalLink = member.instagram && /^https?:\/\//.test(member.instagram);
  const media = modal.querySelector("[data-about-modal-image]");
  const title = modal.querySelector("[data-about-modal-name]");
  const role = modal.querySelector("[data-about-modal-role]");
  const link = modal.querySelector("[data-about-modal-instagram]");
  if (media) {
    media.className = `about-member-modal-image ${member.visual || ""} ${image ? "has-upload" : ""}`;
    media.style.backgroundImage = image ? `url('${image}')` : "";
  }
  if (title) title.textContent = member.name || "";
  if (role) role.textContent = member.role || "";
  if (link) {
    link.textContent = member.instagram || "Instagram";
    link.href = externalLink ? member.instagram : "#";
    if (externalLink) {
      link.target = "_blank";
      link.rel = "noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  }
  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "");
}

function closeAboutMemberModal() {
  const modal = document.querySelector("[data-about-member-modal]");
  if (!modal) return;
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

function sizeSpotlightCards(track) {
  const cards = [...track.querySelectorAll("a")];
  if (!cards.length) return 0;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap || "22") || 22;
  const viewport = track.closest(".spotlight-carousel")?.clientWidth || window.innerWidth;
  const minWidth = cards.length > 1 ? (viewport - Math.max(cards.length - 2, 0) * gap) / Math.max(cards.length - 1, 1) : viewport;
  track.style.setProperty("--spotlight-card-width", `${Math.ceil(Math.max(190, minWidth))}px`);
  return gap;
}

function startSpotlightLoop(track) {
  const previous = spotlightLoops.get(track);
  if (previous) cancelAnimationFrame(previous.frame);
  const cards = [...track.querySelectorAll("a")];
  const reverse = track.classList.contains("reverse");
  if (cards.length < 2) return;
  let gap = sizeSpotlightCards(track);
  let offset = 0;
  let last = performance.now();
  const stepSize = () => { const card = track.querySelector("a"); return (card?.getBoundingClientRect().width || 0) + gap; };
  if (reverse) offset = -stepSize();
  track.style.transform = `translate3d(${offset}px, 0, 0)`;
  const tick = (now) => {
    const controller = spotlightLoops.get(track);
    if (!controller) return;
    const elapsed = Math.min(now - last, 64);
    last = now;
    if (!track.matches(":has(a:hover)")) {
      const speed = 42;
      const distance = (elapsed / 1000) * speed;
      const step = stepSize();
      if (reverse) {
        offset += distance;
        if (offset >= 0) { const lastCard = track.lastElementChild; if (lastCard) track.insertBefore(lastCard, track.firstElementChild); offset -= step; }
      } else {
        offset -= distance;
        if (Math.abs(offset) >= step) { const firstCard = track.firstElementChild; if (firstCard) track.appendChild(firstCard); offset += step; }
      }
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
    controller.frame = requestAnimationFrame(tick);
  };
  const onResize = () => { gap = sizeSpotlightCards(track); offset = reverse ? -stepSize() : 0; track.style.transform = `translate3d(${offset}px, 0, 0)`; };
  window.removeEventListener("resize", track._spotlightResize);
  track._spotlightResize = onResize;
  window.addEventListener("resize", onResize);
  spotlightLoops.set(track, { frame: requestAnimationFrame(tick) });
}

function lookbookCard(product, index) {
  const image = primaryImage(product);
  const imageStyle = image ? `data-src="${image}"` : "";
  return `
    <article class="lookbook-card">
      <div class="home-image-slot ${image ? "has-upload" : ""} ${product.visual || ""}" ${imageStyle}>
        <span>${image ? "" : `Foto ${index + 1}`}</span>
      </div>
    </article>
  `;
}

function renderCatalog() {
  if (!hasShop) return;
  const filtered = getFilteredProducts();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);
  selectors.resultCount.textContent = filtered.length;
  selectors.priceLabel.textContent = money.format(state.maxPrice);
  if (!pageItems.length) {
    selectors.shopGrid.innerHTML = '<p class="empty-products">Nenhuma peça encontrada com esses filtros.</p>';
  } else {
    selectors.shopGrid.innerHTML = pageItems.map((product) => productCard(product)).join("");
  }
  refreshLazyImages();
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  selectors.pagination.innerHTML = `
    <button type="button" data-page-prev ${state.page === 1 ? "disabled" : ""}>Anterior</button>
    ${pages.map((page) => `
      <button class="${page === state.page ? "active" : ""}" type="button" data-page="${page}">${page}</button>
    `).join("")}
    <button type="button" data-page-next ${state.page === totalPages ? "disabled" : ""}>Próxima</button>
  `;
}

function renderHomeSections() {
  renderSiteBanners();
  renderFutureDrop();
  renderAmbassadorShowcase();
  renderCherryShowcase();
  renderSpotlightTracks();
  if (hasHomeProducts) {
    const saleProducts = recentItems(products.filter((product) => product.visibility !== "collection-only"), 8);
    selectors.homeProducts.innerHTML = saleProducts.map((product, index) => lookbookCard(product, index)).join("")
      || Array.from({ length: 5 }, (_, index) => lookbookCard({ name: `Foto ${index + 1}`, visual: "" }, index)).join("");
  }
  if (hasHomeCollections) {
    selectors.homeCollections.innerHTML = recentItems(collections, 8).map(homeCollectionCard).join("")
      || '<p class="empty-products">Nenhuma coleção cadastrada ainda.</p>';
  }
  if (selectors.lookbookTrack) {
    const looks = recentItems(products.filter((product) => product.visibility !== "collection-only"), 8);
    selectors.lookbookTrack.innerHTML = looks.map((product, index) => lookbookCard(product, index)).join("")
      || Array.from({ length: 5 }, (_, index) => lookbookCard({ name: `Foto ${index + 1}`, visual: "" }, index)).join("");
  }
  refreshLazyImages();
  initHomeCarousels();
}

function collectionProducts(collectionId) { return products.filter((product) => product.collection === collectionId); }
function collectionPieceCount(collection) { return collectionProducts(collection.id).length; }
function collectionPrice(collection) {
  const explicit = Number(collection.price || 0);
  if (explicit > 0) return explicit;
  return collectionProducts(collection.id).filter((product) => product.visibility !== "collection-only").reduce((sum, product) => sum + Number(product.price || 0), 0);
}

function collectionDetailProductCard(product) {
  const image = primaryImage(product);
  const type = product.type || product.category || "Peca";
  return `
    <article class="collection-product-card">
      <div class="collection-product-media ${product.visual || "hoodie-dark"} ${image ? "has-upload" : ""}" ${image ? `style="background-image:url('${image}')"` : ""}></div>
      <div>
        <span>*</span>
        <h3>${type}</h3>
        <p>${product.name || "Peca Blossom"}</p>
      </div>
    </article>
  `;
}

function getFilteredCollections() {
  let filtered = collections.filter((collection) => {
    const related = collectionProducts(collection.id);
    const matchesCategory = state.collectionCategory === "Todas" || related.some((product) => product.category === state.collectionCategory);
    const matchesType = state.collectionType === "Todos" || related.some((product) => product.type === state.collectionType);
    const matchesColor = state.collectionColor === "Todas" || related.some((product) => product.color === state.collectionColor);
    return matchesCategory && matchesType && matchesColor;
  });
  filtered = filtered.sort((a, b) => {
    if (state.collectionSort === "pieces") return collectionPieceCount(b) - collectionPieceCount(a);
    if (state.collectionSort === "name") return a.name.localeCompare(b.name);
    return recentValue(b) - recentValue(a);
  });
  return filtered;
}

function renderCollectionControls() {
  if (!hasCollections) return;
  const categoryOptions = ["Todas", ...new Set(products.map((product) => product.category).filter(Boolean))];
  const typeOptions = ["Todos", ...new Set(products.map((product) => product.type).filter(Boolean))];
  const colorOptions = ["Todas", ...new Set(products.map((product) => product.color).filter(Boolean))];
  if (selectors.collectionCategory) selectors.collectionCategory.innerHTML = categoryOptions.map((item) => `<option ${item === state.collectionCategory ? "selected" : ""}>${item}</option>`).join("");
  if (selectors.collectionType) selectors.collectionType.innerHTML = typeOptions.map((item) => `<option ${item === state.collectionType ? "selected" : ""}>${item}</option>`).join("");
  if (selectors.collectionColor) selectors.collectionColor.innerHTML = colorOptions.map((item) => `<option ${item === state.collectionColor ? "selected" : ""}>${item}</option>`).join("");
  selectors.collectionTabs?.querySelectorAll("[data-collection-category-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.collectionCategoryTab === state.collectionCategory);
  });
}

function renderCollections() {
  if (!hasCollections) return;
  renderCollectionControls();
  const visibleCollections = getFilteredCollections();
  selectors.collectionsGrid.innerHTML = visibleCollections.map((collection) => `
    <article>
      <div class="template-visual collection-preview ${collection.visual || "essentials"} ${primaryImage(collection) ? "has-upload" : ""}" ${primaryImage(collection) ? `data-src="${primaryImage(collection)}"` : ""}>
        ${collection.badge ? `<span>${collection.badge}</span>` : ""}
      </div>
      <div>
        <h2>${collection.name}</h2>
        <b>${collection.label}</b>
        <p>${collection.description}</p>
        <footer><span>${String(collectionPieceCount(collection)).padStart(2, "0")} peças</span><a href="colecao.html?id=${collection.id}">Ver coleção</a></footer>
      </div>
    </article>
  `).join("") || '<p class="empty-products">Nenhuma coleção encontrada com esses filtros.</p>';
  refreshLazyImages();
}

function renderCollectionDetail() {
  if (!hasCollectionDetail) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const collection = collections.find((item) => item.id === id) || collections[0];
  if (!collection) {
    selectors.collectionDetail.innerHTML = '<p class="empty-products">Nenhuma colecao encontrada.</p>';
    selectors.collectionProducts.innerHTML = "";
    selectors.collectionGallery.innerHTML = "";
    if (selectors.collectionAbout) selectors.collectionAbout.innerHTML = "";
    if (selectors.collectionCta) selectors.collectionCta.innerHTML = "";
    return;
  }
  const related = collectionProducts(collection.id);
  const images = itemImages(collection);
  const heroImage = images[0] || "";
  const aboutImage = images[1] || heroImage;
  const pieceText = `${String(related.length).padStart(2, "0")} ${related.length === 1 ? "peca inclusa" : "pecas inclusas"}`;
  selectors.collectionDetail.innerHTML = `
    <span class="eyebrow">Colecao</span>
    <h1>${collection.name || "Colecao Blossom"} <i>*</i></h1>
    <b>${collection.label || "Blossom Store"}</b>
    <p>${collection.description || collection.label || ""}</p>
    <div class="collection-buy-panel">
      <div>
        <span>Box</span>
        <strong>${pieceText}</strong>
        <small>Todas as pecas desta colecao vem juntas em um pacote unico.</small>
      </div>
      <a href="https://www.patreon.com" target="_blank" rel="noreferrer"><span>Patreon</span> Adquirir no Patreon</a>
    </div>
  `;
  selectors.collectionGallery.innerHTML = heroImage
    ? `<div class="collection-photo has-upload" style="background-image:url('${heroImage}')"></div>`
    : `<div class="template-visual collection-photo ${collection.visual || "essentials"}"></div>`;
  selectors.collectionProducts.innerHTML = related.map(collectionDetailProductCard).join("")
    || '<p class="empty-products">Nenhuma peca vinculada a esta colecao ainda.</p>';
  if (selectors.collectionAbout) {
    selectors.collectionAbout.innerHTML = `
      <div>
        <span>Sobre a colecao</span>
        <h2>${collection.name || "Colecao Blossom"} <i>*</i></h2>
        <p>${collection.description || "Uma colecao criada para destacar estilo, conforto e atitude dentro da comunidade Blossom."}</p>
        <ul>
          <li><b>Design exclusivo</b><small>Pecas unicas e detalhadas.</small></li>
          <li><b>Alta qualidade</b><small>Texturas e modelagem premium.</small></li>
          <li><b>Estilo e atitude</b><small>Para quem nao passa despercebido.</small></li>
        </ul>
      </div>
      <div class="collection-about-image ${aboutImage ? "has-upload" : ""}" ${aboutImage ? `style="background-image:url('${aboutImage}')"` : ""}></div>
    `;
  }
  if (selectors.collectionCta) {
    selectors.collectionCta.innerHTML = `
      <div class="collection-cta-mark">*</div>
      <div>
        <h2>Pronto para se destacar?</h2>
        <p>Adquira agora a colecao completa no Patreon e eleve o nivel do seu personagem.</p>
      </div>
      <a href="https://www.patreon.com" target="_blank" rel="noreferrer"><span>Patreon</span> Adquirir no Patreon</a>
    `;
  }
}

function loadAccount() {
  try {
    const saved = JSON.parse(localStorage.getItem("blossom-user-account"));
    if (!saved || !saved.logged || saved.name === legacyDemoAccountName) {
      return { logged: false, name: "visitante", username: "", email: "", role: "cliente" };
    }
    return { logged: true, id: saved.id || "", name: saved.name || saved.username || "visitante", username: saved.username || saved.name || "", email: saved.email || "", role: saved.role || "cliente" };
  } catch { return { logged: false, name: "visitante", username: "", email: "", role: "cliente" }; }
}

function saveAccount() {
  localStorage.setItem("blossom-user-account", JSON.stringify(account));
  if (account.role === "admin") { localStorage.setItem("blossom-admin-session", "active"); } else { localStorage.removeItem("blossom-admin-session"); }
}

function createAccountSettingsDialog() {
  let dialog = document.querySelector("[data-account-settings]");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.className = "admin-dialog account-settings-dialog";
  dialog.dataset.accountSettings = "";
  dialog.innerHTML = `
    <form method="dialog" data-account-settings-form>
      <button class="icon-button dialog-close" type="button" data-account-settings-close>×</button>
      <h2>Configurações</h2>
      <label>Nome da conta<input name="username" autocomplete="username" required></label>
      <label>E-mail<input name="email" type="email" autocomplete="email" placeholder="email@exemplo.com"></label>
      <label>Nova senha<input name="password" type="password" autocomplete="new-password" placeholder="Deixe vazio para manter"></label>
      <p class="auth-message" data-account-settings-message></p>
      <button class="checkout-button" type="submit">Salvar alterações</button>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector("[data-account-settings-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-account-settings-form]").addEventListener("submit", saveAccountSettings);
  return dialog;
}

function openAccountSettings() {
  if (!account.logged) { window.location.href = "login.html"; return; }
  const dialog = createAccountSettingsDialog();
  const form = dialog.querySelector("[data-account-settings-form]");
  form.username.value = account.username || account.name || "";
  form.email.value = account.email || "";
  form.password.value = "";
  dialog.querySelector("[data-account-settings-message]").textContent = "";
  dialog.showModal();
}

async function saveAccountSettings(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector("[data-account-settings-message]");
  const submitButton = form.querySelector("[type='submit']");
  const data = new FormData(form);
  submitButton.disabled = true;
  message.dataset.type = "info";
  message.textContent = "Salvando...";
  try {
    const response = await fetch("/api/account", {
      method: "PATCH", headers: { "Content-Type": "application/json", "x-blossom-user-id": account.id || "" },
      body: JSON.stringify({ username: data.get("username"), email: data.get("email"), password: data.get("password") }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "Não foi possível salvar as configurações.");
    account = { logged: true, id: body.user.id, name: body.user.username, username: body.user.username, email: body.user.email || "", role: body.user.role || "cliente" };
    saveAccount();
    message.dataset.type = "success";
    message.textContent = "Conta atualizada.";
  } catch (error) {
    message.dataset.type = "error";
    message.textContent = error.message;
  } finally { submitButton.disabled = false; }
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(12px)"; setTimeout(() => el.remove(), 300); }, 3000);
}

if (hasShop) {
  selectors.categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    state.page = 1;
    renderFilters();
    renderCatalog();
  });
  selectors.typeList.addEventListener("change", (event) => {
    if (!event.target.matches("[data-type]")) return;
    event.target.checked ? state.types.add(event.target.value) : state.types.delete(event.target.value);
    state.page = 1; renderCatalog();
  });
  selectors.colorList.addEventListener("change", (event) => {
    if (!event.target.matches("[data-color]")) return;
    event.target.checked ? state.colors.add(event.target.value) : state.colors.delete(event.target.value);
    state.page = 1; renderCatalog();
  });
  selectors.search.addEventListener("input", () => { state.search = selectors.search.value.trim(); state.page = 1; renderCatalog(); });
  selectors.sort.addEventListener("change", () => { state.sort = selectors.sort.value; renderCatalog(); });
  selectors.priceRange.addEventListener("input", () => { state.maxPrice = Number(selectors.priceRange.value); state.page = 1; renderCatalog(); });
  selectors.clearFilters.addEventListener("click", () => {
    state.category = "Todas as peças"; state.types.clear(); state.colors.clear(); state.search = ""; state.sort = "recent"; state.maxPrice = 9999; state.page = 1;
    selectors.search.value = ""; selectors.sort.value = "recent"; selectors.priceRange.value = "9999";
    renderFilters(); renderCatalog();
  });
  selectors.pagination.addEventListener("click", (event) => {
    const page = event.target.closest("[data-page]");
    const prev = event.target.closest("[data-page-prev]");
    const next = event.target.closest("[data-page-next]");
    if (page) state.page = Number(page.dataset.page);
    if (prev) state.page -= 1;
    if (next) state.page += 1;
    renderCatalog();
  });
}

if (hasCollections) {
  selectors.collectionTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-collection-category-tab]");
    if (!button) return;
    state.collectionCategory = button.dataset.collectionCategoryTab;
    selectors.collectionTabs.querySelectorAll("[data-collection-category-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    renderCollections();
  });
  selectors.collectionCategory?.addEventListener("change", () => { state.collectionCategory = selectors.collectionCategory.value; renderCollections(); });
  selectors.collectionType?.addEventListener("change", () => { state.collectionType = selectors.collectionType.value; renderCollections(); });
  selectors.collectionColor?.addEventListener("change", () => { state.collectionColor = selectors.collectionColor.value; renderCollections(); });
  selectors.collectionSort?.addEventListener("change", () => { state.collectionSort = selectors.collectionSort.value; renderCollections(); });
}

selectors.cherryToggle?.addEventListener("click", () => {
  if (!selectors.cherryShowcase || !selectors.cherryGrid || !selectors.cherryToggle) return;
  const open = selectors.cherryShowcase.classList.toggle("is-open");
  selectors.cherryGrid.hidden = !open;
  selectors.cherryToggle.innerHTML = open ? 'Ocultar outros Cherrys <span>↗</span>' : 'Mostrar outros Cherrys <span>↗</span>';
});

document.addEventListener("click", (event) => {
  const memberImage = event.target.closest("[data-about-member-index]");
  if (memberImage) {
    openAboutMemberModal(Number(memberImage.dataset.aboutMemberIndex));
    return;
  }
  if (event.target.closest("[data-about-modal-close]")) closeAboutMemberModal();
});

document.querySelector("[data-about-member-modal]")?.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeAboutMemberModal();
});
/* Spotlight card popup */
function createSpotlightPopup() {
  let popup = document.querySelector("[data-spotlight-popup]");
  if (popup) return popup;
  popup = document.createElement("div");
  popup.dataset.spotlightPopup = "";
  popup.style.cssText = "position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;background:rgba(5,3,5,0.85);backdrop-filter:blur(8px);padding:24px;cursor:pointer;";
  popup.innerHTML = `
    <div style="position:relative;max-width:980px;width:100%;display:grid;grid-template-columns:1.15fr 1fr;gap:32px;align-items:center;background:#0b080b;border:1px solid rgba(255,112,158,0.25);border-radius:16px;padding:32px;cursor:default;">
      <div data-popup-image style="aspect-ratio:11/6;border-radius:12px;background-color:#09070a;background-image:linear-gradient(135deg,rgba(255,156,188,0.2),transparent),linear-gradient(150deg,#161c22,#070a0d);background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
      <div style="display:grid;gap:12px;">
        <h2 data-popup-name style="margin:0;font-size:clamp(28px,4vw,48px);font-family:'Oswald',sans-serif;text-transform:uppercase;color:#fff5f8;"></h2>
        <p data-popup-role style="margin:0;font-size:14px;color:rgba(232,210,219,0.6);text-transform:uppercase;letter-spacing:0.2em;font-weight:800;"></p>
        <button type="button" data-popup-close style="justify-self:start;margin-top:12px;min-height:38px;padding:0 22px;border:1px solid rgba(255,112,158,0.48);border-radius:4px;background:transparent;color:var(--ed-pink);font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer;">Fechar</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  popup.addEventListener("click", (e) => { if (e.target === popup) popup.style.display = "none"; });
  popup.querySelector("[data-popup-close]").addEventListener("click", () => popup.style.display = "none");
  return popup;
}

document.addEventListener("click", (event) => {
  const cardLink = event.target.closest("[data-spotlight-card]");
  if (cardLink) {
    event.preventDefault();
    const popup = createSpotlightPopup();
    const name = cardLink.dataset.spotlightName || "Blossom";
    const role = cardLink.dataset.spotlightRole || "";
    const image = cardLink.dataset.spotlightImage || "";
    popup.querySelector("[data-popup-name]").textContent = name;
    popup.querySelector("[data-popup-role]").textContent = role;
    const imgDiv = popup.querySelector("[data-popup-image]");
    imgDiv.style.backgroundSize = "cover";
    imgDiv.style.backgroundPosition = "center";
    imgDiv.style.backgroundRepeat = "no-repeat";
    imgDiv.style.backgroundColor = "#09070a";
    if (image) { imgDiv.style.backgroundImage = `url('${image}')`; } else { imgDiv.style.backgroundImage = "linear-gradient(135deg,rgba(255,156,188,0.2),transparent),linear-gradient(150deg,#161c22,#070a0d)"; }
    popup.style.display = "flex";
    return;
  }
});

/* Account */
function toggleAccountMenu(force) {
  if (!selectors.accountMenu || !selectors.accountToggle) return;
  const shouldOpen = typeof force === "boolean" ? force : selectors.accountMenu.hidden;
  selectors.accountMenu.hidden = !shouldOpen;
  selectors.accountToggle.setAttribute("aria-expanded", String(shouldOpen));
}

if (selectors.accountToggle) {
  selectors.accountToggle.addEventListener("click", (event) => { event.stopPropagation(); toggleAccountMenu(); });
}

if (selectors.accountLogout) {
  selectors.accountLogout.addEventListener("click", () => {
    if (account.logged) {
      account = { logged: false, name: "visitante", username: "", email: "", role: "cliente" };
      localStorage.removeItem("blossom-user-account");
      localStorage.removeItem("blossom-admin-session");
      toggleAccountMenu(false);
      renderAccountUI();
      return;
    }
    window.location.href = "login.html";
  });
}

if (selectors.accountConfig) {
  selectors.accountConfig.addEventListener("click", (event) => { event.preventDefault(); toggleAccountMenu(false); openAccountSettings(); });
}

if (selectors.accountMenu) {
  selectors.accountMenu.addEventListener("click", (event) => {
    const history = event.target.closest("[data-order-history-open]");
    if (!history) return;
    event.preventDefault();
    toggleAccountMenu(false);
  });
}

document.addEventListener("keydown", (event) => { if (event.key === "Escape") { toggleAccountMenu(false); } });
document.addEventListener("click", (event) => { if (!event.target.closest(".account")) { toggleAccountMenu(false); } });

function renderAccountUI() {
  if (selectors.accountName) selectors.accountName.textContent = account.logged ? (account.name || account.username || "visitante") : "visitante";
  if (selectors.accountLogout) selectors.accountLogout.textContent = account.logged ? "Logout" : "Entrar";
  if (selectors.accountAdminLinks) {
    selectors.accountAdminLinks.forEach((link) => { link.href = account.logged && account.role === "admin" ? "admin.html" : "login.html"; });
  }
}

renderAccountUI();

if (hasShop) { renderFilters(); renderCatalog(); }
renderHomeSections();
renderAboutPage();
renderCollections();
renderCollectionDetail();
loadApiStore();
