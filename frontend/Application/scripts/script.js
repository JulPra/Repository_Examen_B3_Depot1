
document.getElementById("Formulaire")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const login = document.getElementById("login").value.trim();
        const mdp = document.getElementById("mdp").value;
        const message = document.getElementById("message");

        // Vérifier que les champs sont renseignés
        if (login === "" || mdp.trim() === "") {
            message.textContent =
                "Veuillez renseigner un login et un mot de passe.";
            return;
        }

        // Vérifier les identifiants
        if (login === "admin" && mdp === "1234") {
            message.textContent = "";
            sessionStorage.setItem("login", login);
            window.location.href = "films.html";
        } else {
            message.textContent =
                "Login ou mot de passe incorrect.";
        }
    });
