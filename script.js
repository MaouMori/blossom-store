const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function initMobileMenu() {
  const toggle = document.querySelector("[data-mobile-menu-toggle]");
  const overlay = document.querySelector("[data-mobile-nav-overlay]");
  const nav = document.querySelector("[data-mobile-nav]");
  const close = document.querySelector("[data-mobile-nav-close]");
  if (!toggle || !overlay || !nav) return;

  function open() {
    overlay.classList.add("active");
    nav.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay.classList.remove("active");
    nav.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", open);
  overlay.addEventListener("click", closeMenu);
  if (close) close.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("DOMContentLoaded", initMobileMenu);

function initLazyImages() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const src = el.dataset.src;
          if (src) {
            if (el.tagName === "IMG") {
              el.src = src;
            } else {
              el.style.backgroundImage = `url('${src}')`;
            }
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
      if (src) {
        if (el.tagName === "IMG") {
          el.src = src;
        } else {
          el.style.backgroundImage = `url('${src}')`;
        }
        el.removeAttribute("data-src");
      }
    });
  }
}

function refreshLazyImages() {
  if (window._lazyObserver) {
    document.querySelectorAll("[data-src]").forEach((el) => window._lazyObserver.observe(el));
  }
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
      if (direction > 0 && end) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      track.scrollBy({ left: step * direction, behavior: "smooth" });
    };
    prev?.addEventListener("click", () => move(-1));
    next?.addEventListener("click", () => move(1));
    window.setInterval(() => move(1), 3600);
  });
}

function initThemeToggle() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button || !document.body.classList.contains("home-editorial")) return;
  const saved = localStorage.getItem("blossom-home-theme") || "dark";

  function setTheme(theme) {
    const light = theme === "light";
    document.body.classList.toggle("editorial-light", light);
    button.setAttribute("aria-pressed", String(light));
    localStorage.setItem("blossom-home-theme", light ? "light" : "dark");
  }

  setTheme(saved);
  button.addEventListener("click", () => {
    setTheme(document.body.classList.contains("editorial-light") ? "dark" : "light");
  });
}

document.addEventListener("DOMContentLoaded", initLazyImages);
document.addEventListener("DOMContentLoaded", initThemeToggle);

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
  id,
  name,
  category,
  type,
  color,
  price,
  visual,
  isNew,
  created: index,
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
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Array.isArray(saved) ? saved : fallback;
  } catch {
    return fallback;
  }
}

const apiEnabled = location.protocol.startsWith("http");
const legacyDemoAccountName = ["vinicius", "silv-33afab"].join("_");

function recentValue(item) {
  return Number(item.createdAt || item.created || 0);
}

function recentItems(items, limit) {
  return [...items].sort((a, b) => recentValue(b) - recentValue(a)).slice(0, limit);
}

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

function primaryImage(item) {
  return itemImages(item)[0] || "";
}

const couponRules = {
  BLOSSOM10: { label: "BLOSSOM10", type: "percent", value: 10 },
  RP15: { label: "RP15", type: "percent", value: 15 },
  PINK20: { label: "PINK20", type: "fixed", value: 20 },
};

