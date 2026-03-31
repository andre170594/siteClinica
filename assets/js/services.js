// ================================
// SERVICES - HOVER (desktop) + CLICK (mobile)
// ================================

(() => {
    const cards = document.querySelectorAll(".service-card");
    const overlay = document.querySelector(".services-overlay");

    let activeCard = null;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function closeAll() {
        cards.forEach((card) => card.classList.remove("active"));

        if (overlay) {
            overlay.classList.remove("active");
        }

        activeCard = null;
    }

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!isMobile()) return;

            // If any card is open, the current tap only closes it.
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

    if (overlay) {
        overlay.addEventListener("click", closeAll);
    }

    document.addEventListener("click", (event) => {
        if (!isMobile() || !activeCard) return;
        if (event.target.closest(".service-card")) return;

        closeAll();
    });

    window.addEventListener("resize", () => {
        if (!isMobile()) {
            closeAll();
        }
    });
})();
