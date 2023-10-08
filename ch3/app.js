document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let cells = new Array(9).fill(null);
    let gameEnded = false;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Function to handle cell clicks
    function handleCellClick(index) {
        if (!gameEnded && !cells[index]) {
            cells[index] = currentPlayer;
            board.children[index].innerText = currentPlayer;
            board.children[index].classList.add("player-" + currentPlayer);
            checkForWin();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.innerText = "Player " + currentPlayer + "'s turn";
        }
    }

    // Function to check for a win or draw
    function checkForWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                board.children[a].classList.add("winner");
                board.children[b].classList.add("winner");
                board.children[c].classList.add("winner");
                status.innerText = "Player " + currentPlayer + " wins!";
                gameEnded = true;
                return;
            }
        }

        if (!cells.includes(null)) {
            status.innerText = "It's a draw!";
            gameEnded = true;
            board.classList.add("draw");
        }
    }

    // Reset the game
    resetButton.addEventListener("click", () => {
        cells = new Array(9).fill(null);
        gameEnded = false;
        board.classList.remove("draw");
        status.innerText = "Player X's turn";
        board.childNodes.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("winner", "player-X", "player-O");
        });
    });
});
