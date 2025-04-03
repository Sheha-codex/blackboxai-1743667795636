let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Initialize board
document.getElementById('board').innerHTML = 
    Array(9).fill().map((_, i) => 
        `<div class="cell bg-white border p-2 rounded" data-index="${i}"></div>`
    ).join('');

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Update status display
function updateStatus() {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for win/draw
function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8], [2,4,6]          // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWin(pattern);
            endGame(`Player ${board[a]} wins!`);
            return true;
        }
    }

    if (!board.includes('')) {
        endGame("It's a draw!");
        return true;
    }
    return false;
}

// Highlight winning cells
function highlightWin(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

// End game and reset UI
function endGame(message) {
    statusDisplay.textContent = message;
    gameActive = false;
}

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.dataset.index;
        if (gameActive && board[index] === '') {
            cell.textContent = currentPlayer;
            board[index] = currentPlayer;
            if (!checkWin()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus();
            }
        }
    });
});

// Reset game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    updateStatus();
});

// Initialize game
updateStatus();