// assets/js/main.js

// Atualiza o ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll suave para secções
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
}

// Menu mobile toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");


navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");

});


// Fecha menu ao clicar em links internos
nav.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
    });
});

//

// navbar scroll
const navbar = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});




// HERO SLIDER

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slider .slide");
    let current = 0;
    const intervalTime = 5000; // 5s

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    setInterval(nextSlide, intervalTime);
});




// LOADER

window.addEventListener("load", () => {
    const loader = document.getElementById("site-loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 600); // pequeno delay para ficar elegante
});


// SCROLL REVEAL

const faders = document.querySelectorAll(".fade-section");

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(section => {
    appearOnScroll.observe(section);
});



// ================================
// SERVICE MORPH ANIMATION
// ================================

const cards = document.querySelectorAll(".service-card");
const overlay = document.querySelector(".services-overlay");

let activeExpanded = null;
let originRect = null;

cards.forEach(card => {
    const expanded = card.querySelector(".service-expanded");
    const closeBtn = card.querySelector(".service-close");

    // ABRIR
    card.addEventListener("click", (e) => {

        // evitar conflito com clique no X
        if (e.target.closest(".service-close")) return;

        activeExpanded = expanded;
        originRect = card.getBoundingClientRect();

        expanded.style.top = originRect.top + "px";
        expanded.style.left = originRect.left + "px";
        expanded.style.width = originRect.width + "px";

        expanded.classList.add("active");
        overlay.classList.add("active");

        expanded.offsetHeight;

        expanded.style.top = "50%";
        expanded.style.left = "50%";
        expanded.style.transform = "translate(-50%, -50%) scale(1)";
        expanded.style.width = "500px";
    });

    // BOTÃO X (FECHAR)
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeCard();
    });
});

// FECHAR
function closeCard() {

    if (!activeExpanded || !originRect) return;

    // força estado atual
    activeExpanded.style.transform = "translate(-50%, -50%) scale(1)";
    activeExpanded.offsetHeight;

    // anima de volta
    activeExpanded.style.top = originRect.top + "px";
    activeExpanded.style.left = originRect.left + "px";
    activeExpanded.style.width = originRect.width + "px";
    activeExpanded.style.transform = "translate(0,0) scale(1)";

    overlay.classList.remove("active");

    setTimeout(() => {
        activeExpanded.classList.remove("active");
        activeExpanded = null;
        originRect = null;
    }, 1);
}
overlay.addEventListener("click", closeCard);








// equipa
const teamCards = document.querySelectorAll(".team-card")

teamCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("open")

    })

})