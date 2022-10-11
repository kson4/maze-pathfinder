export class PriorityQueue {
  constructor() {
    this.collection = []
  }
  enqueue(cell) {
    if (this.collection.length == 0) {
      this.collection.push(cell)
    }
    else if (this.collection[this.collection.length - 1].f < cell.f) {
      this.collection.push(cell)
    }
    else {
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i].f > cell.f) {
          this.collection.splice(i, 0, cell)
          break;
        }
      }
    }
  }
  dequeue() {
    return this.collection.shift()
  }
  peek() {
    return this.collection[0]
  }
  length() {
    return this.collection.length
  }
}

export class Cell {
  constructor(x, y, f, g, h, next) {
    this.x = x
    this.y = y
    this.f = f
    this.g = g
    this.h = h
    this.next = next
  }
}