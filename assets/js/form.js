// CONTACT FORM

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (typeof emailjs === "undefined") {
            alert("O formulário ainda não está configurado para envio. Ative-o quando tiver as credenciais do EmailJS.");
            return;
        }

        const publicKey = "PUBLIC_KEY_AQUI";
        const serviceId = "SERVICE_ID_AQUI";
        const templateId = "TEMPLATE_ID_AQUI";

        if (
            publicKey === "PUBLIC_KEY_AQUI" ||
            serviceId === "SERVICE_ID_AQUI" ||
            templateId === "TEMPLATE_ID_AQUI"
        ) {
            alert("Faltam as credenciais do EmailJS para ativar o envio do formulário.");
            return;
        }

        emailjs.init(publicKey);

        emailjs.sendForm(
            serviceId,
            templateId,
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
