'use strict'

const WALL = '⎕'
const FOOD = '・'
const EMPTY = ' '
const SUPER_FOOD = '🥦'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard


function init() {
    console.log('hello')
    hideModal()

    gGame.isOn = true
    gGame.score = 0

    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)

    gBoard = buildBoard()

    createPacman(gBoard)
    createGhosts(gBoard)
    createCherry(gBoard)

    renderBoard(gBoard, '.board-container')

    var elSpan = document.querySelector('h2 span')
    elSpan.innerText = 0
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && j === 1 ||
                i === size - 2 && j === 1 ||
                i === 1 && j === size - 2 ||
                i === size - 2 && j === size - 2) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    // DOM
    const elScore = document.querySelector('span')
    elScore.innerText = gGame.score
}

// function resetGlobals() {
//     gGame.score = 0
//     gGame.isOn = false
//     gGhosts = []
//     clearInterval(gIntervalGhosts)
//     clearInterval(gIntervalCherry)
// }

function gameOver() {
    console.log('Game Over')
    // show the modal
    // setModal(false)
    showModal('Looser')
    // TODO: reset g and intervals
    // init()
}

// function playAgain() {
//     gGame.isOn = true
//     init()
//     hideModal()
// }

// function setModal(winFlag) {
//     var elH2 = document.querySelector('.modal h2')

//     if (winFlag) elH2.innerText = 'VICTORY!'
//     else elH2.innerText = 'LOOSER!'

//     var elSpan = document.querySelector('.modal .score span')
//     elSpan.innerText = gGame.score
// }

// function showOrHideToggle() {
//     var elModal = document.querySelector('.modal')
//     elModal.classList.toggle('hidden')
// }

function showModal(txt) {
    const elH2 = document.querySelector('.modal h2')
    elH2.innerText = txt

    const elSpan = document.querySelector('.modal .score span')
    elSpan.innerText = gGame.score

    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
}

function hideModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
}

function isVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        var currRow = gBoard[i]
        if (currRow.includes(FOOD)) return false
    }
    return true
}

function victory() {
    // setModal(true)
    showModal('Victory')
    // init()
}