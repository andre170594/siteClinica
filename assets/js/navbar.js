// Menu mobile toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");


if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
        document.body.classList.toggle("menu-open", nav.classList.contains("nav-open"));
    });
}


// Fecha menu ao clicar em links internos
if (nav) {
    nav.querySelectorAll("a[href^='#']").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav-open");
            document.body.classList.remove("menu-open");
        });
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && nav) {
        nav.classList.remove("nav-open");
        document.body.classList.remove("menu-open");
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

