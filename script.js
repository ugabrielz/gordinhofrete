const loader = document.getElementById("loader");
const loaderVan = document.getElementById("loaderVan");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const parallaxCard = document.querySelector(".parallax-card");
const parallaxImage = document.querySelector("[data-parallax]");
const year = document.getElementById("year");

let lastScroll = 0;
let ticking = false;

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loaderVan) {
      loaderVan.classList.add("is-leaving");
    }
  }, 1750);

  setTimeout(() => {
    if (loader) {
      loader.classList.add("is-hidden");
    }
  }, 2400);

  setTimeout(() => {
    if (loader) {
      loader.style.display = "none";
    }
  }, 3000);
});

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function onScroll() {
  const currentScroll = window.scrollY;

  navbar.classList.toggle("is-scrolled", currentScroll > 50);

  if (!document.body.classList.contains("menu-open")) {
    if (currentScroll > lastScroll && currentScroll > 180) {
      navbar.classList.add("is-hidden");
    } else {
      navbar.classList.remove("is-hidden");
    }
  }

  if (parallaxCard && window.innerWidth > 900) {
    const y = Math.min(currentScroll * 0.045, 28);
    parallaxCard.style.transform = `translateY(${y}px) rotate(2.5deg)`;
  }

  if (parallaxImage) {
    const rect = parallaxImage.parentElement.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = (viewport - rect.top) / (viewport + rect.height);
    const offset = (progress - 0.5) * 80;
    parallaxImage.style.transform = `translateY(${offset}px) scale(1.08)`;
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true }
);

onScroll();
