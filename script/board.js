const ROWS = 30
const COLS = 50

class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.board = document.querySelector(".board")
    this.startX = undefined
    this.startY = undefined
    this.destinationX = undefined
    this.destinationY = undefined
  }
  generate() {
    for (let i = 0; i < this.rows; i++) {
      const row = document.createElement("div")
      row.classList.add(`r${i}`)
      row.classList.add("row")
      for (let j = 0; j < this.cols; j++) {
        const col = document.createElement("div")
        col.classList.add(`r${i}c${j}`)
        col.classList.add("cell")
        row.append(col)
      }
      this.board.append(row)
    }
  }
  startingPosition(x, y) {
    this.startX = x
    this.startY = y
    document.querySelector(`.r${x}c${y}`).classList.add("start")
  }
  destinationPosition(x, y) {
    this.destinationX = x
    this.destinationY = y
    document.querySelector(`.r${x}c${y}`).classList.add("destination")
  }
}

const board = new Board(ROWS, COLS)
board.generate()
board.startingPosition(0, 0)
board.destinationPosition(0, 30)