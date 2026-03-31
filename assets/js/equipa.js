// equipa
const cardsTeam = document.querySelectorAll('.team-card');
const teamGrid = document.querySelector('.team-grid');

let index = 0;
let interval = null;
let activeCard = null;
let lastPointerToggle = 0;

function isMobile() {
    return window.innerWidth <= 768;
}

function startAutoRotation() {
    if (!cardsTeam.length || isMobile()) return;

    clearInterval(interval);
    interval = setInterval(() => {
        if (activeCard) return;

        cardsTeam.forEach(c => c.classList.remove('auto-active'));

        cardsTeam[index].classList.add('auto-active');

        index = (index + 1) % cardsTeam.length;
    }, 3000); // 3 segundos (ajusta aqui)
}

function stopAutoRotation() {
    clearInterval(interval);
    cardsTeam.forEach(c => c.classList.remove('auto-active'));
}

function closeActiveCard() {
    if (!activeCard) return;

    activeCard.classList.remove('active');
    activeCard = null;
}

cardsTeam.forEach((card) => {
    const toggleCard = () => {
        if (!isMobile()) return;

        if (activeCard === card) {
            closeActiveCard();
            return;
        }

        closeActiveCard();
        card.classList.add('active');
        activeCard = card;
    };

    card.addEventListener('pointerup', (event) => {
        if (!isMobile()) return;

        event.preventDefault();
        event.stopPropagation();
        lastPointerToggle = Date.now();
        toggleCard();
    });

    card.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (Date.now() - lastPointerToggle < 500) return;

        event.preventDefault();
        event.stopPropagation();
        toggleCard();
    });
});

/* iniciar */
if (cardsTeam.length) {
    startAutoRotation();
}

/* parar quando hover */
if (teamGrid) {
    teamGrid.addEventListener('mouseenter', stopAutoRotation);

    /* voltar quando sai */
    teamGrid.addEventListener('mouseleave', () => {
        if (!activeCard) {
            startAutoRotation();
        }
    });
}

window.addEventListener('resize', () => {
    if (!isMobile()) {
        closeActiveCard();
        startAutoRotation();
        return;
    }

    stopAutoRotation();
});

document.addEventListener('click', (event) => {
    if (!isMobile() || !activeCard) return;
    if (event.target.closest('.team-card')) return;

    closeActiveCard();
});
