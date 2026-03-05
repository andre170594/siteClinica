// CONTACT FORM

document.addEventListener("DOMContentLoaded", () => {

    emailjs.init("PUBLIC_KEY_AQUI");

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        emailjs.sendForm(
            "SERVICE_ID_AQUI",
            "TEMPLATE_ID_AQUI",
            this
        ).then(() => {
            alert("Mensagem enviada com sucesso!");
            form.reset();
        }, (error) => {
            alert("Erro ao enviar. Tente novamente.");
            console.error(error);
        });
    });

});