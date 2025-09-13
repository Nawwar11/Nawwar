// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// ============================
// FADE-IN SECTIONS ON SCROLL
// ============================
const sections = document.querySelectorAll("section");

const fadeInOnScroll = () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("fade-in");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ============================
// PRODUCT FILTER (Optional)
// ============================
const filterButtons = document.querySelectorAll("[data-filter]");
const productSections = document.querySelectorAll(".product-section");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    productSections.forEach(section => {
      if (filter === "all" || section.id === filter) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// ============================
// SCROLL TO TOP BUTTON
// ============================
const scrollBtn = document.getElementById("scrollToTop");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);


