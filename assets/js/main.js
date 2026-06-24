// assets/js/main.js

// pag no topo after refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


// Atualiza o ano no footer
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
}

// Scroll suave para secÃ§Ãµes
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
}



// LOADER

function hideSiteLoader() {
    const loader = document.getElementById("site-loader");
    if (!loader || loader.classList.contains("hidden")) return;

    loader.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(hideSiteLoader, 500);
});

window.addEventListener("load", () => {
    setTimeout(hideSiteLoader, 600);
});

setTimeout(hideSiteLoader, 2000);


// SCROLL REVEAL

// SCROLL REVEAL PRO

const reveals = document.querySelectorAll(".reveal, .reveal-group");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            // Remove para permitir animar novamente
            entry.target.classList.remove("visible");
        }

    });
}, {
    threshold: 0.3
});

reveals.forEach(el => observer.observe(el));





// THEME SWITCHER
const themeSwitcher = document.getElementById("themeSwitcher");
const themeRoot = document.documentElement;
const themeStorageKey = "clinicabemestar-theme";
const validThemes = new Set(["sea-glass", "deep-ocean", "sage-teal", "soft-sky", "sunset-clay", "midnight-rose"]);

function applyTheme(theme) {
    if (!theme || theme === "base") {
        themeRoot.removeAttribute("data-theme");
        return;
    }

    if (!validThemes.has(theme)) return;
    themeRoot.setAttribute("data-theme", theme);
}

const savedTheme = window.localStorage.getItem(themeStorageKey);
if (savedTheme && savedTheme !== "base") {
    applyTheme(savedTheme);
    if (themeSwitcher) themeSwitcher.value = savedTheme;
} else if (themeSwitcher) {
    themeSwitcher.value = "base";
}

if (themeSwitcher) {
    themeSwitcher.addEventListener("change", () => {
        const theme = themeSwitcher.value;
        applyTheme(theme);
        window.localStorage.setItem(themeStorageKey, theme);
    });
}
