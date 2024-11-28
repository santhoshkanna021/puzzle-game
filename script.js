const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');
let tiles = [];

// Initialize puzzle
function initPuzzle() {
    tiles = Array.from({ length: 15 }, (_, i) => i + 1);
    tiles.push(null); // Empty slot
    renderPuzzle();
}

// Render puzzle tiles
function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        if (tile === null) {
            tileElement.classList.add('empty');
        } else {
            tileElement.textContent = tile;
            tileElement.draggable = true;
            tileElement.addEventListener('dragstart', (e) => handleDragStart(e, index));
        }
        tileElement.addEventListener('dragover', (e) => handleDragOver(e, index));
        tileElement.addEventListener('drop', (e) => handleDrop(e, index));
        puzzleContainer.appendChild(tileElement);
    });
}

// Drag events
let draggedIndex = null;

function handleDragStart(event, index) {
    draggedIndex = index;
    event.dataTransfer.setData('text/plain', index); // Store dragged index
    event.target.classList.add('dragging');
}

function handleDragOver(event, index) {
    event.preventDefault(); // Allow dropping
    const emptyIndex = tiles.indexOf(null);
    if (isValidMove(index, emptyIndex)) {
        event.target.classList.add('valid-drop');
    }
}

function handleDrop(event, targetIndex) {
    event.preventDefault();
    const emptyIndex = tiles.indexOf(null);

    if (isValidMove(draggedIndex, emptyIndex)) {
        // Swap dragged tile with empty slot
        [tiles[draggedIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[draggedIndex]];
        renderPuzzle();
    }
}

function isValidMove(draggedIndex, emptyIndex) {
    // Check if the dragged tile is adjacent to the empty slot
    const validMoves = [
        emptyIndex - 1, // Left
        emptyIndex + 1, // Right
        emptyIndex - 4, // Up
        emptyIndex + 4, // Down
    ];
    return validMoves.includes(draggedIndex) && Math.abs(emptyIndex % 4 - draggedIndex % 4) <= 1;
}

// Shuffle tiles
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

// Event listener for shuffle button
shuffleButton.addEventListener('click', shufflePuzzle);

// Initialize on page load
initPuzzle();
