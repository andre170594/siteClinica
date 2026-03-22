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

        if (e.target.closest(".service-close")) return;

        activeExpanded = expanded;
        originRect = card.getBoundingClientRect();

        // posição inicial (igual ao card)
        expanded.style.top = originRect.top + "px";
        expanded.style.left = originRect.left + "px";
        expanded.style.width = originRect.width + "px";

        expanded.classList.add("active");
        overlay.classList.add("active");

        // força reflow
        expanded.offsetHeight;

        // 👉 centro REAL do ecrã
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        expanded.style.top = centerY + "px";
        expanded.style.left = centerX + "px";

        expanded.style.transform = "translate(-50%, -50%) scale(1)";
        if (window.innerWidth <= 768) {
            expanded.style.width = "90vw";
        } else {
            expanded.style.width = "500px";
        }
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
