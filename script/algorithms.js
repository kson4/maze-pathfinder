import { Board, ROWS, COLS } from "./board.js"
import { PriorityQueue, Cell } from "./ds.js"

const board = new Board(ROWS, COLS)
board.generate()
board.startingPosition(0, 0)
board.destinationPosition(0, 30)

const pq = new PriorityQueue()
const starting = new Cell(board.startX, board.startY, 
  manhattan(board.startX, board.startY, board.endX, board.endY), 0, 
  manhattan(board.startX, board.startY, board.endX, board.endY), -1)
pq.enqueue(starting)
const open = new Map()
const closed = new Map()
const aStarPath = []
aStar(board)

function aStar(board) {
  const cell = pq.dequeue()
  if (cell.x == board.endX && cell.y == board.endY) {
    // found solution
    backtrack(cell)
    displayPath(aStarPath)
    return
  }
  open.set((cell.x, cell.y), cell.f)
  
  let neighbors = getNeighbors(cell.x, cell.y)
  for (let i = 0; i < neighbors.length; i++) {
    const x = neighbors[i][0]
    const y = neighbors[i][1]
    const g = manhattan(x, y, starting.x, starting.y)
    const h = manhattan(x, y, board.endX, board.endY)
    const f = g + h
    const neighbor = new Cell(x, y, f, g, h, cell)
    if (open.has((x, y))) {
      if (open.get((x, y)) > f) {
        // found better path for the same node that exists in the open list
        pq.enqueue(neighbor)
      }
    }
    else if (closed.has((x, y))) {
      if (closed.get((x, y)) > f) {
        // found better path for the same node that was already traveled
        pq.enqueue(neighbor)
      }
    }
    else {
      pq.enqueue(neighbor)
    }
  }
  closed.set((cell.x, cell.y), cell.f)

  if (pq.length() == 0) {
    // no solution
    console.log("no solution")
    return
  }

  aStar(board)
}
function manhattan(startX, startY, endX, endY) {
  return Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2))
}
function getNeighbors(x, y) {
  let neighbors = []
  if (x - 1 >= 0)
    neighbors.push([x - 1, y])
  if (x + 1 < ROWS)
    neighbors.push([x + 1, y])
  if (y - 1 >= 0)
    neighbors.push([x, y - 1])
  if (y + 1 < COLS)
    neighbors.push([x, y + 1])
  return neighbors
}
function backtrack(cell) {
  if (cell.next == -1) {
    return
  }
  aStarPath.unshift([cell.x, cell.y])
  backtrack(cell.next)
}
function displayPath(aStarPath) {
  if (aStarPath.length == 0) {
    return
  }
  const cell = aStarPath.shift()
  document.querySelector(`.r${cell[0]}c${cell[1]}`).classList.add("travel")
  setTimeout(() => {
    displayPath(aStarPath)
  }, 100)
}