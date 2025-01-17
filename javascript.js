document.addEventListener('DOMContentLoaded', () => {

const cells  = Array.from(document.querySelectorAll('.cell'));
let createGameDialog = document.querySelector('.createGameDialog');
let winnerDialog = document.querySelector('.winnerDialog');



cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        gameController.playTurn(index);
    });
});

document.querySelector('.createGame').addEventListener('click', () => {
    createGameDialog.showModal();
});
document.querySelector('.newGame').addEventListener('click',() =>{
    gameBoard.reset();
    winnerDialog.close();
    createGameDialog.showModal();
})
document.querySelector('.submit').addEventListener('click', () => {
    event.preventDefault();
    let player1 = document.querySelector('#player1').value;
    let player2 = document.querySelector('#player2').value;
    console.log(player1, player2);
    gameController.init(player1, player2);
    createGameDialog.close();

    document.querySelector('.reset').addEventListener('click',() =>{
        gameBoard.reset();
        gameController.init(player1,player2);
    });
    document.querySelector('.playAgain').addEventListener('click',() =>{
        gameBoard.reset();
        gameController.init(player1,player2);
        winnerDialog.close();
    });
});

// Player Factory Function
const Player = (name, symbol) => {
    return { name, symbol };
};

// GameBoard Module (IIFE)
const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""]; // 3x3 board

    // Function to render the board (could also be tied to a UI)
    const render = function () {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    // Function to update the board
    const update = function (index, symbol) {
        if (index >= 0 && index < 9 && board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    // Function to reset the board
    const reset = function () {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    // Getter for board state
    const getBoard = function () {
        return board;
    };

    return {
        render,
        update,
        reset,
        getBoard,
    };
})();

// GameController Module (IIFE)
const gameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    // Initialize the game with two players
    const init = function (player1Name, player2Name) {
        players = [Player(player1Name, "X"), Player(player2Name, "O")];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.reset();
        gameBoard.render();
        document.querySelector('.turn').textContent = (`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].symbol})`);
    };

    // Check for a win condition
    const checkWin = function () {
        const board = gameBoard.getBoard();
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === players[currentPlayerIndex].symbol)
        );
    };

    // Play a turn
    const playTurn = function (index) {
        if (gameOver) {
            console.log("Game is over. Reset to play again.");
            return;
        }

        if (gameBoard.update(index, players[currentPlayerIndex].symbol)) {
            gameBoard.render();

            if (checkWin()) {
                gameOver = true;
                winnerDialog.showModal();
                document.querySelector('.winner').textContent = `${players[currentPlayerIndex].name} wins!`;
                return;
            }

            if (!gameBoard.getBoard().includes("")) {
                gameOver = true;
                console.log("It's a tie!");
                return;
            }

            currentPlayerIndex = 1 - currentPlayerIndex;
            document.querySelector('.turn').textContent = (`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].symbol})`);
        } else {
            console.log("Invalid move. Try again.");
        }
    };

    return {
        init,
        playTurn,
    };
})();

// Example Usage:


});