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
    toggleBall.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove("dark");
    toggleBall.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// simpan preferensi di localStorage
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const currentlyDark = document.body.classList.contains("dark");
    setDarkMode(!currentlyDark);
    localStorage.setItem(
      "prefers-dark-keparakanlor",
      !currentlyDark ? "1" : "0"
    );
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
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navbar.classList.toggle("menu-open");

    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  document.querySelectorAll(".nav-links-wrapper a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navbar.classList.remove("menu-open");
        menuToggle.querySelector("i").classList.remove("fa-times");
        menuToggle.querySelector("i").classList.add("fa-bars");
      }
    });
  });
}

// =====================================================
// DROPDOWN NAVBAR (CLICK TOGGLE)
// =====================================================
// ambil semua .dropdown di navbar
const dropdowns = document.querySelectorAll(".navbar .dropdown");

function closeAllDropdowns(except = null) {
  dropdowns.forEach((dd) => {
    if (dd !== except) {
      dd.classList.remove("open");
    }
  });
}

dropdowns.forEach((dropdown) => {
  const toggleBtn = dropdown.querySelector(".dropdown-toggle-btn");
  if (!toggleBtn) return;

  // klik di judul dropdown
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // biar nggak ketutup langsung
    const isOpen = dropdown.classList.contains("open");
    // tutup semua dulu
    closeAllDropdowns();
    // toggle yang ini
    if (!isOpen) {
      dropdown.classList.add("open");
    } else {
      dropdown.classList.remove("open");
    }
  });

  // boleh juga dibuka pakai Enter (aksesibilitas)
  toggleBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});

// klik di luar navbar -> tutup semua dropdown
document.addEventListener("click", (e) => {
  const isInsideNavbar = e.target.closest(".navbar");
  if (!isInsideNavbar) {
    closeAllDropdowns();
  }
});

// kalau di mobile, saat menu ditutup, dropdown juga ditutup
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    if (!navLinks.classList.contains("open")) {
      // berarti baru saja ditutup
      closeAllDropdowns();
    }
  });
}

// =====================================================
// HERO SLIDER
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

  if (index >= totalHeroSlides) {
    heroSlide = 0;
  } else if (index < 0) {
    heroSlide = totalHeroSlides - 1;
  } else {
    heroSlide = index;
  }

  const offset = heroSlide * 100;
  heroTrack.style.transform = "translateX(-" + offset + "%)";

  heroDots.forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === heroSlide) {
      dot.classList.add("active");
    }
  });

  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    updateHeroSlider(heroSlide + 1);
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

if (heroPrev && heroNext) {
  heroPrev.addEventListener("click", () => {
    updateHeroSlider(heroSlide - 1);
  });
  heroNext.addEventListener("click", () => {
    updateHeroSlider(heroSlide + 1);
  });
}

if (heroDots.length) {
  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-slide"), 10);
      updateHeroSlider(idx);
    });
  });
}

// =====================================================
// SLIDER AGENDA & BERITA
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
  const cardWidth = card.getBoundingClientRect().width + 24;

  track.style.transform = "translateX(" + -cardWidth * index + "px)";

  dots.forEach((d, i) => {
    if (i === index) {
      d.classList.add("active");
    } else {
      d.classList.remove("active");
    }
  });

  if (track.id === "agendaTrack") {
    agendaSlide = index;
  } else if (track.id === "newsTrack") {
    newsSlide = index;
  }
}

function updateAgendaSlider(index) {
  updateSlider(agendaTrack, agendaDots, index);
}

function updateNewsSlider(index) {
  updateSlider(newsTrack, newsDots, index);
}

if (agendaDots.length) {
  agendaDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-slide"), 10);
      updateAgendaSlider(idx);
    });
  });
}

if (newsDots.length) {
  newsDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-slide"), 10);
      updateNewsSlider(idx);
    });
  });
}

// =====================
// Responsif: hitung ulang saat resize
// =====================
window.addEventListener("resize", () => {
  updateAgendaSlider(agendaSlide);
  updateNewsSlider(newsSlide);
});

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", () => {
  if (heroTrack) {
    updateHeroSlider(0);
    startAutoSlide();
  }

  updateAgendaSlider(0);
  updateNewsSlider(0);

  if (scrollBtn) {
    scrollBtn.style.display = "none";
    scrollBtn.style.opacity = "0";
  }
});

