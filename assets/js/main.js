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
let activeCard = null;

cards.forEach(card => {

    const expanded = card.querySelector(".service-expanded");
    const closeBtn = card.querySelector(".service-close");

    card.addEventListener("click", (e) => {

        if (e.target.closest(".service-close")) return;

        activeCard = card;
        activeExpanded = expanded;

        const rect = card.getBoundingClientRect();

        // posição inicial (igual ao card)
        expanded.style.top = rect.top + "px";
        expanded.style.left = rect.left + "px";
        expanded.style.width = rect.width + "px";
        expanded.style.height = rect.height + "px";

        expanded.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            expanded.style.transition = "all 0.6s cubic-bezier(.16,.84,.44,1)";
            expanded.style.top = "50%";
            expanded.style.left = "50%";
            expanded.style.width = "700px";
            expanded.style.maxWidth = "92%";
            expanded.style.height = "auto";
            expanded.style.transform = "translate(-50%, -50%)";
        });

    });

    closeBtn.addEventListener("click", closeService);
});

overlay.addEventListener("click", closeService);

function closeService() {

    if (!activeExpanded || !activeCard) return;

    const rect = activeCard.getBoundingClientRect();

    activeExpanded.style.transition = "all 0.5s cubic-bezier(.16,.84,.44,1)";
    activeExpanded.style.top = rect.top + "px";
    activeExpanded.style.left = rect.left + "px";
    activeExpanded.style.width = rect.width + "px";
    activeExpanded.style.height = rect.height + "px";
    activeExpanded.style.transform = "none";

    overlay.classList.remove("active");
    document.body.style.overflow = "auto";

    setTimeout(() => {
        activeExpanded.classList.remove("active");
        activeExpanded.style = "";
        activeExpanded = null;
        activeCard = null;
    }, 500);
}








// equipa
const teamCards = document.querySelectorAll(".team-card")

teamCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("open")

    })

})