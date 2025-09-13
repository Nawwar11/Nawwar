// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ===== Dropdown Toggle on Mobile =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // prevent jump
      dropdown.classList.toggle('active');
      const subMenu = dropdown.querySelector('ul');
      if (subMenu) subMenu.classList.toggle('active');
    }
  });
});

// ===== Smooth Scroll for Nav Links =====
const navAnchors = document.querySelectorAll('nav .nav-links a');

navAnchors.forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after click
    if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
  });
});

// ===== Fade-in Animation for Sections =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));

// ===== Fade-in Animation for Product Cards =====
const productCards = document.querySelectorAll('.product-card');

const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

productCards.forEach(card => cardObserver.observe(card));

// ===== Instagram Buy Now Button =====
const instaPage = "https://www.instagram.com/nawwarperfume/";
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.open(instaPage, "_blank");
  });
});
