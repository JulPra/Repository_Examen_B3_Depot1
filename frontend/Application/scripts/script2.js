
const boutonsReservation = document.querySelectorAll(".reservation");

// Récupérer les réservations enregistrées dans le navigateur
function recupererReservations() {
    return JSON.parse(localStorage.getItem("reservations")) || [];
}

boutonsReservation.forEach((bouton) => {
    bouton.addEventListener("click", () => {

        // Vérifier que l'utilisateur est connecté
        const login = sessionStorage.getItem("login");

        if (!login) {
            alert("Vous devez être connecté pour réserver une séance.");
            window.location.href = "index.html";
            return;
        }

        const carteFilm = bouton.closest(".movie-card");
        const titreFilm = carteFilm
            .querySelector(".movie-title")
            .textContent.trim();

        const message = carteFilm.querySelector(".message-reservation");

        // Récupérer les réservations existantes
        const reservations = recupererReservations();

        // Vérifier si l'utilisateur a déjà réservé ce film
        const dejaReserve = reservations.some((reservation) =>
            reservation.login === login &&
            reservation.film === titreFilm
        );

        if (dejaReserve) {
            message.textContent =
                "Vous avez déjà réservé cette séance.";
            return;
        }

        // Récupérer le nombre de places disponibles
        const textePlaces = carteFilm
            .querySelector(".movie-places-disponibles")
            .textContent;

        const placesDisponibles = parseInt(
            textePlaces.match(/\d+/)?.[0] ?? "0",
            10
        );

        // Vérifier la disponibilité
        if (placesDisponibles <= 0) {
            message.textContent =
                "Impossible de réserver cette séance : il n'y a plus de places disponibles.";
            return;
        }

        message.textContent = "";

        // Générer un identifiant pour la réservation
        const reservationId = crypto.randomUUID();

        // Enregistrer la réservation
        reservations.push({
            id: reservationId,
            login: login,
            film: titreFilm
        });

        localStorage.setItem(
            "reservations",
            JSON.stringify(reservations)
        );

        // Rediriger vers la confirmation
        const params = new URLSearchParams({
            film: titreFilm,
            id: reservationId
        });

        window.location.href =
            `confirmation.html?${params.toString()}`;
    });
});