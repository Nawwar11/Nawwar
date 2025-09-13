// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
// ===== Dropdown Toggle on Mobile =====
const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault(); // prevent jumping
    dropdown.classList.toggle('active');
  }
});


// ===== Fade-in Animation for Sections =====
const sections = document.querySelectorAll('section');

const observerOptions = {
  threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // animate once
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

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

productCards.forEach(card => {
  cardObserver.observe(card);
});

// ===== Instagram Buy Now Button =====
const instaPage = "https://www.instagram.com/nawwarperfume/"; // Your Instagram page
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.open(instaPage, "_blank");
  });
});

