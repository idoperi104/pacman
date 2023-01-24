'use strict'

const CHERRY = '🍒'

var gCherry
var gIntervalCherry

function createCherry(board) {
    console.log('----');
    gCherry = {
        location: { i: 7, j: 7 },
        currCellContent: FOOD,
    }
    board[gCherry.location.i][gCherry.location.j] = CHERRY
    gIntervalCherry = setInterval(moveCherry, 5000)
}

function moveCherry() {
    var nextLocation = getRandomLocation()

    // TODO: update the model (restore prev cell contents)
    gBoard[gCherry.location.i][gCherry.location.j] = gCherry.currCellContent

    // TODO: update the DOM
    renderCell(gCherry.location, gCherry.currCellContent)

    // TODO: Move the cherry to new location:
    // TODO: update the model (save cell contents so we can restore later)
    gCherry.location = nextLocation
    // ghost.currCellContent = nextCellContent
    gBoard[gCherry.location.i][gCherry.location.j] = CHERRY

    // TODO: update the DOM
    renderCell(gCherry.location, CHERRY)

}

function getRandomLocation() {
    var locations = []
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var curCell = gBoard[i][j]
            if (curCell === FOOD || curCell === EMPTY) locations.push({ i, j })
        }
    }
    var loc = locations[getRandomIntInclusive(0, locations.length - 1)]
    console.log(loc);
    return loc
}



