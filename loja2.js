/* ============================================
   BLOSSOM STORE — loja2.js (Loja V2 Scripts)
   ============================================ */

// Theme toggle
(function () {
  const toggle = document.querySelector("[data-theme-toggle]");
  const body = document.body;
  if (!toggle || !body) return;

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("blossom-theme") || "light";
  body.setAttribute("data-theme", savedTheme);

  toggle.addEventListener("click", () => {
    const current = body.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    body.setAttribute("data-theme", next);
    localStorage.setItem("blossom-theme", next);
  });
})();

// Header scroll effect
(function () {
  const header = document.querySelector(".loja-v2 .site-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// Fix cart overlay for loja2.html
(function () {
  const cartOpen = document.querySelector("[data-cart-open]");
  const cartClose = document.querySelector("[data-cart-close]");
  const cartDrawer = document.querySelector("[data-cart-drawer]");
  const checkoutModal = document.querySelector("[data-checkout-modal]");
  const cartOverlay = document.querySelector(".loja-v2 .overlay[data-overlay]");

  if (!cartOpen || !cartDrawer || !cartOverlay) return;

  function openCart() {
    cartOverlay.hidden = false;
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    if (checkoutModal && checkoutModal.hidden) {
      cartOverlay.hidden = true;
    }
  }

  cartOpen.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", () => {
    closeCart();
    if (checkoutModal && !checkoutModal.hidden) {
      checkoutModal.classList.remove("open");
      checkoutModal.hidden = true;
      cartOverlay.hidden = true;
    }
  });
})();

// Refresh lazy images for dynamically added content
(function () {
  if (typeof refreshLazyImages === "function") {
    refreshLazyImages();
  }
})();
