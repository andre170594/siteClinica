// Menu mobile toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

function setMenuOpen(isOpen) {
    if (!nav) return;

    nav.classList.toggle("nav-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    if (navToggle) {
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    }
}

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        setMenuOpen(!nav.classList.contains("nav-open"));
    });
}


// Fecha menu ao clicar em links internos
if (nav) {
    nav.querySelectorAll("a[href^='#']").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuOpen(false);
        });
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && nav) {
        setMenuOpen(false);
    }
});

//

// navbar scroll
const navbar = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

