const form = document.getElementById("recoverForm"); //Encontra o formulário pelo ID

form.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.href = "password-recover-success.html"; //Redireciona para nova página
});