let products = apiEnabled ? [] : readStore("blossom-products", []);
let collections = apiEnabled ? [] : readStore("blossom-collections", []);
let taxonomies = (() => {
  if (apiEnabled) return { categories: [], types: [], colors: [], visuals: [] };
  try {
    const saved = JSON.parse(localStorage.getItem("blossom-taxonomies"));
    return saved && typeof saved === "object" ? { ...defaultTaxonomies, ...saved } : defaultTaxonomies;
  } catch {
    return defaultTaxonomies;
  }
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
  homeProducts: document.querySelector("[data-home-products]"),
  homeCollections: document.querySelector("[data-home-collections]"),
  lookbookTrack: document.querySelector("[data-lookbook-track]"),
  contactForm: document.querySelector("[data-contact-form]"),
  contactMessage: document.querySelector("[data-message]"),
  contactMessageCount: document.querySelector("[data-message-count]"),
  contactFile: document.querySelector("[data-contact-file]"),
  contactFileLabel: document.querySelector("[data-file-label]"),
  cartSummary: document.querySelector(".cart-summary"),
};

const state = {
  category: "Todas as peças",
  types: new Set(),
  colors: new Set(),
  search: "",
  sort: "recent",
  maxPrice: 9999,
  page: 1,
  perPage: 16,
  collectionCategory: "Todas",
  collectionType: "Todos",
  collectionColor: "Todas",
  collectionSort: "recent",
};

let cart = loadCart();
let account = loadAccount();
let activeCoupon = loadCoupon();

async function loadApiStore() {
  if (!apiEnabled) return;
  try {
    const response = await fetch("/api/store");
    if (!response.ok) return;
    const store = await response.json();
    products = Array.isArray(store.products) ? store.products : [];
    collections = Array.isArray(store.collections) ? store.collections : [];
    taxonomies = store.taxonomies && Object.keys(store.taxonomies).length ? store.taxonomies : { categories: [], types: [], colors: [], visuals: [] };
    if (hasShop) {
      renderFilters();
      renderCatalog();
    }
    renderHomeSections();
    renderCollections();
    renderCollectionDetail();
  } catch {
    products = [];
    collections = [];
    renderHomeSections();
    renderCollections();
    renderCollectionDetail();
  }
}

const hasShop = Boolean(selectors.shopGrid);
const hasCollections = Boolean(selectors.collectionsGrid);
const hasCollectionDetail = Boolean(selectors.collectionDetail);
const hasHomeProducts = Boolean(selectors.homeProducts);
const hasHomeCollections = Boolean(selectors.homeCollections);
const hasContact = Boolean(selectors.contactForm);

function countBy(key) {
  return products.filter((product) => product.visibility !== "collection-only").reduce((acc, product) => {
    acc[product[key]] = (acc[product[key]] || 0) + 1;
    return acc;
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

  const swatches = {
    Preto: "#050608",
    Branco: "#f2f0eb",
    Rosa: "#ff9cbc",
    Cinza: "#aeb3b8",
    Bege: "#d9c6a5",
    Azul: "#2f8cff",
  };

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
  const collectionOnly = product.visibility === "collection-only";
  return `
    <article class="product-card ${compact ? "" : "shop-product"} ${collectionOnly ? "included-product" : ""}" data-product-id="${product.id}">
      <div class="template-visual product-media ${visual} ${image ? "has-upload" : ""}" ${imageStyle}>
        ${product.isNew ? "<span>Novo</span>" : ""}
      </div>
      <div class="product-copy">
        <h3>${product.name}</h3>
        <p>${label}</p>
        ${collectionOnly
          ? '<strong class="included-label">Incluso na coleção</strong>'
          : `<strong>${money.format(Number(product.price || 0))}</strong><button class="add-button" type="button" aria-label="Adicionar ${product.name}" data-add-to-cart="${product.id}">Adicionar</button>`}
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
    <article class="editorial-collection-card ${image ? "has-upload" : ""}" ${imageStyle}>
      <div>
        <h3>${shortName}</h3>
        <a href="colecao.html?id=${collection.id}">↗</a>
      </div>
      <div>
        <span>${image ? "" : "Imagem da coleção"}</span>
      </div>
    </article>
  `;
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

function collectionProducts(collectionId) {
  return products.filter((product) => product.collection === collectionId);
}

function collectionPieceCount(collection) {
  return collectionProducts(collection.id).length;
}

function collectionPrice(collection) {
  const explicit = Number(collection.price || 0);
  if (explicit > 0) return explicit;
  return collectionProducts(collection.id)
    .filter((product) => product.visibility !== "collection-only")
    .reduce((sum, product) => sum + Number(product.price || 0), 0);
}

function cartItemPrice(item) {
  return Number(item.price || 0);
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
        <footer><span>${String(collectionPieceCount(collection)).padStart(2, "0")} peças • ${money.format(collectionPrice(collection))}</span><a href="colecao.html?id=${collection.id}">Ver coleção</a></footer>
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
    selectors.collectionDetail.innerHTML = '<p class="empty-products">Nenhuma coleção encontrada.</p>';
    selectors.collectionProducts.innerHTML = "";
    selectors.collectionGallery.innerHTML = "";
    return;
  }

  const related = collectionProducts(collection.id);
  const images = itemImages(collection);
  const price = collectionPrice(collection);
  selectors.collectionDetail.innerHTML = `
    <span class="eyebrow">Coleção</span>
    <h1>${collection.name}</h1>
    <p>${collection.description || collection.label || ""}</p>
    <div class="collection-buy-panel">
      <strong>${money.format(price)}</strong>
      <span>${String(related.length).padStart(2, "0")} peças inclusas</span>
      <button class="button primary" type="button" data-add-collection="${collection.id}">Adicionar coleção</button>
      <a class="button secondary" href="loja.html">Ver loja completa</a>
    </div>
  `;
  selectors.collectionGallery.innerHTML = images.map((image) => `<div class="collection-photo" style="background-image:url('${image}')"></div>`).join("")
    || `<div class="template-visual collection-photo ${collection.visual || "essentials"}"></div>`;
  selectors.collectionProducts.innerHTML = related.map((product) => productCard(product)).join("")
    || '<p class="empty-products">Nenhuma peça vinculada a esta coleção ainda.</p>';
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("blossom-cart")) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("blossom-cart", JSON.stringify(cart));
}

function loadCoupon() {
  const code = localStorage.getItem("blossom-coupon") || "";
  return couponRules[code] ? code : "";
}

function saveCoupon() {
  if (activeCoupon) {
    localStorage.setItem("blossom-coupon", activeCoupon);
  } else {
    localStorage.removeItem("blossom-coupon");
  }
}

function loadAccount() {
  try {
    const saved = JSON.parse(localStorage.getItem("blossom-user-account"));
    if (!saved || !saved.logged || saved.name === legacyDemoAccountName) {
      return { logged: false, name: "visitante", username: "", email: "", role: "cliente" };
    }
    return {
      logged: true,
      id: saved.id || "",
      name: saved.name || saved.username || "visitante",
      username: saved.username || saved.name || "",
      email: saved.email || "",
      role: saved.role || "cliente",
    };
  } catch {
    return { logged: false, name: "visitante", username: "", email: "", role: "cliente" };
  }
}

function saveAccount() {
  localStorage.setItem("blossom-user-account", JSON.stringify(account));
  if (account.role === "admin") {
    localStorage.setItem("blossom-admin-session", "active");
  } else {
    localStorage.removeItem("blossom-admin-session");
  }
}

function ensureAccountMenuExtras() {
  if (!selectors.accountMenu || selectors.accountMenu.querySelector("[data-order-history-open]")) return;
  const history = document.createElement("a");
  history.href = "#";
  history.dataset.orderHistoryOpen = "";
  history.textContent = "Histórico de compras";
  const logout = selectors.accountLogout;
  selectors.accountMenu.insertBefore(history, logout);
}

function ensureCartExtras() {
  if (!selectors.cartSummary || selectors.cartSummary.querySelector("[data-coupon-form]")) return;
  const couponBox = document.createElement("form");
  couponBox.className = "coupon-form";
  couponBox.dataset.couponForm = "";
  couponBox.innerHTML = `
    <label for="coupon-code">Cupom de desconto</label>
    <div>
      <input id="coupon-code" name="coupon" type="text" placeholder="BLOSSOM10" autocomplete="off">
      <button type="submit">Aplicar</button>
    </div>
    <small data-coupon-feedback></small>
  `;
  const discountRow = document.createElement("div");
  discountRow.className = "discount-row";
  discountRow.dataset.discountRow = "";
  discountRow.hidden = true;
  discountRow.innerHTML = '<span>Desconto</span><strong data-discount-total>-R$0,00</strong>';
  const totalRow = selectors.cartSummary.querySelector(".summary-total");
  selectors.cartSummary.insertBefore(couponBox, totalRow);
  selectors.cartSummary.insertBefore(discountRow, totalRow);
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
  if (!account.logged) {
    window.location.href = "login.html";
    return;
  }

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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-blossom-user-id": account.id || "",
      },
      body: JSON.stringify({
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "Não foi possível salvar as configurações.");

    account = {
      logged: true,
      id: body.user.id,
      name: body.user.username,
      username: body.user.username,
      email: body.user.email || "",
      role: body.user.role || "cliente",
    };
    saveAccount();
    renderCart();
    message.dataset.type = "success";
    message.textContent = "Conta atualizada.";
  } catch (error) {
    message.dataset.type = "error";
    message.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
}

function createOrderHistoryDialog() {
  let dialog = document.querySelector("[data-order-history]");
  if (dialog) return dialog;

  dialog = document.createElement("dialog");
  dialog.className = "admin-dialog order-history-dialog";
  dialog.dataset.orderHistory = "";
  dialog.innerHTML = `
    <button class="icon-button dialog-close" type="button" data-order-history-close>×</button>
    <span class="eyebrow">Conta Blossom</span>
    <h2>Histórico de compras</h2>
    <div class="order-history-list" data-order-history-list>
      <p class="empty-cart">Carregando pedidos...</p>
    </div>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector("[data-order-history-close]").addEventListener("click", () => dialog.close());
  return dialog;
}

async function openOrderHistory() {
  if (!account.logged) {
    window.location.href = "login.html";
    return;
  }

  const dialog = createOrderHistoryDialog();
  const list = dialog.querySelector("[data-order-history-list]");
  list.innerHTML = '<p class="empty-cart">Carregando pedidos...</p>';
  dialog.showModal();

  try {
    const params = new URLSearchParams();
    if (account.id) params.set("userId", account.id);
    if (account.email) params.set("email", account.email);
    const response = await fetch(`/api/orders?${params.toString()}`);
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "Não foi possível carregar o histórico.");
    const orders = Array.isArray(body.orders) ? body.orders : [];
    list.innerHTML = orders.map((order) => `
      <article class="history-order">
        <div>
          <h3>${order.id}</h3>
          <p>${new Date(order.createdAt || Date.now()).toLocaleString("pt-BR")} • ${order.payment || "Pagamento"}</p>
          <small>${(order.items || []).map((item) => `${item.quantity || 1}x ${item.name}`).join(", ")}</small>
        </div>
        <strong>${money.format(Number(order.total || 0))}</strong>
      </article>
    `).join("") || '<p class="empty-cart">Nenhuma compra encontrada para esta conta.</p>';
  } catch (error) {
    list.innerHTML = `<p class="empty-cart">${error.message}</p>`;
  }
}

function addToCart(product) {
  const current = cart.find((item) => item.id === product.id);
  if (current) {
    current.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function collectionCartItem(collection) {
  const related = collectionProducts(collection.id);
  return {
    id: `collection-${collection.id}`,
    kind: "collection",
    collectionId: collection.id,
    name: collection.name,
    category: "Coleção",
    type: `${related.length} peças inclusas`,
    price: collectionPrice(collection),
    visual: collection.visual,
    image: primaryImage(collection),
    images: itemImages(collection),
  };
}

function updateQuantity(id, direction) {
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity += direction;

  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((entry) => entry.id !== id);
  saveCart();
  renderCart();
}

function cartTotal() {
  return Math.max(0, cartSubtotal() - cartDiscount());
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + cartItemPrice(item) * item.quantity, 0);
}

function cartDiscount() {
  const subtotal = cartSubtotal();
  const coupon = couponRules[activeCoupon];
  if (!coupon || !subtotal) return 0;
  if (coupon.type === "percent") return subtotal * (coupon.value / 100);
  return Math.min(subtotal, coupon.value);
}

function cartQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
  ensureCartExtras();
  ensureAccountMenuExtras();
  const subtotal = cartSubtotal();
  const discount = cartDiscount();
  const total = cartTotal();
  const quantity = cartQuantity();

  selectors.cartCount.textContent = quantity;
  selectors.headerCartTotal.textContent = money.format(total);
  selectors.accountName.textContent = account.logged ? (account.name || account.username || "visitante") : "visitante";
  selectors.accountLogout.textContent = account.logged ? "Logout" : "Entrar";
  selectors.accountAdminLinks.forEach((link) => {
    link.href = account.logged && account.role === "admin" ? "admin.html" : "login.html";
  });
  selectors.subtotal.textContent = money.format(subtotal);
  selectors.total.textContent = money.format(total);
  selectors.checkoutTotal.textContent = money.format(total);
  selectors.checkoutOpen.disabled = cart.length === 0;
  const couponInput = selectors.cartSummary?.querySelector("[data-coupon-form] input");
  const couponFeedback = selectors.cartSummary?.querySelector("[data-coupon-feedback]");
  const discountRow = selectors.cartSummary?.querySelector("[data-discount-row]");
  const discountTotal = selectors.cartSummary?.querySelector("[data-discount-total]");
  if (couponInput) couponInput.value = activeCoupon;
  if (couponFeedback) couponFeedback.textContent = activeCoupon ? `Cupom ${activeCoupon} aplicado.` : "";
  if (discountRow && discountTotal) {
    discountRow.hidden = discount <= 0;
    discountTotal.textContent = `-${money.format(discount)}`;
  }

  if (!cart.length) {
    selectors.cartItems.innerHTML = '<p class="empty-cart">Seu carrinho esta vazio.</p>';
    selectors.checkoutItems.innerHTML = '<p class="empty-cart">Nenhum item selecionado.</p>';
    return;
  }

  selectors.cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item">
      <div class="cart-thumb" style="background-image: url('${itemImages(item)[0] || ''}'); background-size: cover; background-position: center;"></div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.type || item.category}</p>
        <strong>${money.format(cartItemPrice(item))}</strong>
      </div>
      <div class="quantity-control" aria-label="Quantidade de ${item.name}">
        <button type="button" data-qty-minus="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button type="button" data-qty-plus="${item.id}">+</button>
      </div>
      <button class="remove-item" type="button" data-remove="${item.id}" aria-label="Remover ${item.name}">x</button>
    </article>
  `).join("");

  selectors.checkoutItems.innerHTML = cart.map((item) => `
    <article class="review-item">
      <span>${item.quantity}x ${item.name}</span>
      <strong>${money.format(cartItemPrice(item) * item.quantity)}</strong>
    </article>
  `).join("");
}

function applyCoupon(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) {
    activeCoupon = "";
    saveCoupon();
    renderCart();
    return { ok: true, message: "" };
  }
  if (!couponRules[normalized]) {
    activeCoupon = "";
    saveCoupon();
    renderCart();
    return { ok: false, message: "Cupom inválido." };
  }
  activeCoupon = normalized;
  saveCoupon();
  renderCart();
  return { ok: true, message: `Cupom ${normalized} aplicado.` };
}

