
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Formulaire de connexion", () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <form id="Formulaire">
        <input id="login" />
        <input id="mdp" />
        <p id="message"></p>
      </form>
    `;

    // Recharge le script pour chaque test
    vi.resetModules();
    await import("../../frontend/Application/scripts/script.js");
  });

  it("affiche un message si les champs sont vides", () => {
    document
      .getElementById("Formulaire")
      .dispatchEvent(new Event("submit", {
        bubbles: true,
        cancelable: true
      }));

    expect(document.getElementById("message").textContent)
      .toBe("Veuillez renseigner un login et un mot de passe.");
  });
});
