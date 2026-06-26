document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recoverForm"); // Encontra o formulário pelo ID

    if (!form) {
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        window.location.href = "passwordsucess.html"; // Redireciona para página de sucesso
    });
});