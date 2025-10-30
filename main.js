// =====================================================
// main.js - Fungsionalitas Website Keparakan Lor
// =====================================================

// =====================
// Dark Mode Toggle
// =====================
const darkToggle = document.getElementById("darkToggle");
const toggleBall = document.getElementById("toggleBall");

function setDarkMode(on) {
  if (on) {
    document.body.classList.add("dark");
    toggleBall.innerHTML = '<i class="fas fa-sun"></i>'; // Ganti ikon menjadi matahari
  } else {
    document.body.classList.remove("dark");
    toggleBall.innerHTML = '<i class="fas fa-moon"></i>'; // Ganti ikon menjadi bulan
  }
}

// simpan preferensi di localStorage
if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        const currentlyDark = document.body.classList.contains("dark");
        setDarkMode(!currentlyDark);
        localStorage.setItem("prefers-dark-keparakanlor", !currentlyDark ? "1" : "0");
    });
}

// init dark mode dari storage
(function initDark() {
  const pref = localStorage.getItem("prefers-dark-keparakanlor");
  if (pref === "1") {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
})();

// =====================
// Scroll To Top Button
// =====================
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { 
            scrollBtn.style.display = "flex";
            scrollBtn.style.opacity = "1";
        } else {
            scrollBtn.style.opacity = "0";
            // Berikan sedikit delay sebelum menyembunyikan display agar transisi opacity terlihat
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollBtn.style.display = "none";
                }
            }, 300); 
        }
    });
}


// =====================
// NAVIGASI MOBILE TOGGLE (Hamburger Menu)
// =====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navbar.classList.toggle('menu-open');
        
        // Ganti ikon hamburger/close
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Ikon silang/close
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Ikon hamburger
        }
    });

    // Tutup menu saat link diklik (terutama di mobile)
    document.querySelectorAll('.nav-links-wrapper a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navbar.classList.remove('menu-open');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
}


// =====================================================
// HERO SLIDER (CAROUSEL OTOMATIS)
// =====================================================
const heroTrack = document.getElementById("heroTrack");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroDots = document.querySelectorAll("#heroDots .dot");
const totalHeroSlides = heroDots ? heroDots.length : 0;
let heroSlide = 0;
let autoSlideInterval;


function updateHeroSlider(index) {
    if (!heroTrack) return;
    
    // Hitung slide baru (melingkar/looping)
    if (index >= totalHeroSlides) {
        heroSlide = 0;
    } else if (index < 0) {
        heroSlide = totalHeroSlides - 1;
    } else {
        heroSlide = index;
    }

    // Geser track
    const offset = heroSlide * 100;
    heroTrack.style.transform = "translateX(-" + offset + "%)";

    // Perbarui dots
    heroDots.forEach((dot, i) => {
        dot.classList.remove("active");
        if (i === heroSlide) {
            dot.classList.add("active");
        }
    });
    
    // Reset interval saat ada interaksi manual
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        updateHeroSlider(heroSlide + 1);
    }, 3000); // Geser otomatis setiap 3 detik
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event Listeners Panah
if (heroPrev && heroNext) {
    heroPrev.addEventListener("click", () => {
        updateHeroSlider(heroSlide - 1);
    });
    heroNext.addEventListener("click", () => {
        updateHeroSlider(heroSlide + 1);
    });
}

// Event Listeners Dots
if (heroDots.length) {
    heroDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.getAttribute("data-slide"), 10);
            updateHeroSlider(idx);
        });
    });
}


// =====================================================
// SLIDER FUNCTIONS (Agenda dan Berita)
// =====================================================
const agendaTrack = document.getElementById("agendaTrack");
const agendaDots = document.querySelectorAll("#agendaDots .dot");
let agendaSlide = 0;
const newsTrack = document.getElementById("newsTrack");
const newsDots = document.querySelectorAll("#newsDots .dot");
let newsSlide = 0;


function updateSlider(track, dots, index) {
  if (!track || !track.children.length) return;
  
  const card = track.children[0];
  // Mengambil lebar kartu + jarak antar kartu (24px = 1.5rem)
  const cardWidth = card.getBoundingClientRect().width + 24; 
  
  track.style.transform = "translateX(" + -cardWidth * index + "px)";
  
  dots.forEach((d, i) => {
    if (i === index) {
      d.classList.add("active");
    } else {
      d.classList.remove("active");
    }
  });
  
  // Perbarui variabel slide global
  if (track.id === "agendaTrack") {
      agendaSlide = index;
  } else if (track.id === "newsTrack") {
      newsSlide = index;
  }
}

// Handler untuk Agenda Slider
function updateAgendaSlider(index) {
    updateSlider(agendaTrack, agendaDots, index);
}
// Handler untuk News Slider
function updateNewsSlider(index) {
    updateSlider(newsTrack, newsDots, index);
}


// Event Listeners untuk Dots Agenda
if (agendaDots.length) {
    agendaDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-slide"), 10);
        updateAgendaSlider(idx);
      });
    });
}

// Event Listeners untuk Dots Berita
if (newsDots.length) {
    newsDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-slide"), 10);
        updateNewsSlider(idx);
      });
    });
}


// =====================
// Responsif: hitung ulang lebar kartu saat resize
// =====================
window.addEventListener("resize", () => {
  // Hitung ulang posisi slider saat lebar layar berubah
  updateAgendaSlider(agendaSlide);
  updateNewsSlider(newsSlide);
});


// =====================
// Init Posisi Awal
// =====================
document.addEventListener('DOMContentLoaded', () => {
    // Init Hero Slider dan mulai otomatis
    if (heroTrack) {
        updateHeroSlider(0);
        startAutoSlide();
    }
    
    // Init Agenda & News Slider
    updateAgendaSlider(0);
    updateNewsSlider(0);
    
    // Init tombol scroll top
    if (scrollBtn) {
        scrollBtn.style.display = "none";
        scrollBtn.style.opacity = "0";
    }
});