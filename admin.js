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
  { id: "spring-25", name: "Blossom Spring '25", label: "Coleção Primavera 2025", description: "Peças leves e estilosas para dominar as ruas.", pieces: 12, visual: "spring", badge: "Nova" },
  { id: "essentials", name: "Blossom Essentials", label: "Coleção Essentials", description: "Peças básicas com o padrão de qualidade Blossom.", pieces: 18, visual: "essentials", badge: "" },
  { id: "nightfall", name: "Blossom Nightfall", label: "Coleção Nightfall", description: "Cores escuras. Estilo pesado. Presença marcante.", pieces: 10, visual: "nightfall", badge: "" },
  { id: "luxury", name: "Blossom Luxury", label: "Coleção Luxury", description: "Detalhes premium para quem vive o topo do roleplay.", pieces: 8, visual: "luxury", badge: "" },
  { id: "sport", name: "Blossom Sport", label: "Coleção Sport", description: "Performance, conforto e estilo para qualquer missão.", pieces: 11, visual: "sport", badge: "" },
  { id: "oversized", name: "Blossom Oversized", label: "Coleção Oversized", description: "Modelagens amplas para um visual urbano e autêntico.", pieces: 14, visual: "oversized", badge: "" },
  { id: "pink-label", name: "Blossom Pink Label", label: "Coleção Pink Label", description: "A identidade rosa da Blossom. Única, forte e feminina.", pieces: 9, visual: "pink-label", badge: "" },
  { id: "collabs", name: "Blossom Collabs", label: "Coleção Collabs", description: "Parcerias especiais que viram história.", pieces: 7, visual: "collabs", badge: "" },
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

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const apiEnabled = location.protocol.startsWith("http");

function field(form, name) {
  return form.elements.namedItem(name);
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

function toast(message) {
  return message;
}

const loginForm = $("[data-login-form]");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    if (data.get("user") === ADMIN_USER && data.get("password") === ADMIN_PASS) {
      localStorage.setItem("blossom-admin-session", "active");
      window.location.href = "admin.html";
      return;
    }
    toast("Usuário ou senha inválidos.");
  });
}

if (document.body.classList.contains("admin-body") && location.pathname.endsWith("admin.html")) {
  if (localStorage.getItem("blossom-admin-session") !== "active") {
    window.location.href = "login.html";
  }
}

let adminProducts = getData("blossom-products", productSeed);
let adminCollections = getData("blossom-collections", collectionSeed);
let adminTaxonomies = getObjectData("blossom-taxonomies", taxonomySeed);
let adminOrders = [];

async function loadApiStore() {
  if (!apiEnabled || !$("[data-product-list]")) return;
  try {
    const response = await fetch("/api/store");
    if (!response.ok) return;
    const store = await response.json();
    adminProducts = Array.isArray(store.products) && store.products.length ? store.products : adminProducts;
    adminCollections = Array.isArray(store.collections) && store.collections.length ? store.collections : adminCollections;
    adminTaxonomies = store.taxonomies && Object.keys(store.taxonomies).length ? store.taxonomies : adminTaxonomies;
    adminOrders = Array.isArray(store.orders) ? store.orders : [];
    renderAdmin();
  } catch {
    renderAdmin();
  }
}

