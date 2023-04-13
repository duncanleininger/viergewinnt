/* 
----- 1. create game
-----2. player red turn
-----3. click adds 1 of that players piece to the column
-----   piece has to be placed / moved to the lowest possible value in array
-----   then remove that value from array
   check if win() --> for loops that select 1-4, 2-5, 3-6 etc and check if player has all 4, until end of column/row, then move to next row/column
   check if win diagonally twice (top left to bottom right, top right to bottom left)
4. player yellow turn repeat
5. endgame function when game is won or turn 42
*/

const border = document.getElementById('gameborder')
let player = "RED"
let gameEnd = false
let turn
let fieldrows = 6
let fieldcolumns = 7
let deepestRow

window.onload = function() {
    createGame()
}

function createGame() {
    turn = 0
    field = []
    deepestRow = [5, 5, 5, 5, 5, 5, 5]
    player = "RED"

    for (let i=0; i<fieldrows; i++) {
        let row = []
        for (let j=0; j<fieldcolumns; j++) {
            row.push(' ')

            let hole = document.createElement("div")
            hole.classList.add("hole")
            document.getElementById("gameborder").append(hole)
            hole.addEventListener('click', placePiece)
            hole.id = i.toString() + j.toString()
        }
        field.push(row)
    }
}

function placePiece() {
    if (gameEnd == true) {
        return 
    }

    let pieceCoordinates = this.id.match(/.{1,1}/g) ?? []
    let pieceRow = parseInt(pieceCoordinates[0])
    let pieceColumn = parseInt(pieceCoordinates[1])

    pieceRow = deepestRow[pieceColumn]
    if(pieceRow<0) {
        return
    }

    field[pieceRow][pieceColumn] = player
    let hole = document.getElementById(pieceRow.toString() + pieceColumn.toString())

    if (deepestRow[pieceColumn] > -1 && gameEnd == false) {
    if (player == "RED") {
        hole.classList.add("redfill")
        deepestRow[pieceColumn]--
        turn++
        let win = checkWin()
        if (win) {
            wonGame(player)
        }
        if(turn == 42 && win == false) {
            draw = drawGame()
        }
        player = "YELLOW"
    }

    else {
        hole.classList.add("yellowfill")
        deepestRow[pieceColumn]--
        turn++
        let win = checkWin()
        if (win) {
            wonGame(player)
        }
        if(turn == 42 && win == false) {
            drawGame()
        }
        player = "RED"
    }
}
}

function checkWin() {
    for (let r=0; r<fieldrows; r++) {
        for (let c=0; c<fieldcolumns; c++) {
            if (field[r][c] != ' ') {
                if (field[r][c] == field[r][c+1] && field[r][c+1] == field[r][c+2] && field[r][c+2] == field[r][c+3]) {
                    return true
                }
            }
        }
    }

    for (let c=0; c<fieldcolumns; c++) {
        for (let r=0; r<fieldrows-3; r++) {
            if (field[r][c] != ' ') {
                if (field[r][c] == field[r+1][c] && field[r+1][c] == field[r+2][c] && field[r][c] == field[r+3][c]) {
                    return true
                }
            }
        }
    }

    for(let r=0; r<fieldrows-3; r++) {
        for(let c=0; c<fieldcolumns-3; c++) {
            if(field[r][c] != ' ') {
            if (field[r][c] == field[r+1][c+1] && field[r+1][c+1] == field[r+2][c+2] && field[r+2][c+2] == field[r+3][c+3]) {
                return true
            }
        }
    }
    }

    for(let r=3; r<fieldrows; r++) {
        for(let c=0; c<fieldcolumns-3; c++) {
            if(field[r][c] != ' ') {
            if (field[r][c] == field[r-1][c+1] && field[r-1][c+1] == field[r-2][c+2] && field[r-2][c+2] == field[r-3][c+3]) {
                return true
            }
        }
    }
    }

}

function wonGame(x) {
    gameEnd = true
    border.style.borderColor = x
    border.style['boxShadow'] = `0px 0px 200px ${x}`
}

function drawGame() {
    gameEnd = true
    border.style.borderColor = "grey"
    border.style['boxShadow'] = "0px 0px 200px grey"
}