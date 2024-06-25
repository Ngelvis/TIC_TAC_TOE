// All Declarations
// ==========================

const X_CLASS = 'x'
const O_CLASS = 'o'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const board = document.getElementById('board')
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn = false

startGame()




// FUNCTIONS
// =====================

// Event Listeners
cellElements.forEach((cell) => {
    cell.addEventListener('click', handleClick, {once: true})
})

restartButton.addEventListener('click', startGame)




// Place Marker function
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Function to swap turns
function swapTurns() {
    circleTurn =!circleTurn
}

// Hover function
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

// Start Game Function
function startGame() {
    circleTurn = false
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

// End Game Function
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
   
}


// Check Draw Function
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}


// Check Win function
function CheckWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


// HANDLE CLICK
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS

    
    console.log(`Marked`)

   
    placeMark(cell, currentClass)
    
    
    if (CheckWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }

}




