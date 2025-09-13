// script.js (complete)

// Wrap in DOMContentLoaded to be safe if script isn't deferred
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
        // keep aria state consistent on all hamburgers
        hamburgers.forEach(btn => btn.setAttribute('aria-expanded', expanded));
      });
      // keyboard support
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
      // If href is just "#" do nothing
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return; // guard
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // close mobile nav if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburgers.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      }
    });
  });

  /* ====================================
     FADE-IN: SECTIONS & PRODUCT CARDS
     (IntersectionObserver with fallback)
     ==================================== */
  const sections = Array.from(document.querySelectorAll('section'));
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  // helper to add class safely
  const addClass = (el, cls) => el && !el.classList.contains(cls) && el.classList.add(cls);

  if ('IntersectionObserver' in window) {
    // sections observer
    const secObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          addClass(entry.target, 'fade-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(s => secObserver.observe(s));

    // product cards observer (with small stagger)
    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // optional stagger: small delay based on index if dataset provided
          const delay = entry.target.dataset && entry.target.dataset.delay ? Number(entry.target.dataset.delay) : 0;
          setTimeout(() => addClass(entry.target, 'visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    productCards.forEach((card, i) => {
      // set a small data-delay to stagger appearance (optional)
      card.dataset.delay = i * 80;
      cardObserver.observe(card);
    });
  } else {
    // fallback: basic scroll check
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
     - updates .cart-count if present
     - shows a small toast
     =========================== */
  const buyButtons = Array.from(document.querySelectorAll('.buy-btn, .btn, button.buy, button.add-to-cart'));
  let cartCount = 0;
  const cartCountElem = document.querySelector('.cart-count') || document.getElementById('cart-count');

  // create toast utility
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
    toast._timeoutId = setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }

  if (buyButtons.length) {
    buyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.product-card');
        let prodName = 'Product';
        let prodPrice = '';
        if (card) {
          const nameEl = card.querySelector('.product-name, h3, h2');
          const priceEl = card.querySelector('.new-price, .price, .price-box, .price > span:last-child');
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
    onNavScroll(); // initial check
  }

  /* ===========================
     SCROLL TO TOP (if element with id exists)
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

  /* ===========================
     OPTIONAL: PRODUCT FILTER (if you use data-filter buttons)
     =========================== */
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  if (filterButtons.length) {
    const productSections = Array.from(document.querySelectorAll('.product-section'));
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        productSections.forEach(section => {
          section.style.display = (filter === 'all' || section.id === filter) ? '' : 'none';
        });
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  /* ===========================
     DEV: optional console summary
     =========================== */
  // console.log('UI script loaded:', {
  //   hamburgersCount: hamburgers.length,
  //   navLinksPresent: !!navLinks,
  //   productCardsCount: productCards.length,
  //   buyButtonsCount: buyButtons.length
  // });

}); // DOMContentLoaded end


window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);


