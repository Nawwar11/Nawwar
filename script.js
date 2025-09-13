// script.js (updated & reviewed)

// Wrap in DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     NAV / HAMBURGER HANDLING
     =========================== */
  const hamburgers = Array.from(document.querySelectorAll('.hamburger'));
  const navLinks = document.querySelector('.nav-links');
  const nav = document.querySelector('nav');

  if (hamburgers.length && navLinks) {
    hamburgers.forEach(h => {
      h.setAttribute('role', 'button');
      h.setAttribute('tabindex', '0');

      h.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const expanded = navLinks.classList.contains('active');
        hamburgers.forEach(btn => btn.setAttribute('aria-expanded', expanded));
      });

      // keyboard accessibility
      h.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') h.click();
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburgers.some(h => h.contains(e.target))) {
        navLinks.classList.remove('active');
        hamburgers.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      }
    });
  }

  /* ===========================
     SMOOTH SCROLL (NAV LINKS)
     =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburgers.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      }
    });
  });

  /* ====================================
     FADE-IN: SECTIONS & PRODUCT CARDS
     ==================================== */
  const sections = Array.from(document.querySelectorAll('section'));
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  const addClass = (el, cls) => el && !el.classList.contains(cls) && el.classList.add(cls);

  if ('IntersectionObserver' in window) {
    const secObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          addClass(entry.target, 'fade-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(s => secObserver.observe(s));

    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset && entry.target.dataset.delay ? Number(entry.target.dataset.delay) : 0;
          setTimeout(() => addClass(entry.target, 'visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    productCards.forEach((card, i) => {
      card.dataset.delay = i * 80;
      cardObserver.observe(card);
    });
  } else {
    const fadeInOnScroll = () => {
      const viewportBottom = window.innerHeight;
      sections.forEach(s => {
        if (s.getBoundingClientRect().top < viewportBottom - 100) addClass(s, 'fade-in');
      });
      productCards.forEach(c => {
        if (c.getBoundingClientRect().top < viewportBottom - 100) addClass(c, 'visible');
      });
    };
    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
    fadeInOnScroll();
  }

  /* ===========================
     BUY / ADD-TO-CART HANDLING
     =========================== */
  const buyButtons = Array.from(document.querySelectorAll('.buy-btn, .btn, button.buy, button.add-to-cart'));
  let cartCount = 0;
  const cartCountElem = document.querySelector('.cart-count') || document.getElementById('cart-count');

  function showToast(msg = '', duration = 2000) {
    let toast = document.querySelector('.site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'site-toast';
      Object.assign(toast.style, {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        background: 'rgba(17,17,17,0.9)',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '8px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        zIndex: 9999,
        fontSize: '14px',
        opacity: '0',
        transition: 'opacity 300ms ease'
      });
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    window.clearTimeout(toast._timeoutId);
    toast._timeoutId = setTimeout(() => { toast.style.opacity = '0'; }, duration);
  }

  if (buyButtons.length) {
    buyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.product-card');
        let prodName = 'Product';
        let prodPrice = '';
        if (card) {
          const nameEl = card.querySelector('h3, .product-name');
          const priceEl = card.querySelector('.price, .new-price');
          prodName = nameEl ? nameEl.innerText.trim() : prodName;
          prodPrice = priceEl ? priceEl.innerText.trim() : prodPrice;
        }
        cartCount++;
        if (cartCountElem) cartCountElem.textContent = cartCount;
        showToast(`${prodName} added to cart ${prodPrice}`);
      });
    });
  }

  /* ===========================
     NAVBAR SHADOW ON SCROLL
     =========================== */
  if (nav) {
    const onNavScroll = () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onNavScroll);
    onNavScroll();
  }

  /* ===========================
     SCROLL TO TOP
     =========================== */
  const scrollBtn = document.getElementById('scrollToTop');
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 300) scrollBtn.classList.add('show');
      else scrollBtn.classList.remove('show');
    };
    window.addEventListener('scroll', toggleScrollBtn);
    toggleScrollBtn();
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});



