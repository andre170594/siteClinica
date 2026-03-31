// equipa
const cardsTeam = document.querySelectorAll('.team-card');
const teamGrid = document.querySelector('.team-grid');

let index = 0;
let interval = null;

function startAutoRotation() {
    if (!cardsTeam.length) return;

    clearInterval(interval);
    interval = setInterval(() => {
        cardsTeam.forEach(c => c.classList.remove('auto-active'));

        cardsTeam[index].classList.add('auto-active');

        index = (index + 1) % cardsTeam.length;
    }, 3000); // 3 segundos (ajusta aqui)
}

function stopAutoRotation() {
    clearInterval(interval);
    cardsTeam.forEach(c => c.classList.remove('auto-active'));
}

/* iniciar */
if (cardsTeam.length) {
    startAutoRotation();
}

/* parar quando hover */
if (teamGrid) {
    teamGrid.addEventListener('mouseenter', stopAutoRotation);

    /* voltar quando sai */
    teamGrid.addEventListener('mouseleave', startAutoRotation);
}