function toggleAccountMenu(force) {
  const shouldOpen = typeof force === "boolean" ? force : selectors.accountMenu.hidden;
  selectors.accountMenu.hidden = !shouldOpen;
  selectors.accountToggle.setAttribute("aria-expanded", String(shouldOpen));
}

function openCart() {
  selectors.overlay.hidden = false;
  selectors.cartDrawer.classList.add("open");
  selectors.cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  selectors.cartDrawer.classList.remove("open");
  selectors.cartDrawer.setAttribute("aria-hidden", "true");
  if (selectors.checkoutModal.hidden) {
    selectors.overlay.hidden = true;
  }
}

function openCheckout() {
  if (!cart.length) return;
  if (account.logged) {
    selectors.checkoutForm.elements.customer.value = account.name || account.username || selectors.checkoutForm.elements.customer.value;
    selectors.checkoutForm.elements.email.value = account.email || selectors.checkoutForm.elements.email.value;
  }
  selectors.overlay.hidden = false;
  selectors.checkoutModal.hidden = false;
  selectors.checkoutModal.classList.add("open");
  selectors.checkoutForm.elements.customer.focus();
}

function closeCheckout() {
  selectors.checkoutModal.classList.remove("open");
  selectors.checkoutModal.hidden = true;
  if (!selectors.cartDrawer.classList.contains("open")) {
    selectors.overlay.hidden = true;
  }
}

