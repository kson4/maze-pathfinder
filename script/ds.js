export class PriorityQueue {
  constructor() {
    this.collection = [];
  }
  enqueue(cell) {
    if (this.collection.length == 0) {
      this.collection.push(cell);
    } else {
      let placed = false;
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i].f == cell.f && this.collection[i].h > cell.h) {
          this.collection.splice(i, 0, cell);
          placed = true;
          break;
        }
        if (this.collection[i].f > cell.f) {
          this.collection.splice(i, 0, cell);
          placed = true;
          break;
        }
      }
      if (!placed) {
        this.collection.push(cell);
      }
    }
    console.log(this.collection);
    this.printAll();
  }
  dequeue() {
    return this.collection.shift();
  }
  peek() {
    return this.collection[0];
  }
  length() {
    return this.collection.length;
  }
  printAll() {
    console.log("cells in PQ:");
    for (let i = 0; i < this.collection.length; i++) {
      const cell = this.collection[i];
      console.log(cell.x, cell.y, cell.f, cell.g, cell.h);
    }
  }
  changeParent(cellX, cellY, newParent) {
    for (let i = 0; i < this.collection.length; i++) {
      const old = this.collection[i];

      if (old.x == cellX && old.y == cellY) {
        console.log("before change: ", old);
        old.next = newParent;
        old.f = newParent;
        old.g = newParent;
        old.h = newParent;
        console.log("after change: ", old);
        break;
      }
    }
  }
}

export class Cell {
  constructor(x, y, f, g, h, next) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.g = g;
    this.h = h;
    this.next = next;
  }
}
