// script.js - full behavior (hamburger, dropdown mobile, smooth scroll, observers, buy button)
// Keep this file as "script.js" and included with defer in your HTML.

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAV / HAMBURGER ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    });
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') hamburger.click();
    });
  }

  /* ---------- DROPDOWN MOBILE TOGGLE ---------- */
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
        const sub = dropdown.querySelector('.dropdown-menu');
        if (sub) sub.classList.toggle('active');
      }
    });
  });

  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  const navAnchors = Array.from(document.querySelectorAll('nav .nav-links a'));
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
      }
    });
  });

  /* ---------- INTERSECTION OBSERVERS: SECTIONS + CARDS ---------- */
  const sections = Array.from(document.querySelectorAll('section'));
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  function revealSection(sec) {
    sec.classList.add('fade-in');
  }
  function revealCard(card, delay = 80) {
    setTimeout(() => card.classList.add('visible'), delay);
  }

  if ('IntersectionObserver' in window) {
    const secObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealSection(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(s => secObserver.observe(s));

    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset && entry.target.dataset.delay ? Number(entry.target.dataset.delay) : 80;
          revealCard(entry.target, delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    productCards.forEach((card, i) => {
      card.dataset.delay = i * 60;
      cardObserver.observe(card);
    });
  } else {
    sections.forEach(s => revealSection(s));
    productCards.forEach(c => revealCard(c));
  }

  /* ---------- BUY BUTTON: copy product info + open Instagram ---------- */
  const instaUrl = "https://www.instagram.com/nawwarperfume/";
  const buyButtons = Array.from(document.querySelectorAll('.buy-btn'));

  function showToast(msg, duration = 1800) {
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
        zIndex: 99999,
        fontSize: '14px',
        opacity: '0',
        transition: 'opacity 200ms ease'
      });
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    window.clearTimeout(toast._timeoutId);
    toast._timeoutId = setTimeout(() => { toast.style.opacity = '0'; }, duration);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve();
      } catch (err) {
        document.body.removeChild(ta);
        reject(err);
      }
    });
  }

  buyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const product = btn.getAttribute('data-product') || btn.closest('.product-card')?.querySelector('h3')?.innerText || 'product';
      const message = `Hi Nawwar, I want to buy ${product} (50ml) — 258 EGP.`;
      try { await copyToClipboard(message); showToast('Product info copied — opening Instagram'); }
      catch { showToast('Opening Instagram (copy to clipboard failed)'); }
      window.open(instaUrl, '_blank', 'noopener');
    });
  });

  /* ---------- MOBILE / CHROME FIX: Ensure sections + images display properly ---------- */
  function fixProductRendering() {
    const imgs = document.querySelectorAll('.product-card img');
    imgs.forEach(img => {
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.maxHeight = 'none';
      img.style.objectFit = 'contain';
      img.style.display = 'block';
    });
    sections.forEach(sec => {
      const comp = window.getComputedStyle(sec);
      if (comp.display !== 'none' && parseFloat(comp.minHeight) === 0) {
        sec.style.minHeight = '50px';
      }
    });
  }

  // Run on load + resize + after images fully load
  fixProductRendering();
  window.addEventListener('resize', fixProductRendering);
  window.addEventListener('load', fixProductRendering);

}); // DOMContentLoaded end

