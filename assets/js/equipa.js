// equipa
(() => {
    const cardsTeam = document.querySelectorAll(".team-card");
    const teamGrid = document.querySelector(".team-grid");

    let index = 0;
    let interval = null;
    let activeTeamCard = null;
    let lastPointerToggle = 0;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function startAutoRotation() {
        if (!cardsTeam.length || isMobile()) return;

        clearInterval(interval);
        interval = setInterval(() => {
            if (activeTeamCard) return;

            cardsTeam.forEach((card) => card.classList.remove("auto-active"));
            cardsTeam[index].classList.add("auto-active");
            index = (index + 1) % cardsTeam.length;
        }, 3000);
    }

    function stopAutoRotation() {
        clearInterval(interval);
        cardsTeam.forEach((card) => card.classList.remove("auto-active"));
    }

    function closeActiveCard() {
        if (!activeTeamCard) return;

        activeTeamCard.classList.remove("active");
        activeTeamCard = null;
    }

    cardsTeam.forEach((card) => {
        const toggleCard = () => {
            if (!isMobile()) return;

            if (activeTeamCard === card) {
                closeActiveCard();
                return;
            }

            closeActiveCard();
            card.classList.add("active");
            activeTeamCard = card;
        };

        card.addEventListener("pointerup", (event) => {
            if (!isMobile()) return;

            event.preventDefault();
            event.stopPropagation();
            lastPointerToggle = Date.now();
            toggleCard();
        });

        card.addEventListener("click", (event) => {
            if (!isMobile()) return;
            if (Date.now() - lastPointerToggle < 500) return;

            event.preventDefault();
            event.stopPropagation();
            toggleCard();
        });
    });

    if (cardsTeam.length) {
        startAutoRotation();
    }

    if (teamGrid) {
        teamGrid.addEventListener("mouseenter", stopAutoRotation);
        teamGrid.addEventListener("mouseleave", () => {
            if (!activeTeamCard) {
                startAutoRotation();
            }
        });
    }

    window.addEventListener("resize", () => {
        if (!isMobile()) {
            closeActiveCard();
            startAutoRotation();
            return;
        }

        stopAutoRotation();
    });

    document.addEventListener("click", (event) => {
        if (!isMobile() || !activeTeamCard) return;
        if (event.target.closest(".team-card")) return;

        closeActiveCard();
    });
})();
