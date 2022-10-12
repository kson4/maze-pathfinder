export const ROWS = 40;
export const COLS = 70;
// export const SCREEN_WIDTH = screen.width;
// export const SCREEN_HEIGHT = screen.height * 0.8;
// export const ROWS = 10;
// export const COLS = 10;

export class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = document.querySelector(".board");
    this.startX = undefined;
    this.startY = undefined;
    this.endX = undefined;
    this.endY = undefined;

    // top, right, bottom, left
    this.wallSides = [];
    this.stack = [];
    this.traveled = new Set();
  }
  generate() {
    for (let i = 0; i < this.rows; i++) {
      const row = document.createElement("div");
      row.classList.add(`r${i}`);
      row.classList.add("row");
      const wallRows = [];
      for (let j = 0; j < this.cols; j++) {
        const col = document.createElement("div");
        col.classList.add(`r${i}c${j}`);
        col.classList.add("cell");
        col.addEventListener("click", () => {
          col.classList.add("wall");
        });
        row.append(col);
        const curWall = [[i, j]];
        if (i - 1 >= 0) {
          curWall.push([i - 1, j]);
        }
        if (i + 1 < ROWS) {
          curWall.push([i + 1, j]);
        }
        if (j - 1 >= 0) {
          curWall.push([i, j - 1]);
        }
        if (j + 1 < COLS) {
          curWall.push([i, j + 1]);
        }
        wallRows.push(curWall);
      }
      this.board.append(row);
      this.wallSides.push(wallRows);
    }
    console.log(this.wallSides);
    this.stack.push(this.wallSides[0][0]);
    console.log(this.stack);
  }
  startingPosition(x, y) {
    this.startX = x;
    this.startY = y;
    document.querySelector(`.r${x}c${y}`).classList.add("start");
  }
  destinationPosition(x, y) {
    this.endX = x;
    this.endY = y;
    document.querySelector(`.r${x}c${y}`).classList.add("destination");
    // document.querySelector(
    //   `.r${x}c${y}`
    // ).textContent = `<i class="fa-duotone fa-flag-checkered"></i>`;
    // document
    //   .querySelector(`.r${x}c${y}`)
    //   .innerHTML(`<i class="fa-duotone fa-flag-checkered"></i>`);
  }
  // cur = pop off stack
  // next = random neighbor from cur
  // break the walls between cur and next
  // dfs(next)
  // mark both sides as visited
  dfs() {
    if (this.stack.length == 0) {
      console.log(this.wallSides);
      return;
    }
    // let cur = this.stack.pop()
    // let cur = this.stack[0]
    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1].length == 1
    ) {
      console.log(this.stack[this.stack.length - 1].length);
      this.stack.pop();
    }
    let cur = this.stack.pop();
    // if (cur.length == 1) {
    //   this.dfs()
    // }
    let x = cur[0][0];
    let y = cur[0][1];
    this.traveled.add(x + " " + y);
    const randomNeighborIdx = Math.floor(Math.random() * (cur.length - 1)) + 1;
    const randomNeighbor = cur[randomNeighborIdx];
    let nX = randomNeighbor[0];
    let nY = randomNeighbor[1];

    // add neighbors onto stack
    // if (cur.length > 1) {
    //   this.stack.push(cur)
    // }
    // this.stack.push(cur)
    this.stack.push(
      this.wallSides[cur[randomNeighborIdx][0]][cur[randomNeighborIdx][1]]
    );
    console.log("top of the stack: ", this.stack[this.stack.length - 1]);
    // console.log(this.wallSides[cur[randomNeighborIdx][0]][cur[randomNeighborIdx][1]])

    console.log("picked: ", x, y);
    console.log("available neighbors: ", cur);
    console.log(
      "moved to: ",
      nX,
      nY,
      cur[randomNeighborIdx][0],
      cur[randomNeighborIdx][1]
    );
    console.log(
      "available neighbors: ",
      this.wallSides[cur[randomNeighborIdx][0]][cur[randomNeighborIdx][1]]
    );

    cur.splice(randomNeighborIdx, 1);
    if (this.traveled.has(nX + " " + nY)) {
      this.dfs();
    }
    this.traveled.add(nX + " " + nY);
    // for (let i = 1; i < cur.length; i++) {
    //   this.stack.push(this.wallSides[cur[i][0]][cur[i][1]])
    //   if (!this.traveled.has(cur[i][0] + " " + cur[i][1])) {
    //     this.stack.push(this.wallSides[cur[i][0]][cur[i][1]])
    //   }
    // }

    // this.traveled.add(nX + " " + nY)

    if (x - nX == 1) {
      // went up
      console.log("up");
      document.querySelector(`.r${x}c${y}`).style.borderTop = "1px solid white";
      document.querySelector(`.r${nX}c${nY}`).style.borderBottom =
        "1px solid white";
    } else if (x - nX == -1) {
      // went down
      console.log("down");
      document.querySelector(`.r${x}c${y}`).style.borderBottom =
        "1px solid white";
      document.querySelector(`.r${nX}c${nY}`).style.borderTop =
        "1px solid white";
    } else if (y - nY == 1) {
      // went left
      console.log("left");
      document.querySelector(`.r${x}c${y}`).style.borderLeft =
        "1px solid white";
      document.querySelector(`.r${nX}c${nY}`).style.borderRight =
        "1px solid white";
    } else {
      // went right
      console.log("right");
      document.querySelector(`.r${x}c${y}`).style.borderRight =
        "1px solid white";
      document.querySelector(`.r${nX}c${nY}`).style.borderLeft =
        "1px solid white";
    }
    document.querySelector(`.r${x}c${y}`).classList.add("start");
    document.querySelector(`.r${nX}c${nY}`).classList.add("start");
    setTimeout(() => {
      document.querySelector(`.r${x}c${y}`).classList.remove("start");
      document.querySelector(`.r${nX}c${nY}`).classList.remove("start");
      console.log(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
      );
      this.dfs();
    }, 1000);
  }
}
