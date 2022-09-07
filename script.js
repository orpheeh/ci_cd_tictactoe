import { game } from "./game.js";

const dimensions = 4;
const players = [
    {
        item: "X",
        color: "red"
    },
    {
        item: "O",
        color: "blue"
    }
]
let currentPlayer = 0;

function play(index) {
    if (!game.youWin(currentPlayer, dimensions)) {
        const playSuccess = game.changeGridValue(index, currentPlayer);
        if (playSuccess) {
            render();
            if (game.youWin(currentPlayer, dimensions)) {
                displayMessage();
                restart();
            } else if (game.mustRestart()) {
                restart();
            } else {
                next();
            }
        }
    }
}

function next() {
    currentPlayer = game.nextPlayer(currentPlayer);
    document.querySelector(".player" + (currentPlayer + 1)).classList.add("current-player");
    document.querySelector(".player" + (1 - currentPlayer + 1)).classList.remove("current-player");
}

function restart() {
    game.refreshGrid();
    render();
}

function render() {
    const grid = game.getGrid();
    const cases = document.querySelectorAll(".case");
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] < 0) {
            cases[i].innerHTML = "";
        } else {
            cases[i].innerHTML = players[grid[i]].item;
            cases[i].style.color = players[grid[i]].color;
        }
    }
}

function displayMessage() {
    document.getElementById("message").innerHTML = "Victoire de " + `<span class='win'>${players[currentPlayer].item}</span>`;
}

window.addEventListener("load", () => {
    game.initGrid(dimensions);
    const root = document.querySelector(".grid");
    root.innerHTML = "";
    for (let i = 0; i < game.getGrid().length; i++) {
        const div = document.createElement("div");
        div.classList.add("case");
        root.appendChild(div);
    }
    const cases = document.querySelectorAll(".case");
    for (let i = 0; i < cases.length; i++) {
        cases[i].addEventListener("click", (e) => {
            play(i);
        })
    }
});