async function saveApiStore() {
  if (!apiEnabled) return;
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

function saveProducts() {
  setData("blossom-products", adminProducts);
  return saveApiStore();
}

function saveCollections() {
  setData("blossom-collections", adminCollections);
  return saveApiStore();
}

function saveTaxonomies() {
  setData("blossom-taxonomies", adminTaxonomies);
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
      <div class="admin-thumb ${item.visual}" ${item.image ? `style="background-image:url('${item.image}')"` : ""}></div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.category} • ${item.type} • ${item.color}</p>
        <strong>${adminMoney.format(Number(item.price))}${item.isNew ? " • Novo" : ""}</strong>
      </div>
      <div>
        <button type="button" data-edit-product="${item.id}">Editar</button>
        <button type="button" data-delete-product="${item.id}">Remover</button>
      </div>
    </article>
  `).join("") || '<p class="empty-cart">Nenhum produto encontrado.</p>';

  collectionList.innerHTML = adminCollections.map((item) => `
    <article class="admin-row">
      <div class="admin-thumb ${item.visual}" ${item.image ? `style="background-image:url('${item.image}')"` : ""}></div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.label}</p>
        <strong>${item.pieces} peças${item.badge ? ` • ${item.badge}` : ""}</strong>
      </div>
      <div>
        <button type="button" data-edit-collection="${item.id}">Editar</button>
        <button type="button" data-delete-collection="${item.id}">Remover</button>
      </div>
    </article>
  `).join("") || '<p class="empty-cart">Nenhuma coleção cadastrada.</p>';

  renderTaxonomies();
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
  form.dataset.currentImage = product?.image || "";
  $("[data-product-image-note]").textContent = product?.image ? "Imagem atual salva. Envie outra para substituir." : "Nenhuma imagem anexada.";
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
  field(form, "badge").value = collection?.badge || "";
  form.dataset.currentImage = collection?.image || "";
  $("[data-collection-image-note]").textContent = collection?.image ? "Imagem atual salva. Envie outra para substituir." : "Nenhuma imagem anexada.";
  dialog.showModal();
}

$("[data-new-product]")?.addEventListener("click", () => openProductForm());
$("[data-new-collection]")?.addEventListener("click", () => openCollectionForm());
$("[data-admin-product-search]")?.addEventListener("input", renderAdmin);

$("[data-product-form] input[name='image']")?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  $("[data-product-image-note]").textContent = file
    ? `${file.name} selecionada. A imagem será otimizada ao salvar.`
    : "Nenhuma imagem anexada.";
});

$("[data-collection-form] input[name='image']")?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  $("[data-collection-image-note]").textContent = file
    ? `${file.name} selecionada. A imagem será otimizada ao salvar.`
    : "Nenhuma imagem anexada.";
});

document.addEventListener("click", (event) => {
  const editProduct = event.target.closest("[data-edit-product]");
  const deleteProduct = event.target.closest("[data-delete-product]");
  const editCollection = event.target.closest("[data-edit-collection]");
  const deleteCollection = event.target.closest("[data-delete-collection]");
  const closeDialog = event.target.closest("[data-close-dialog]");

  if (editProduct) openProductForm(adminProducts.find((item) => item.id === editProduct.dataset.editProduct));
  if (editCollection) openCollectionForm(adminCollections.find((item) => item.id === editCollection.dataset.editCollection));

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

$("[data-product-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("[type='submit']");
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Salvando...";
  const id = data.get("id") || slugify(data.get("name"));
  let image = form.dataset.currentImage || "";
  try {
    image = await fileToDataUrl(field(form, "image").files[0]) || image;
  } catch (error) {
    $("[data-product-image-note]").textContent = error.message;
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
    price: Number(data.get("price")),
    visual: data.get("visual"),
    image,
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
  let image = form.dataset.currentImage || "";
  try {
    image = await fileToDataUrl(field(form, "image").files[0]) || image;
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
    pieces: Number(data.get("pieces")),
    visual: data.get("visual"),
    badge: data.get("badge"),
    image,
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

$("[data-reset-data]")?.addEventListener("click", () => {
  adminProducts = productSeed;
  adminCollections = collectionSeed;
  adminTaxonomies = taxonomySeed;
  saveProducts().catch((error) => console.warn(error));
  saveCollections().catch((error) => console.warn(error));
  saveTaxonomies().catch((error) => console.warn(error));
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
  localStorage.removeItem("blossom-admin-session");
  window.location.href = "login.html";
});

renderAdmin();
loadApiStore();
