
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Page de confirmation", () => {
  beforeEach(() => {
    localStorage.clear();

    document.body.innerHTML = `
      <p id="film"></p>
      <div id="qrcode"></div>
    `;

    // Simuler la bibliothèque QRCode
    window.QRCode = vi.fn(function (element, options) {
      this.element = element;
      this.options = options;
    });

    window.QRCode.CorrectLevel = { H: 2 };
  });

  it("affiche un message si les paramètres sont absents", async () => {
    window.history.replaceState({}, "", "/confirmation.html");

    vi.resetModules();
    await import("../../frontend/Application/scripts/script-confirmation.js");

    expect(document.getElementById("film").textContent)
      .toBe("Aucun film sélectionné.");
  });

  it("affiche le film et génère un QR code", async () => {
    window.history.replaceState(
      {},
      "",
      "/confirmation.html?film=Film%20test&id=abc123"
    );

    vi.resetModules();
    await import("../../frontend/Application/scripts/script-confirmation.js");

    expect(document.getElementById("film").textContent)
      .toBe("Film test");

    expect(window.QRCode).toHaveBeenCalledTimes(1);

    expect(window.QRCode.mock.calls[0][1].text)
      .toContain('"film":"Film test"');
  });

  it("ne crée pas de doublon lors d'un nouvel affichage", async () => {
    localStorage.setItem("reservations", JSON.stringify([
      { id: "abc123", film: "Film test", date: "date existante" }
    ]));

    window.history.replaceState(
      {},
      "",
      "/confirmation.html?film=Film%20test&id=abc123"
    );

    vi.resetModules();
    await import("../../frontend/Application/scripts/script-confirmation.js");

    const reservations = JSON.parse(
      localStorage.getItem("reservations")
    );

    expect(reservations).toHaveLength(1);
    expect(reservations[0].date).toBe("date existante");
  });
});
