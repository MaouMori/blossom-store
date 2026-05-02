const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

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
  { id: "spring-25", name: "Blossom Spring '25", label: "Coleção Primavera 2025", description: "Peças leves e estilosas para dominar as ruas.", pieces: 12, visual: "spring", badge: "Nova" },
  { id: "essentials", name: "Blossom Essentials", label: "Coleção Essentials", description: "Peças básicas com o padrão de qualidade Blossom.", pieces: 18, visual: "essentials", badge: "" },
  { id: "nightfall", name: "Blossom Nightfall", label: "Coleção Nightfall", description: "Cores escuras. Estilo pesado. Presença marcante.", pieces: 10, visual: "nightfall", badge: "" },
  { id: "luxury", name: "Blossom Luxury", label: "Coleção Luxury", description: "Detalhes premium para quem vive o topo do roleplay.", pieces: 8, visual: "luxury", badge: "" },
  { id: "sport", name: "Blossom Sport", label: "Coleção Sport", description: "Performance, conforto e estilo para qualquer missão.", pieces: 11, visual: "sport", badge: "" },
  { id: "oversized", name: "Blossom Oversized", label: "Coleção Oversized", description: "Modelagens amplas para um visual urbano e autêntico.", pieces: 14, visual: "oversized", badge: "" },
  { id: "pink-label", name: "Blossom Pink Label", label: "Coleção Pink Label", description: "A identidade rosa da Blossom. Única, forte e feminina.", pieces: 9, visual: "pink-label", badge: "" },
  { id: "collabs", name: "Blossom Collabs", label: "Coleção Collabs", description: "Parcerias especiais que viram história.", pieces: 7, visual: "collabs", badge: "" },
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

function recentValue(item) {
  return Number(item.createdAt || item.created || 0);
}

function recentItems(items, limit) {
  return [...items].sort((a, b) => recentValue(b) - recentValue(a)).slice(0, limit);
}

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
  homeProducts: document.querySelector("[data-home-products]"),
  homeCollections: document.querySelector("[data-home-collections]"),
  contactForm: document.querySelector("[data-contact-form]"),
  contactMessage: document.querySelector("[data-message]"),
  contactMessageCount: document.querySelector("[data-message-count]"),
  contactFile: document.querySelector("[data-contact-file]"),
  contactFileLabel: document.querySelector("[data-file-label]"),
};

const state = {
  category: "Todas as peças",
  types: new Set(),
  colors: new Set(),
  search: "",
  sort: "recent",
  maxPrice: 499.9,
  page: 1,
  perPage: 16,
};

let cart = loadCart();
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
    if (hasShop) {
      renderFilters();
      renderCatalog();
    }
    renderHomeSections();
    renderCollections();
  } catch {
    products = [];
    collections = [];
    renderHomeSections();
    renderCollections();
  }
}

const hasShop = Boolean(selectors.shopGrid);
const hasCollections = Boolean(selectors.collectionsGrid);
const hasHomeProducts = Boolean(selectors.homeProducts);
const hasHomeCollections = Boolean(selectors.homeCollections);
const hasContact = Boolean(selectors.contactForm);

function countBy(key) {
  return products.reduce((acc, product) => {
    acc[product[key]] = (acc[product[key]] || 0) + 1;
    return acc;
  }, {});
}

function renderFilters() {
  const categories = { "Todas as peças": products.length, ...countBy("category") };
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
  const imageStyle = product.image ? `style="background-image: linear-gradient(0deg, rgba(5,8,10,.36), rgba(5,8,10,.1)), url('${product.image}')"` : "";
  const label = String(product.type || product.category || "Peça").replace("Moletons", "Moleton").replace("Camisetas", "Camiseta").replace("Calças", "Calça");
  return `
    <article class="product-card ${compact ? "" : "shop-product"}" data-product-id="${product.id}">
      <div class="template-visual product-media ${visual} ${product.image ? "has-upload" : ""}" ${imageStyle}>
        ${product.isNew ? "<span>Novo</span>" : ""}
      </div>
      <div class="product-copy">
        <h3>${product.name}</h3>
        <p>${label}</p>
        <strong>${money.format(Number(product.price || 0))}</strong>
        <button class="add-button" type="button" aria-label="Adicionar ${product.name}" data-add-to-cart="${product.id}">${compact ? "Adicionar" : "▱"}</button>
      </div>
    </article>
  `;
}

