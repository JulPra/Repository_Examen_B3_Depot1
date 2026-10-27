
const boutonReservation = document.getElementById("reservation");
const titreFilm = document.getElementById("movie-title");

boutonReservation.addEventListener("click", () => {
    const film = titreFilm.textContent.trim();

    // Identifiant unique pour cette réservation
    const reservationId = crypto.randomUUID();

    // Transmettre le film et l'identifiant à la confirmation
    const params = new URLSearchParams({
        film: film,
        id: reservationId
    });

    window.location.href = `confirmation.html?${params.toString()}`;
});
