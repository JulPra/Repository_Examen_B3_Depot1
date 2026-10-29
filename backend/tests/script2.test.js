
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Réservation de films", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    document.body.innerHTML = `
      <div class="movie-card">
        <h2 class="movie-title">Film test</h2>
        <p class="movie-places-disponibles">10 places disponibles</p>
        <p class="message-reservation"></p>
        <button class="reservation">Réserver</button>
      </div>
    `;
  });

  it("refuse une réservation si le film est déjà réservé", async () => {
    sessionStorage.setItem("login", "alice");

    localStorage.setItem("reservations", JSON.stringify([
      { id: "123", login: "alice", film: "Film test" }
    ]));

    vi.resetModules();
    await import("../../frontend/Application/scripts/script2.js");

    document.querySelector(".reservation").click();

    expect(document.querySelector(".message-reservation").textContent)
      .toBe("Vous avez déjà réservé cette séance.");

    expect(JSON.parse(localStorage.getItem("reservations"))).toHaveLength(1);
  });

  it("refuse une réservation si le film est complet", async () => {
    sessionStorage.setItem("login", "alice");

    document.querySelector(".movie-places-disponibles").textContent =
      "0 place disponible";

    vi.resetModules();
    await import("../../frontend/Application/scripts/script2.js");

    document.querySelector(".reservation").click();

    expect(document.querySelector(".message-reservation").textContent)
      .toBe("Impossible de réserver cette séance : il n'y a plus de places disponibles.");

    expect(localStorage.getItem("reservations")).toBeNull();
  });
});
