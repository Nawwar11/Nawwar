// Mobile menu toggle
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
faders.forEach(el => observer.observe(el));
