// CONTACT FORM

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form) return;

    const submitButton = form.querySelector(".btn-submit");
    const fallbackEmail = "geral@clinicabemestar.pt";
    const emailConfig = {
        publicKey: "PUBLIC_KEY_AQUI",
        serviceId: "SERVICE_ID_AQUI",
        templateId: "TEMPLATE_ID_AQUI",
    };

    function setStatus(message, type = "") {
        if (!status) return;

        status.textContent = message;
        status.dataset.status = type;
    }

    function isEmailJsConfigured() {
        return (
            typeof emailjs !== "undefined" &&
            emailConfig.publicKey !== "PUBLIC_KEY_AQUI" &&
            emailConfig.serviceId !== "SERVICE_ID_AQUI" &&
            emailConfig.templateId !== "TEMPLATE_ID_AQUI"
        );
    }

    function getFormValue(name) {
        return new FormData(form).get(name)?.toString().trim() || "";
    }

    function buildMailtoUrl() {
        const nome = getFormValue("nome");
        const email = getFormValue("email");
        const telefone = getFormValue("telefone");
        const mensagem = getFormValue("mensagem");
        const subject = encodeURIComponent(`Pedido de contacto - ${nome || "Website"}`);
        const body = encodeURIComponent([
            `Nome: ${nome}`,
            `Email: ${email}`,
            `Telefone: ${telefone || "N\u00e3o indicado"}`,
            "",
            "Mensagem:",
            mensagem,
        ].join("\n"));

        return `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        setStatus("");

        if (!isEmailJsConfigured()) {
            window.location.href = buildMailtoUrl();
            setStatus("O envio autom\u00e1tico ainda n\u00e3o est\u00e1 ativo. Abrimos o email para concluir o contacto.", "info");
            return;
        }

        emailjs.init(emailConfig.publicKey);

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "A enviar...";
        }

        emailjs.sendForm(
            emailConfig.serviceId,
            emailConfig.templateId,
            this
        ).then(() => {
            setStatus("Mensagem enviada com sucesso.", "success");
            form.reset();
        }, (error) => {
            setStatus("Erro ao enviar. Tente novamente ou contacte por telefone.", "error");
            console.error(error);
        }).finally(() => {
            if (!submitButton) return;

            submitButton.disabled = false;
            submitButton.textContent = "Submeter";
        });
    });
});
