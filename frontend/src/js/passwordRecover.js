const form = document.getElementById("recoverForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.href = "password-recover-success.html";
});