function updatePaymentPreview(method) {
  const content = {
    pix: '<div class="qr-placeholder">PIX</div><p>Use este espaco para exibir o QR Code e o codigo copia-e-cola do gateway.</p>',
    card: '<div class="card-placeholder">**** **** **** 0000</div><p>Campos de cartao podem ser conectados via checkout transparente do seu gateway.</p>',
    boleto: '<div class="boleto-placeholder">Boleto #BLS-2025</div><p>Depois da integracao, o cliente recebe o boleto por e-mail e pela tela do pedido.</p>',
  };

  selectors.paymentPreview.innerHTML = content[method];
}

function createOrder(event) {
  event.preventDefault();
  const data = new FormData(selectors.checkoutForm);
  const orderId = `BLS-${Date.now().toString().slice(-6)}`;
  const payment = data.get("payment");
  const orderSubtotal = cartSubtotal();
  const orderDiscount = cartDiscount();
  const orderTotal = cartTotal();
  const orderItems = cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: cartItemPrice(item),
    quantity: item.quantity,
  }));

  selectors.paymentPreview.innerHTML = `
    <div class="success-box">✓</div>
    <p><b>Pedido ${orderId}</b> criado com pagamento via ${payment.toUpperCase()}. Integre um gateway para cobranca real.</p>
  `;

  cart = [];
  saveCart();
  renderCart();
  closeCart();

  if (apiEnabled) {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        userId: account.logged ? account.id : "",
        payment,
        customer: data.get("customer"),
        email: data.get("email"),
        subtotal: orderSubtotal,
        discount: orderDiscount,
        coupon: activeCoupon,
        total: orderTotal,
        items: orderItems,
      }),
    }).catch(() => {});
  }
}

