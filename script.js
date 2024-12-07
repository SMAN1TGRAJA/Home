// Ambil elemen menu toggle dan menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Fungsi untuk membuka/tutup menu utama
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Ambil semua tombol untuk submenu
const submenuToggles = document.querySelectorAll('.toggle-submenu');

// Fungsi untuk membuka/tutup submenu
submenuToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    const parentLi = e.target.closest('.has-submenu');
    const submenu = parentLi.querySelector('.submenu');
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  });
  
  // Menutup menu saat klik di luar
  document.addEventListener('click', function (event) {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.menu-toggle');
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // Toggle submenu
  document.querySelector('.menu-toggle').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
  });
});