// ====== AGENDA MODAL (detail tanpa pindah halaman) ======
(function agendaModalInit(){
  // buat elemen modal sekali saja
  const backdrop = document.createElement('div');
  backdrop.className = 'agenda-modal-backdrop';
  backdrop.innerHTML = `
    <div class="agenda-modal" role="dialog" aria-modal="true" aria-labelledby="agendaModalTitle">
      <div class="agenda-modal-header">
        <h3 id="agendaModalTitle" class="agenda-modal-title">Detail Agenda</h3>
        <button class="agenda-modal-close" aria-label="Tutup">&times;</button>
      </div>
      <div class="agenda-modal-body">
        <div class="agenda-modal-hero"><img alt="" /></div>
        <div class="agenda-modal-content">
          <div class="agenda-modal-meta"></div>
          <div class="agenda-modal-desc"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const modal = backdrop.querySelector('.agenda-modal');
  const btnClose = backdrop.querySelector('.agenda-modal-close');
  const elImg   = backdrop.querySelector('.agenda-modal-hero img');
  const elTitle = backdrop.querySelector('#agendaModalTitle');
  const elMeta  = backdrop.querySelector('.agenda-modal-meta');
  const elDesc  = backdrop.querySelector('.agenda-modal-desc');

  function openFromCard(card){
    // Ambil data dari card
    const title = card.querySelector('.agenda-title')?.textContent?.trim() || 'Agenda';
    const img   = card.querySelector('.agenda-img img')?.getAttribute('src') || '';
    const desc  = card.querySelector('.news-desc, .agenda-body p')?.textContent?.trim() || '';
    // (opsional) tanggal/metadata kalau ada:
    const meta  = card.querySelector('.agenda-meta')?.textContent?.trim() || '';

    // Isi modal
    elTitle.textContent = title;
    elImg.src = img;
    elImg.alt = title;
    elMeta.textContent = meta;
    elDesc.textContent = desc;

    // Tampilkan
    backdrop.classList.add('open');
    // kunci scroll belakang
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // fokus untuk aksesibilitas
    btnClose.focus();
  }

  function closeModal(){
    backdrop.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Tutup: klik backdrop luar, tombol X, tekan Esc
  backdrop.addEventListener('click', (e)=>{
    if (e.target === backdrop) closeModal();
  });
  btnClose.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  // Tambahkan listener ke tiap card agenda
  const agendaCards = document.querySelectorAll('#agendaTrack .agenda-card');
  agendaCards.forEach(card=>{
    card.style.cursor = 'pointer';
    card.addEventListener('click', ()=>{
      // Hindari konflik drag pada slider: hanya buka jika bukan sedang dragging besar
      openFromCard(card);
    });
  });
})();

// ====== BERITA MODAL ======
(function newsModalInit() {
  const backdrop = document.createElement('div');
  backdrop.className = 'news-modal-backdrop';
  backdrop.innerHTML = `
    <div class="news-modal" role="dialog" aria-modal="true" aria-labelledby="newsModalTitle">
      <div class="news-modal-header">
        <h3 id="newsModalTitle" class="news-modal-title">Detail Berita</h3>
        <button class="news-modal-close" aria-label="Tutup">&times;</button>
      </div>
      <div class="news-modal-body">
        <div class="news-modal-hero"><img alt="" /></div>
        <div class="news-modal-content">
          <div class="news-modal-meta"></div>
          <div class="news-modal-desc"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const modal = backdrop.querySelector('.news-modal');
  const btnClose = backdrop.querySelector('.news-modal-close');
  const elImg = backdrop.querySelector('.news-modal-hero img');
  const elTitle = backdrop.querySelector('#newsModalTitle');
  const elMeta = backdrop.querySelector('.news-modal-meta');
  const elDesc = backdrop.querySelector('.news-modal-desc');

  function openFromCard(card) {
    const title = card.querySelector('.news-title')?.textContent?.trim() || 'Berita';
    const img = card.querySelector('.news-img img')?.getAttribute('src') || '';
    const desc = card.querySelector('.news-desc')?.textContent?.trim() || '';
    const meta = card.querySelector('.news-meta')?.textContent?.trim() || '';

    elTitle.textContent = title;
    elImg.src = img;
    elImg.alt = title;
    elMeta.textContent = meta;
    elDesc.textContent = desc;

    backdrop.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    btnClose.focus();
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  btnClose.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Tambahkan listener ke tiap card berita
  const newsCards = document.querySelectorAll('#newsTrack .news-card');
  newsCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      openFromCard(card);
    });
  });
})();
