// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // toggle mobile menu
  hamburger.classList.toggle('open');  // animate hamburger icon if needed
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== FADE-IN SECTIONS ON SCROLL =====
const sections = document.querySelectorAll('section');

const fadeInOnScroll = () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add('fade-in');
    }
  });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ===== MOBILE NAVBAR HIDE/SHOW REMOVED =====
// Removed scroll hide/show for navbar to keep it non-sticky



