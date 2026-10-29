const params = new URLSearchParams(window.location.search);
        const film = params.get("film");
        const id = params.get("id");

        const elementFilm = document.getElementById("film");
        const elementQR = document.getElementById("qrcode");

        if (!film || !id) {
            elementFilm.textContent = "Aucun film sélectionné.";
        } else {
            elementFilm.textContent = film;

            // Récupérer les réservations déjà enregistrées
            let reservations = [];

            try {
                reservations = JSON.parse(
                    localStorage.getItem("reservations") || "[]"
                );

                if (!Array.isArray(reservations)) {
                    reservations = [];
                }
            } catch (e) {
                reservations = [];
            }

            // Éviter de créer plusieurs réservations si la page est actualisée
            let reservation = reservations.find(r => r.id === id);

            if (!reservation) {
                reservation = {
                    id: id,
                    film: film,
                    date: new Date().toLocaleString("fr-FR")
                };

                reservations.push(reservation);

                localStorage.setItem(
                    "reservations",
                    JSON.stringify(reservations)
                );
            }

            // Générer le QR code à partir des informations de réservation
            new QRCode(elementQR, {
                text: JSON.stringify({
                    id: reservation.id,
                    film: reservation.film
                }),
                width: 200,
                height: 200,
                correctLevel: QRCode.CorrectLevel.H
            });
        }