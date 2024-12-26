const hamburger = document.getElementById("hamburger");
const menuOverlay = document.getElementById("menu-overlay");
const toggleSubmenuButtons = document.querySelectorAll(".toggle-submenu");

// Toggle menu
hamburger.addEventListener("click", () => {
  menuOverlay.classList.toggle("active");
});

// Close menu when clicking outside
menuOverlay.addEventListener("click", (event) => {
  if (event.target === menuOverlay) {
    menuOverlay.classList.remove("active");
  }
});

// Toggle submenu
toggleSubmenuButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const parentLi = event.target.closest("li");
    parentLi.classList.toggle("open");
  });
});

const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  const offset = -index * 100;
  document.querySelector(".slides").style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener("click", () => {
  currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
  showSlide(currentSlide);
});

nextButton.addEventListener("click", () => {
  currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
  showSlide(currentSlide);
});

// Auto-slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
  showSlide(currentSlide);
}, 5000);

const learnMoreButtons = document.querySelectorAll(".btn-learn-more");

learnMoreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Mencegah navigasi instan

    // Aktifkan transisi gradien
    button.classList.add("active");

    // Tunggu animasi selesai sebelum membuka halaman baru
    setTimeout(() => {
      const href = button.getAttribute("href");
      window.open(href, "_blank"); // Buka halaman baru
      button.classList.remove("active"); // Kembalikan ke keadaan semula
    }, 1000); // Waktu sesuai dengan durasi transisi
  });
});

const loginButtons = document.querySelectorAll(".btn-login");

loginButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Mencegah navigasi instan

    // Aktifkan transisi gradien
    button.classList.add("active");

    // Tunggu animasi selesai sebelum membuka halaman baru
    setTimeout(() => {
      const href = button.getAttribute("href");
      window.open(href, "_blank"); // Buka halaman baru
      button.classList.remove("active"); // Kembalikan ke keadaan semula
    }, 1000); // Waktu sesuai dengan durasi transisi
  });
});
