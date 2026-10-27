
document.getElementById("Formulaire")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const login = document.getElementById("login").value;
        const mdp = document.getElementById("mdp").value;

        if (login === "admin" && mdp === "1234") {
            window.location.href = "films.html";
        } else {
            document.getElementById("message").textContent =
                "Login ou mot de passe incorrect.";
        }
    });