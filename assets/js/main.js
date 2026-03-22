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