function showToast(message) {
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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("A imagem precisa ter no máximo 5MB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve({
      name: file.name,
      type: file.type || "application/octet-stream",
      dataUrl: reader.result,
    });
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.readAsDataURL(file);
  });
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
    state.page = 1;
    renderCatalog();
  });

  selectors.colorList.addEventListener("change", (event) => {
    if (!event.target.matches("[data-color]")) return;
    event.target.checked ? state.colors.add(event.target.value) : state.colors.delete(event.target.value);
    state.page = 1;
    renderCatalog();
  });

  selectors.search.addEventListener("input", () => {
    state.search = selectors.search.value.trim();
    state.page = 1;
    renderCatalog();
  });

  selectors.sort.addEventListener("change", () => {
    state.sort = selectors.sort.value;
    renderCatalog();
  });

  selectors.priceRange.addEventListener("input", () => {
    state.maxPrice = Number(selectors.priceRange.value);
    state.page = 1;
    renderCatalog();
  });

  selectors.clearFilters.addEventListener("click", () => {
    state.category = "Todas as peças";
    state.types.clear();
    state.colors.clear();
    state.search = "";
    state.sort = "recent";
    state.maxPrice = 9999;
    state.page = 1;
    selectors.search.value = "";
    selectors.sort.value = "recent";
    selectors.priceRange.value = "9999";
    renderFilters();
    renderCatalog();
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
    selectors.collectionTabs.querySelectorAll("[data-collection-category-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    renderCollections();
  });

  selectors.collectionCategory?.addEventListener("change", () => {
    state.collectionCategory = selectors.collectionCategory.value;
    renderCollections();
  });

  selectors.collectionType?.addEventListener("change", () => {
    state.collectionType = selectors.collectionType.value;
    renderCollections();
  });

  selectors.collectionColor?.addEventListener("change", () => {
    state.collectionColor = selectors.collectionColor.value;
    renderCollections();
  });

  selectors.collectionSort?.addEventListener("change", () => {
    state.collectionSort = selectors.collectionSort.value;
    renderCollections();
  });
}