function collectionCard(collection) {
  const imageStyle = collection.image ? `style="background-image: linear-gradient(0deg, rgba(5,8,10,.36), rgba(5,8,10,.1)), url('${collection.image}')"` : "";
  return `
    <article class="collection-card">
      <div class="template-visual collection-media ${collection.visual || "essentials"} ${collection.image ? "has-upload" : ""}" ${imageStyle}>
        ${collection.badge ? `<span>${collection.badge}</span>` : ""}
      </div>
      <div class="collection-copy">
        <h3>${collection.name}</h3>
        <a href="loja.html">Ver peças →</a>
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
    selectors.shopGrid.innerHTML = pageItems.map((product) => `
      <article class="product-card shop-product" data-product-id="${product.id}">
        <div class="template-visual product-media ${product.visual} ${product.image ? "has-upload" : ""}" ${product.image ? `style="background-image: linear-gradient(0deg, rgba(5,8,10,.36), rgba(5,8,10,.1)), url('${product.image}')"` : ""}>
          ${product.isNew ? "<span>Novo</span>" : ""}
        </div>
        <div class="product-copy">
          <h3>${product.name}</h3>
          <p>${product.type.replace("Moletons", "Moleton").replace("Camisetas", "Camiseta").replace("Calças", "Calça")}</p>
          <strong>${money.format(product.price)}</strong>
          <button class="add-button" type="button" aria-label="Adicionar ${product.name}" data-add-to-cart="${product.id}">▱</button>
        </div>
      </article>
    `).join("");
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  selectors.pagination.innerHTML = `
    <button type="button" data-page-prev ${state.page === 1 ? "disabled" : ""}>‹</button>
    ${pages.map((page) => `
      <button class="${page === state.page ? "active" : ""}" type="button" data-page="${page}">${page}</button>
    `).join("")}
    <button type="button" data-page-next ${state.page === totalPages ? "disabled" : ""}>›</button>
  `;
}

function renderHomeSections() {
  if (hasHomeProducts) {
    selectors.homeProducts.innerHTML = recentItems(products, 6).map((product) => productCard(product, true)).join("")
      || '<p class="empty-products">Nenhuma peça cadastrada ainda.</p>';
  }

  if (hasHomeCollections) {
    selectors.homeCollections.innerHTML = recentItems(collections, 4).map(collectionCard).join("")
      || '<p class="empty-products">Nenhuma coleção cadastrada ainda.</p>';
  }
}

function renderCollections() {
  if (!hasCollections) return;

  selectors.collectionsGrid.innerHTML = collections.map((collection) => `
    <article>
      <div class="template-visual collection-preview ${collection.visual || "essentials"} ${collection.image ? "has-upload" : ""}" ${collection.image ? `style="background-image: linear-gradient(0deg, rgba(5,8,10,.36), rgba(5,8,10,.1)), url('${collection.image}')"` : ""}>
        ${collection.badge ? `<span>${collection.badge}</span>` : ""}
      </div>
      <div>
        <h2>${collection.name}</h2>
        <b>${collection.label}</b>
        <p>${collection.description}</p>
        <footer><span>${String(collection.pieces).padStart(2, "0")} peças</span><a href="loja.html">Ver coleção →</a></footer>
      </div>
    </article>
  `).join("");
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

function loadAccount() {
  try {
    return JSON.parse(localStorage.getItem("blossom-user-account")) || { logged: false, name: "visitante" };
  } catch {
    return { logged: false, name: "visitante" };
  }
}

function saveAccount() {
  localStorage.setItem("blossom-user-account", JSON.stringify(account));
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
  showToast(`${product.name} adicionado ao carrinho.`);
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
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function cartQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
  const total = cartTotal();
  const quantity = cartQuantity();

  selectors.cartCount.textContent = quantity;
  selectors.headerCartTotal.textContent = money.format(total);
  selectors.accountName.textContent = account.logged ? account.name : "visitante";
  selectors.accountLogout.textContent = account.logged ? "↪ Logout" : "↩ Entrar";
  selectors.subtotal.textContent = money.format(total);
  selectors.total.textContent = money.format(total);
  selectors.checkoutTotal.textContent = money.format(total);
  selectors.checkoutOpen.disabled = cart.length === 0;

  if (!cart.length) {
    selectors.cartItems.innerHTML = '<p class="empty-cart">Seu carrinho esta vazio.</p>';
    selectors.checkoutItems.innerHTML = '<p class="empty-cart">Nenhum item selecionado.</p>';
    return;
  }

  selectors.cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item">
      <div class="cart-thumb"></div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.type || item.category}</p>
        <strong>${money.format(item.price)}</strong>
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
      <strong>${money.format(item.price * item.quantity)}</strong>
    </article>
  `).join("");
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
  const orderTotal = cartTotal();
  const orderItems = cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  showToast(`Pedido ${orderId} criado em modo demonstracao.`);
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
      body: JSON.stringify({ orderId, payment, customer: data.get("customer"), email: data.get("email"), total: orderTotal, items: orderItems }),
    }).catch(() => {});
  }
}

function showToast(message) {
  return message;
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
    state.maxPrice = 499.9;
    state.page = 1;
    selectors.search.value = "";
    selectors.sort.value = "recent";
    selectors.priceRange.value = "499.9";
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

if (hasContact) {
  selectors.contactMessage.addEventListener("input", () => {
    selectors.contactMessageCount.textContent = selectors.contactMessage.value.length;
  });

  selectors.contactFile.addEventListener("change", () => {
    const file = selectors.contactFile.files[0];
    selectors.contactFileLabel.textContent = file ? file.name : "Clique ou arraste arquivos para enviar";
  });

  selectors.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ticket = `BLS-CNT-${Date.now().toString().slice(-5)}`;
    showToast(`Mensagem recebida! Protocolo ${ticket}.`);
    selectors.contactForm.reset();
    selectors.contactMessageCount.textContent = "0";
    selectors.contactFileLabel.textContent = "Clique ou arraste arquivos para enviar";
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.addToCart);
  if (product) addToCart(product);
});

selectors.cartOpen.addEventListener("click", openCart);
selectors.cartClose.addEventListener("click", closeCart);
selectors.accountToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAccountMenu();
});
selectors.accountLogout.addEventListener("click", () => {
  if (account.logged) {
    account = { logged: false, name: "visitante" };
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
  window.location.href = "login.html";
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
renderCart();
loadApiStore();
