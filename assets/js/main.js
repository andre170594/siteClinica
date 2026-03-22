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



// LOADER

window.addEventListener("load", () => {
    const loader = document.getElementById("site-loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 600); // pequeno delay para ficar elegante
});


// SCROLL REVEAL

// SCROLL REVEAL PRO

const reveals = document.querySelectorAll(".reveal, .reveal-group");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
    });
}, {
    threshold: 0.2
});

reveals.forEach(el => observer.observe(el));




