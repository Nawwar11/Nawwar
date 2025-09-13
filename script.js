// ===========================
// Hamburger Menu Toggle
// ===========================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ===========================
// Fade-in Animation for Sections
// ===========================
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

// ===========================
// Fade-in Animation for Product Cards
// ===========================
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

// ===========================
// Buy Now Buttons → Instagram DM
// ===========================
const buyButtons = document.querySelectorAll('.buy-btn');
const instagramLink = 'https://www.instagram.com/nawwarperfume';

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.closest('.product-card').querySelector('h3').innerText;
    alert(`Please send a message to Nawwar with the product: ${productName}`);
    window.open(instagramLink, '_blank');
  });
});


