
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Liste des réservations", () => {
  beforeEach(() => {
    localStorage.clear();

    document.body.innerHTML = `
      <div id="liste-reservations"></div>
    `;

    window.QRCode = vi.fn();
    window.QRCode.CorrectLevel = { H: 2 };
  });

  async function chargerPage() {
    vi.resetModules();
    await import("../../frontend/Application/scripts/script-reservation.js");
  }

  it("affiche un message si aucune réservation n'existe", async () => {
    await chargerPage();

    expect(document.getElementById("liste-reservations").textContent)
      .toBe("Vous n'avez aucune réservation.");
  });

  it("affiche une réservation et génère son QR code", async () => {
    localStorage.setItem("reservations", JSON.stringify([
      {
        id: "123",
        film: "Film test",
        date: "29/10/2026"
      }
    ]));

    await chargerPage();

    expect(document.querySelector("h3").textContent)
      .toBe("Film test");

    expect(document.querySelector("p").textContent)
      .toBe("Date de réservation : 29/10/2026");

    expect(window.QRCode).toHaveBeenCalledTimes(1);
  });

  it("conserve la réservation si la suppression est annulée", async () => {
    localStorage.setItem("reservations", JSON.stringify([
      { id: "123", film: "Film test", date: "29/10/2026" }
    ]));

    vi.spyOn(window, "confirm").mockReturnValue(false);

    await chargerPage();

    document.querySelector("button").click();

    expect(JSON.parse(localStorage.getItem("reservations")))
      .toHaveLength(1);
  });

  it("supprime la réservation après confirmation", async () => {
    localStorage.setItem("reservations", JSON.stringify([
      { id: "123", film: "Film test", date: "29/10/2026" }
    ]));

    vi.spyOn(window, "confirm").mockReturnValue(true);

    await chargerPage();

    document.querySelector("button").click();

    expect(JSON.parse(localStorage.getItem("reservations")))
      .toHaveLength(0);

    expect(document.getElementById("liste-reservations").textContent)
      .toBe("Vous n'avez aucune réservation.");
  });
});
