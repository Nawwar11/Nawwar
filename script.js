// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
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

// ===== Buy Now Button Redirect to Instagram DM =====
const instaLink = "https://www.instagram.com/nawwarperfume/";

const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const message = encodeURIComponent(`Hi, I'm interested in buying: ${productName}`);
    const url = `https://www.instagram.com/direct/new/?text=${message}`;
    window.open(url, '_blank'); // opens new tab with prefilled message
  });
});
