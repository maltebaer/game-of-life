class GameOfLife {
  constructor(rows, cols, populationDensity, type, maxAge = false) {
    this.rows = rows;
    this.cols = cols;
    this.populationDensity = populationDensity;
    this.type = type;
    this.grid;
    this.maxAge = maxAge;

    // this.setup();
  }

  setup() {
    this.grid = create2DArray(this.rows, this.cols);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (Math.random() < this.populationDensity) {
          this.grid[y][x] = new Cell(x, y, 1, this.type);
        } else {
          this.grid[y][x] = new Cell(x, y, 0, this.type);
        }
      }
    }
  }

  setupExploder(xPosition, yPosition) {
    this.grid = create2DArray(this.rows, this.cols);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.grid[y][x] = new Cell(x, y, 0, this.type);
      }
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if ((i === 0 || i === 4) && j % 2 === 0) {
          this.grid[i + yPosition][j + xPosition] = new Cell(
            j + xPosition,
            i + yPosition,
            1,
            this.type
          );
        } else if (j === 0 || j === 4) {
          this.grid[i + yPosition][j + xPosition] = new Cell(
            j + xPosition,
            i + yPosition,
            1,
            this.type
          );
        }
      }
    }
    // console.table(this.grid);
  }

  draw(ctx) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let y = i * resolution;
        let x = j * resolution;
        if (this.grid[i][j].state === 1) {
          ctx.fillStyle = cellColor(this.type);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[i][j].state === 0 &&
          this.grid[i][j].generationsDead === 1
        ) {
          ctx.fillStyle = cellColor(this.type, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[i][j].state === 0 &&
          this.grid[i][j].generationsDead === 2
        ) {
          ctx.fillStyle = cellColor(this.type, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[i][j].state === 0 &&
          this.grid[i][j].generationsDead === 3
        ) {
          ctx.fillStyle = cellColor(this.type, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[i][j].state === 0 &&
          this.grid[i][j].generationsDead === 4
        ) {
          ctx.fillStyle = cellColor(this.type, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
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
              let row = (y + j + this.rows) % this.rows;
              let col = (x + i + this.cols) % this.cols;
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
    this.countNeighbours();

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
