// script.js - handles nav, dropdown, smooth scroll, buy button, rendering fix
// Include in HTML with: <script src="script.js" defer></script>

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- NAV / HAMBURGER ---------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    const updateAria = () => {
      hamburger.setAttribute("aria-expanded", navLinks.classList.contains("active"));
    };

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      updateAria();
      // close any open dropdowns when toggling nav
      document.querySelectorAll(".dropdown.active").forEach(d => d.classList.remove("active"));
      document.querySelectorAll(".dropdown-menu.active").forEach(m => m.classList.remove("active"));
    });

    // accessibility: toggle with keyboard
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        hamburger.click();
      }
    });
  }

  /* ---------- DROPDOWN (MOBILE) ---------- */
  const dropdowns = document.querySelectorAll(".dropdown");

  const handleMobileDropdown = (dropdown) => {
    if (window.innerWidth <= 768) {
      const subMenu = dropdown.querySelector(".dropdown-menu");
      // close others before opening
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove("active");
        const sm = d.querySelector(".dropdown-menu");
        if (sm) sm.classList.remove("active");
      });
      dropdown.classList.toggle("active");
      if (subMenu) subMenu.classList.toggle("active");
    }
  };

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", (e) => {
      const link = dropdown.querySelector("a");
      if (link && link.getAttribute("href") === "#") e.preventDefault();
      handleMobileDropdown(dropdown);
    });
  });

  // Close dropdowns if resizing above mobile
  window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
      dropdowns.forEach(d => d.classList.remove('active'));
      document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
    }
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // close nav after click (mobile UX)
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- BUY BUTTON ---------- */
  const instaUrl = "https://www.instagram.com/nawwarperfume/";
  const buyButtons = document.querySelectorAll(".buy-btn");

  function showToast(msg, duration = 1800) {
    let toast = document.querySelector(".site-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "site-toast";
      Object.assign(toast.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        background: "rgba(17,17,17,0.9)",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "8px",
        zIndex: 9999,
        fontSize: "14px",
        opacity: "0",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      });
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    clearTimeout(toast._timeoutId);
    toast._timeoutId = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, duration);
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch (err) {
      console.warn("Clipboard failed:", err);
    }
  }

  buyButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const product = btn.dataset.product || btn.closest(".product-card")?.querySelector("h3")?.innerText || "product";
      const size = btn.dataset.size || "50ml";
      const price = btn.dataset.price || "258 EGP";
      const message = `Hi Nawwar, I want to buy ${product} (${size}) — ${price}.`;

      try {
        await copyToClipboard(message);
        showToast("Product info copied — opening Instagram");
      } catch {
        showToast("Opening Instagram (copy failed)");
      }

      window.open(instaUrl, "_blank", "noopener,noreferrer");
    });
  });

  /* ---------- FIX IMAGE / SECTION RENDERING ---------- */
  function fixProductRendering() {
    document.querySelectorAll(".product-card img").forEach(img => {
      if (!img.style.objectFit) {
        img.style.objectFit = "contain";
      }
    });

    document.querySelectorAll(".hero-photo, .signature-photo").forEach(img => {
      if (!img.style.objectFit) {
        img.style.objectFit = "cover";
      }
    });

    document.querySelectorAll("section").forEach(sec => {
      if (sec.offsetHeight === 0) {
        sec.style.minHeight = "50px";
      }
    });
  }

  fixProductRendering();
  window.addEventListener("resize", fixProductRendering);
  window.addEventListener("load", fixProductRendering);

});
