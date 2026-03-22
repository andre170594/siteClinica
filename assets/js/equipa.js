// equipa
const cardsTeam = document.querySelectorAll('.team-card');

let index = 0;
let interval = null;

function startAutoRotation() {
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
startAutoRotation();

/* parar quando hover */
document.querySelector('.team-grid').addEventListener('mouseenter', stopAutoRotation);

/* voltar quando sai */
document.querySelector('.team-grid').addEventListener('mouseleave', startAutoRotation);