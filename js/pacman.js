'use strict'

var PACMAN = '\n\t\t<img src="img/pacman.png">\n'
const SUPER = '🦸🏽‍♂️'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}


function movePacman(ev) {

    // TODO: use getNextLocation(), nextCell

    const nextLocation = getNextLocation(ev)

    // TODO: return if cannot move
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return

    // TODO: hitting SUPER food?
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        // renderBoard(gBoard, '.board-container')
        renderGhosts()
        setTimeout(superModeDone, 5000)
    }

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        }
        // kill the ghost
        killGhost(nextLocation)
    }
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) updateScore(1)

    // hitting cherry:
    if (nextCell === CHERRY) updateScore(10)


    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    if (gPacman.isSuper) renderCell(gPacman.location, SUPER)
    else renderCell(gPacman.location, PACMAN)

    // check if victory
    if (isVictory()) {
        console.log('victory!');
        victory()
    }
}

function getNextLocation(eventKeyboard) {

    if (gGame.isOn === false) return

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // TODO: figure out nextLocation
    var className

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            className = 'up'
            break;
        case 'ArrowDown':
            nextLocation.i++
            className = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            className = 'left'
            break;
        case 'ArrowRight':
            nextLocation.j++
            className = 'right'
            break;

        default:
            return null
    }
    PACMAN = `\n\t\t<img class="${className}" src="img/pacman.png">\n`
    return nextLocation
}

function superModeDone() {
    console.log('im weak again');
    gPacman.isSuper = false
    healGhosts()
}