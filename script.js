const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');
let tiles = [];

// Initialize the puzzle
function initPuzzle() {
    tiles = Array.from({ length: 15 }, (_, i) => i + 1);
    tiles.push(null); // Add an empty slot
    renderPuzzle();
}

// Render the puzzle tiles
function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        if (tile === null) {
            tileElement.classList.add('empty');
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener('click', () => handleTileClick(index));
        }
        puzzleContainer.appendChild(tileElement);
    });
}

// Handle tile click
function handleTileClick(index) {
    const emptyIndex = tiles.indexOf(null);

    if (isValidMove(index, emptyIndex)) {
        // Swap the clicked tile with the empty slot
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        renderPuzzle();
    }
}

// Check if a move is valid
function isValidMove(clickedIndex, emptyIndex) {
    // Check if the clicked tile is adjacent to the empty slot
    const validMoves = [
        emptyIndex - 1, // Left
        emptyIndex + 1, // Right
        emptyIndex - 4, // Up
        emptyIndex + 4, // Down
    ];
    return validMoves.includes(clickedIndex) && Math.abs(emptyIndex % 4 - clickedIndex % 4) <= 1;
}

// Shuffle the puzzle tiles
function shufflePuzzle() {
    for (let i = 0; i < 100; i++) {
        const emptyIndex = tiles.indexOf(null);
        const randomIndex = emptyIndex + [1, -1, 4, -4][Math.floor(Math.random() * 4)];
        if (randomIndex >= 0 && randomIndex < 16 && isValidMove(randomIndex, emptyIndex)) {
            [tiles[randomIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[randomIndex]];
        }
    }
    renderPuzzle();
}

// Event listener for the shuffle button
shuffleButton.addEventListener('click', shufflePuzzle);

// Initialize the puzzle on page load
initPuzzle();
