// Player Factory Function
const Player = (name, symbol) => {
    return { name, symbol };
};

// GameBoard Module (IIFE)
const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""]; // 3x3 board

    // Function to render the board (could also be tied to a UI)
    const render = function () {
        console.clear();
        console.log(
            `${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}\n---------\n${board[3] || " "} | ${
                board[4] || " "
            } | ${board[5] || " "}\n---------\n${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}`
        );
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
        console.log(`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].symbol})`);
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
                console.log(`${players[currentPlayerIndex].name} wins!`);
                return;
            }

            if (!gameBoard.getBoard().includes("")) {
                gameOver = true;
                console.log("It's a tie!");
                return;
            }

            currentPlayerIndex = 1 - currentPlayerIndex;
            console.log(`${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].symbol})`);
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
gameController.init("Player 1", "Player 2");
gameController.playTurn(0); // Player 1 places 'X' at position 0
gameController.playTurn(4); // Player 2 places 'O' at position 4
gameController.playTurn(1); // Player 1 places 'X' at position 1
gameController.playTurn(8); // Player 2 places 'O' at position 8
gameController.playTurn(2); // Player 1 places 'X' at position 2 and wins
