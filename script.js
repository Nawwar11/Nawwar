// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

// ===== FADE-IN SECTIONS ON SCROLL =====
const sections = document.querySelectorAll('section');

const fadeInOnScroll = () => {
  sections.forEach(section => {
    if(section.getBoundingClientRect().top < window.innerHeight - 100){
      section.classList.add('fade-in');
    }
  });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ===== MOBILE NAVBAR HIDE/SHOW =====
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) { // mobile only
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 50) {
      nav.style.top = '-80px'; // hide navbar
    } else {
      nav.style.top = '0'; // show navbar
    }
    lastScroll = currentScroll;
  } else {
    nav.style.top = '0'; // always visible on desktop
  }
});


