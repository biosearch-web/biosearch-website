const form = document.getElementById("recoverForm"); //Encontra o formulário pelo ID

form.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.href = "passwordsuccess.html"; //Redireciona para nova página
});