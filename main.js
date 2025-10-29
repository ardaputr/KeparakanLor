// =====================
// Dark Mode Toggle
// =====================
const darkToggle = document.getElementById("darkToggle");
const toggleBall = document.getElementById("toggleBall");

function setDarkMode(on) {
  if (on) {
    document.body.classList.add("dark");
    toggleBall.textContent = "🌞";
  } else {
    document.body.classList.remove("dark");
    toggleBall.textContent = "🌙";
  }
}

// simpan preferensi di localStorage
darkToggle.addEventListener("click", () => {
  const currentlyDark = document.body.classList.contains("dark");
  setDarkMode(!currentlyDark);
  localStorage.setItem("prefers-dark-keparakanlor", !currentlyDark ? "1" : "0");
});

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
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =====================
// Slider Agenda
// =====================
const agendaTrack = document.getElementById("agendaTrack");
const agendaDots = document.querySelectorAll("#agendaDots .dot");
let agendaSlide = 0;

function updateAgendaSlider(index) {
  agendaSlide = index;
  const firstCard = agendaTrack.children[0];
  if (!firstCard) return;
  const cardWidth = firstCard.getBoundingClientRect().width + 24; // 24 jarak antar card
  agendaTrack.style.transform = "translateX(" + -cardWidth * index + "px)";
  agendaDots.forEach((d, i) => {
    if (i === index) {
      d.classList.add("active");
    } else {
      d.classList.remove("active");
    }
  });
}

agendaDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.getAttribute("data-slide"), 10);
    updateAgendaSlider(idx);
  });
});

// =====================
// Slider Berita
// =====================
const newsTrack = document.getElementById("newsTrack");
const newsDots = document.querySelectorAll("#newsDots .dot");
let newsSlide = 0;

function updateNewsSlider(index) {
  newsSlide = index;
  const firstNewsCard = newsTrack.children[0];
  if (!firstNewsCard) return;
  const cardWidth = firstNewsCard.getBoundingClientRect().width + 24;
  newsTrack.style.transform = "translateX(" + -cardWidth * index + "px)";
  newsDots.forEach((d, i) => {
    if (i === index) {
      d.classList.add("active");
    } else {
      d.classList.remove("active");
    }
  });
}

newsDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.getAttribute("data-slide"), 10);
    updateNewsSlider(idx);
  });
});

// =====================
// Hero arrows (placeholder)
// =====================
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

heroPrev.addEventListener("click", () => {
  console.log("Prev hero slide");
});
heroNext.addEventListener("click", () => {
  console.log("Next hero slide");
});

// =====================
// Responsif: hitung ulang lebar kartu saat resize
// =====================
window.addEventListener("resize", () => {
  updateAgendaSlider(agendaSlide);
  updateNewsSlider(newsSlide);
});

// init posisi awal
updateAgendaSlider(0);
updateNewsSlider(0);
