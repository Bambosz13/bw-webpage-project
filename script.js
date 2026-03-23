const boardElement = document.getElementById('puzzle-board');
const moveCounterElement = document.getElementById('move-counter');
const winMessage = document.getElementById('win-message');
const changeImageBtn = document.getElementById('change-image-btn');
const resetBtn = document.getElementById('reset-btn');

const images = [
    'https://picsum.photos/id/1015/300/300', 
    'https://picsum.photos/id/1025/300/300', 
    'https://picsum.photos/id/1040/300/300'  
];
let currentImageIndex = 0;

let state = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let moves = 0;

const positions = [
    { x: '0px', y: '0px' },         
    { x: '-100px', y: '0px' },      
    { x: '-200px', y: '0px' },     
    { x: '0px', y: '-100px' },   
    { x: '-100px', y: '-100px' },  
    { x: '-200px', y: '-100px' },  
    { x: '0px', y: '-200px' },      
    { x: '-100px', y: '-200px' }    
];

function shuffleBoard() {
    for (let i = 0; i < 150; i++) {
        const emptyIndex = state.indexOf(0);
        const validMoves = getValidMoves(emptyIndex);
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        
        [state[emptyIndex], state[randomMove]] = [state[randomMove], state[emptyIndex]];
    }
    moves = 0;
    updateMoveCounter();
    winMessage.style.display = 'none';
    renderBoard();
}

function getValidMoves(emptyIndex) {
    const valid = [];
    if (emptyIndex % 3 !== 0) valid.push(emptyIndex - 1); 
    if ((emptyIndex + 1) % 3 !== 0) valid.push(emptyIndex + 1); 
    if (emptyIndex - 3 >= 0) valid.push(emptyIndex - 3); 
    if (emptyIndex + 3 < 9) valid.push(emptyIndex + 3); 
    return valid;
}

function renderBoard() {
    boardElement.innerHTML = '';
    
    state.forEach((tileNumber, index) => {
        const tile = document.createElement('div');
        
        if (tileNumber === 0) {
            tile.classList.add('puzzle-empty');
        } else {
            tile.classList.add('puzzle-tile');
            tile.style.backgroundImage = `url(${images[currentImageIndex]})`;
            tile.style.backgroundPosition = `${positions[tileNumber - 1].x} ${positions[tileNumber - 1].y}`;
            
            tile.addEventListener('click', () => handleTileClick(index));
        }
        
        boardElement.appendChild(tile);
    });
}

function handleTileClick(index) {
    const emptyIndex = state.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);
    
    if (validMoves.includes(index)) {
        // Zamiana miejsc
        [state[index], state[emptyIndex]] = [state[emptyIndex], state[index]];
        moves++;
        updateMoveCounter();
        renderBoard();
        checkWinCondition();
    }
}

function checkWinCondition() {
    const winningState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const isWin = state.every((val, index) => val === winningState[index]);
    
    if (isWin) {
        winMessage.style.display = 'block';
    }
}

function updateMoveCounter() {
    moveCounterElement.textContent = moves;
}

resetBtn.addEventListener('click', shuffleBoard);

changeImageBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    renderBoard();
});

shuffleBoard();