if (hasContact) {
  selectors.contactMessage.addEventListener("input", () => {
    selectors.contactMessageCount.textContent = selectors.contactMessage.value.length;
  });

  selectors.contactFile.addEventListener("change", () => {
    const file = selectors.contactFile.files[0];
    selectors.contactFileLabel.textContent = file ? file.name : "Clique ou arraste arquivos para enviar";
  });

  selectors.contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = selectors.contactForm.querySelector("[type='submit']");
    const originalText = submitButton.querySelector("span")?.textContent || submitButton.textContent;
    const data = new FormData(selectors.contactForm);
    submitButton.disabled = true;
    if (submitButton.querySelector("span")) submitButton.querySelector("span").textContent = "Enviando...";

    try {
      const attachment = await fileToDataUrl(selectors.contactFile.files[0]);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          discord: data.get("discord"),
          category: data.get("category"),
          type: data.get("type"),
          message: data.get("message"),
          attachment,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Não foi possível enviar para o Discord.");
      selectors.contactForm.reset();
      selectors.contactMessageCount.textContent = "0";
      selectors.contactFileLabel.textContent = "Clique ou arraste arquivos para enviar";
    } catch (error) {
      selectors.contactFileLabel.textContent = error.message;
    } finally {
      submitButton.disabled = false;
      if (submitButton.querySelector("span")) submitButton.querySelector("span").textContent = originalText;
    }
  });
}

