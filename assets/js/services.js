// ================================
// SERVICES - HOVER (desktop) + CLICK (mobile)
// ================================

const cards = document.querySelectorAll(".service-card");
const overlay = document.querySelector(".services-overlay");

let activeCard = null;

cards.forEach(card => {

    card.addEventListener("click", (e) => {

        // só mobile
        if (window.innerWidth > 768) return;

        // evitar conflito com botão close
        if (e.target.closest(".service-close")) return;

        // fechar se já estiver aberto
        if (card.classList.contains("active")) {
            closeAll();
            return;
        }

        closeAll();

        card.classList.add("active");
        overlay.classList.add("active");
        activeCard = card;
    });

});

// fechar ao clicar fora
overlay.addEventListener("click", closeAll);

function closeAll() {
    cards.forEach(c => c.classList.remove("active"));
    overlay.classList.remove("active");
    activeCard = null;
}