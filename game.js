let grid = [];

export const EMPTY = -1;
export const PLAYERS = [0, 1];

export const game = {
    nextPlayer(currentPlayer) {
        return 1 - currentPlayer;
    },

    initGrid(dimension) {
        grid = [];
        for (let i = 0; i < dimension * dimension; i++) {
            grid.push(-1);
        }
    },

    getGrid() {
        return grid;
    },

    changeGridValue(index, currentPlayer) {
        if (index < grid.length && index >= 0 && grid[index] == EMPTY) {
            grid[index] = PLAYERS[currentPlayer];
            return true;
        }
        return false;
    },

    refreshGrid() {
        this.initGrid(Math.floor(Math.sqrt(grid.length)));
    },

    mustRestart() {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] == EMPTY) {
                return false;
            }
        }
        return true;
    },

    youWin(currentPlayer, dimension) {
        //verficiation des colonne
        for (let i = 0; i < dimension; i++) {
            const cases = grid.filter((g, index) => index % dimension == i);
            if(this.hasSamevalue(cases, PLAYERS[currentPlayer])){
                return true;
            }
        }
        //Verification des lignes
        for (let i = 0; i < dimension; i++) {
            const cases = grid.filter((g, index) => Math.floor( index / dimension) == i);
            if(this.hasSamevalue(cases, PLAYERS[currentPlayer])){
                return true;
            }
        }
        return false;
    },

    hasSamevalue(cases, value) {
        for (let j = 0; j < cases.length; j++) {
            if (cases[j] != value) {
                return false;
            }
        }
        return true;
    }
}