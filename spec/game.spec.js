import { EMPTY, game, PLAYERS } from "../game.js";

game.initGrid(3);

describe("Initialisation de la grille", () => {
    it("la grille de dimension 3 contient 9 cases", () => {
        expect(game.getGrid().length).toBe(9);
    });
    it("Toutes les cases sont vide a l'initilisation", () => {
        const grid = game.getGrid();
        for (let i = 0; i < game.getGrid().length; i++) {
            expect(game.getGrid()[i]).toBe(EMPTY);
        }
    });
});

describe("Placer un pion", () => {
    it("Un joueur peux modifier une case de la grille avec son pions mais avec le pion de un autre joueur", () => {
        game.changeGridValue(0, 0);
        expect(game.getGrid()[0]).toBe(PLAYERS[0]);
    });

    it("Un joueur ne peux pas placer un pion sur une case non vide", () => {
        game.changeGridValue(0, 1);
        expect(game.getGrid()[0]).toBe(PLAYERS[0]);
    });
});