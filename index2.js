/* ============================================
   BLOSSOM STORE — index2.js (Home V2 Scripts)
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
  const header = document.querySelector(".home-v2 .site-header");
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

// Lookbook carousel
(function () {
  const track = document.querySelector("[data-lookbook-track]");
  const prevBtn = document.querySelector("[data-lookbook-prev]");
  const nextBtn = document.querySelector("[data-lookbook-next]");
  if (!track) return;

  const scrollAmount = 292; // card width + gap

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
})();

// Refresh lazy images for dynamically added content
(function () {
  if (typeof refreshLazyImages === "function") {
    refreshLazyImages();
  }
})();
