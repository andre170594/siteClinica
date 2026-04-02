(() => {
    const tabsRoot = document.getElementById("teamTabs");

    if (!tabsRoot) return;

    const tabs = Array.from(tabsRoot.querySelectorAll("[data-team-tab]"));
    const panels = Array.from(tabsRoot.querySelectorAll("[data-team-panel]"));
    const cards = Array.from(tabsRoot.querySelectorAll("[data-team-card]"));
    let hoverTimer = null;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function activateTab(target) {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.teamTab === target;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
        });

        panels.forEach((panel) => {
            const isActive = panel.dataset.teamPanel === target;
            panel.classList.toggle("is-active", isActive);
            panel.setAttribute("aria-hidden", String(!isActive));
        });
    }

    function closeCards() {
        cards.forEach((card) => card.classList.remove("is-active"));
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            closeCards();
            activateTab(tab.dataset.teamTab);
        });

        tab.addEventListener("mouseenter", () => {
            if (isMobile()) return;
            window.clearTimeout(hoverTimer);
            hoverTimer = window.setTimeout(() => {
                closeCards();
                activateTab(tab.dataset.teamTab);
            }, 180);
        });

        tab.addEventListener("mouseleave", () => {
            window.clearTimeout(hoverTimer);
        });
    });

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!isMobile()) return;

            const isActive = card.classList.contains("is-active");
            closeCards();

            if (!isActive) {
                card.classList.add("is-active");
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!isMobile()) return;
        if (event.target.closest("[data-team-card]")) return;
        if (event.target.closest("[data-team-tab]")) return;

        closeCards();
    });

    activateTab("psicologia");
})();
