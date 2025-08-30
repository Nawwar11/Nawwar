// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

// Fade-in Sections on Scroll
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

