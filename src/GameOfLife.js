class GameOfLife {
  constructor(rows, cols, maxAge = false) {
    this.rows = rows;
    this.cols = cols;
    this.grid;
    this.maxAge = maxAge;
  }

  setup(populationDensity) {
    this.grid = create2DArray(this.rows, this.cols);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (Math.random() < populationDensity) {
          this.grid[y][x] = new Cell(x, y, 1);
        } else {
          this.grid[y][x] = new Cell(x, y, 0);
        }
      }
    }
  }

  draw() {
    let resWidth = width / this.cols;
    let resHeigth = height / this.rows;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let y = i * resHeigth;
        let x = j * resWidth;
        if (this.grid[i][j].state === 0) {
          ctx.fillStyle = "#000000";
          ctx.fillRect(x, y, resWidth, resHeigth);
        }
      }
    }
  }

  countNeighbours() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let sum = 0;
        // let sum = 3 if cell reached maxAge
        if (this.grid[y][x].generationsLived === this.maxAge) {
          sum = 3;
          this.grid[y][x].generationsLived = 0;
        } else {
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              let col = (x + i + this.cols) % this.cols;
              let row = (y + j + this.rows) % this.rows;
              if (this.grid[row][col].state === 1) sum++;
            }
          }
          sum -= this.grid[y][x].state;
        }
        this.grid[y][x].neighbours = sum;
      }
    }
  }

  nextGeneration() {
    let gridNew = this.grid;

    let state = this.grid.map(arr => arr.map(cell => cell.state));
    let neighbours = this.grid.map(arr => arr.map(cell => cell.neighbours));

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        // give birth
        if (state[y][x] === 0 && neighbours[y][x] === 3) {
          gridNew[y][x].state = 1;
          gridNew[y][x].generationsDead = 0;
          gridNew[y][x].generationsLived = 0;
        }
        // let die
        else if (
          (state[y][x] === 1 && neighbours[y][x] < 2) ||
          (state[y][x] === 1 && neighbours[y][x] > 3)
        ) {
          gridNew[y][x].state = 0;
          gridNew[y][x].generationsDead = 0;
          gridNew[y][x].generationsLived = 0;
        }
        // increase cells age (either dead or alive)
        else if (state[y][x] === 1) gridNew[y][x].generationsLived++;
        else if (state[y][x] === 0) gridNew[y][x].generationsDead++;
      }
    }

    this.grid = gridNew;
  }
}
