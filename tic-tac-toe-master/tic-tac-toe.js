// Initialize game variables
let currentPlayer = 'X'; // Start with player X
const gameState = Array(9).fill(null); // Track the state of the game

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board > div"); // Select all squares
    const statusDiv = document.getElementById("status"); // Get the status div
    const newGameButton = document.querySelector(".btn"); // Get the New Game button

    // Style each square by adding the "square" class
    squares.forEach((square, index) => {
        square.classList.add("square");

        // Add click event listener for each square
        square.addEventListener("click", function () {
            handleSquareClick(square, index);
        });

        // Change style on mouse over
        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });

        // Reset style on mouse out
        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    });

    // Add event listener for the New Game button
    newGameButton.addEventListener("click", resetGame);
});

// Handle square click to place X or O
function handleSquareClick(square, index) {
    // Only proceed if the square is empty and the game is not won
    if (!gameState[index] && !document.getElementById("status").textContent.includes("Winner")) {
        gameState[index] = currentPlayer; // Update the game state
        square.textContent = currentPlayer; // Show the current player's symbol
        square.classList.add(currentPlayer); // Add class for styling

        // Check for a winner after each move
        if (checkWinner()) {
            const winner = currentPlayer;
            document.getElementById("status").textContent = `Congratulations! ${winner} is the Winner!`;
            document.getElementById("status").classList.add("you-won");
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true; // A winner is found
        }
    }
    return false; // No winner
}

// Function to reset the game
function resetGame() {
    // Reset the game state
    gameState.fill(null);
    const squares = document.querySelectorAll("#board > div");
    squares.forEach(square => {
        square.textContent = ''; // Clear the square
        square.classList.remove("X", "O"); // Remove X or O class
    });
    document.getElementById("status").textContent = "Move your mouse over a square and click to play an X or an O."; // Reset status message
    document.getElementById("status").classList.remove("you-won"); // Remove winner class
    currentPlayer = 'X'; // Reset to X's turn
}
