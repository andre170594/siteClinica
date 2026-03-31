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

        // se já existir um card aberto, qualquer toque apenas fecha
        if (activeCard) {
            closeAll();
            return;
        }

        card.classList.add("active");
        if (overlay) {
            overlay.classList.add("active");
        }
        activeCard = card;
    });

});

// fechar ao clicar fora
if (overlay) {
    overlay.addEventListener("click", closeAll);
}

document.addEventListener("click", (event) => {
    if (window.innerWidth > 768 || !activeCard) return;
    if (event.target.closest(".service-card")) return;

    closeAll();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeAll();
    }
});

function closeAll() {
    cards.forEach(c => c.classList.remove("active"));
    if (overlay) {
        overlay.classList.remove("active");
    }
    activeCard = null;
}
