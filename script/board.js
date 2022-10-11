export const ROWS = 30
export const COLS = 50

export class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.board = document.querySelector(".board")
    this.startX = undefined
    this.startY = undefined
    this.endX = undefined
    this.endY = undefined
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
        col.addEventListener("click", () => {
          col.classList.add("wall")
        })
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
    this.endX = x
    this.endY = y
    document.querySelector(`.r${x}c${y}`).classList.add("destination")
  }
}