document.addEventListener("click", (event) => {
  const productButton = event.target.closest("[data-add-to-cart]");
  if (productButton) {
    const product = products.find((item) => item.id === productButton.dataset.addToCart);
    if (product && product.visibility !== "collection-only") addToCart(product);
    return;
  }

  const collectionButton = event.target.closest("[data-add-collection]");
  if (collectionButton) {
    const collection = collections.find((item) => item.id === collectionButton.dataset.addCollection);
    if (collection) addToCart(collectionCartItem(collection));
  }
});

selectors.cartOpen.addEventListener("click", openCart);
selectors.cartClose.addEventListener("click", closeCart);
selectors.accountToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAccountMenu();
});
selectors.accountLogout.addEventListener("click", () => {
  if (account.logged) {
    account = { logged: false, name: "visitante", username: "", email: "", role: "cliente" };
    localStorage.removeItem("blossom-user-account");
    localStorage.removeItem("blossom-admin-session");
    toggleAccountMenu(false);
    renderCart();
    return;
  }
  window.location.href = "login.html";
});
selectors.accountConfig.addEventListener("click", (event) => {
  event.preventDefault();
  toggleAccountMenu(false);
  openAccountSettings();
});
selectors.accountMenu.addEventListener("click", (event) => {
  const history = event.target.closest("[data-order-history-open]");
  if (!history) return;
  event.preventDefault();
  toggleAccountMenu(false);
  openOrderHistory();
});
selectors.checkoutOpen.addEventListener("click", openCheckout);
selectors.checkoutClose.addEventListener("click", closeCheckout);
selectors.checkoutForm.addEventListener("submit", createOrder);

selectors.overlay.addEventListener("click", () => {
  closeCheckout();
  closeCart();
});

selectors.cartItems.addEventListener("click", (event) => {
  const minus = event.target.closest("[data-qty-minus]");
  const plus = event.target.closest("[data-qty-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) updateQuantity(minus.dataset.qtyMinus, -1);
  if (plus) updateQuantity(plus.dataset.qtyPlus, 1);
  if (remove) removeFromCart(remove.dataset.remove);
});

selectors.cartSummary?.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-coupon-form]");
  if (!form) return;
  event.preventDefault();
  const result = applyCoupon(new FormData(form).get("coupon"));
  const feedback = form.querySelector("[data-coupon-feedback]");
  feedback.textContent = result.message;
  feedback.dataset.type = result.ok ? "success" : "error";
});

selectors.paymentInputs.forEach((input) => {
  input.addEventListener("change", () => updatePaymentPreview(input.value));
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  toggleAccountMenu(false);
  closeCheckout();
  closeCart();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".account")) {
    toggleAccountMenu(false);
  }
});

if (hasShop) {
  renderFilters();
  renderCatalog();
}
renderHomeSections();
renderCollections();
renderCollectionDetail();
renderCart();
loadApiStore();

