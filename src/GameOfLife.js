class GameOfLife {
  constructor(rows, cols, populationDensity = 0, type = "", color = "", maxAge = false) {
    this.rows = rows;
    this.cols = cols;
    this.grid;
    this.grid = create2DArray(this.rows, this.cols);
    this.maxAge = maxAge;
  }

  // initialise full grid
  setup(type, typeColor, typeDensity) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (Math.random() < typeDensity) {
          this.grid[y][x] = new Cell(x, y, 1, type, typeColor);
        } else {
          this.grid[y][x] = new Cell(x, y, 0, type, typeColor);
        }
      }
    }
  }

  // setup single items on existing grid
  setupBlinker(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -2; i < 5; i++) {
          for (let j = -2; j < 5; j++) {
            if (i === 1 && (j === 0 || j === 1 || j === 2)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                0,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }
  setupBeacon(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -2; i < 6; i++) {
          for (let j = -2; j < 6; j++) {
            if ((i === 0 || i === 1) && (j === 0 || j === 1)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if ((i === 2 || i === 3) && (j === 2 || j === 3)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                0,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }
  setupToad(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -2; i < 6; i++) {
          for (let j = -2; j < 6; j++) {
            if ((i === 0 || i === 3) && (j === 1 || j === 2)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 1 && j === 0) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 2 && j === 3) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                0,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }
  setupClock(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -2; i < 6; i++) {
          for (let j = -2; j < 6; j++) {
            if (i === 0 && j === 2) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 1 && (j === 0 || j === 2)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 2 && (j === 1 || j === 3)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 3 && j === 1) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                0,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }
  setupBipole(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -2; i < 7; i++) {
          for (let j = -2; j < 7; j++) {
            if (i === 0 && (j === 3 || j === 4)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 1 && (j === 2 || j === 4)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 3 && (j === 0 || j === 2)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 4 && (j === 0 || j === 1)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                0,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }

  setupGliderGun(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.grid[y][x] = new Cell(x, y, 0, type, typeColor);
      }
    }
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = 0; i < 15; i++) {
          for (let j = 0; j < 38; j++) {
            if (i === 0 && (j === 23 || j === 24 || j === 34 || j === 35)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 1 && (j === 22 || j === 24 || j === 34 || j === 35)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (
              i === 2 &&
              (j === 0 || j === 1 || j === 9 || j === 10 || j === 22 || j === 23)
            ) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 3 && (j === 0 || j === 1 || j === 8 || j === 10)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            }
            if (i === 4 && (j === 8 || j === 9 || j === 16 || j === 17)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 5 && (j === 16 || j === 18)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 6 && j === 16) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 7 && (j === 35 || j === 36)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 8 && (j === 35 || j === 37)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 9 && j === 35) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 12 && (j === 24 || j === 25 || j === 26)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 13 && j === 24) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if (i === 14 && j === 25) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }

  setupPortal(xPosition, yPosition, type, typeColor, alignment) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -6; i < 15; i++) {
          for (let j = -6; j < 15; j++) {
            if (alignment === "horizontal") {
              if (
                i === 1 &&
                (j === 0 ||
                  j === 1 ||
                  j === 2 ||
                  j === 3 ||
                  j === 4 ||
                  j === 5 ||
                  j === 6 ||
                  j === 7 ||
                  j === 8 ||
                  j === 9)
              ) {
                this.grid[i + yPosition][j + xPosition] = new Cell(
                  j + xPosition,
                  i + yPosition,
                  1,
                  type,
                  typeColor
                );
              } else {
                this.grid[i + yPosition][j + xPosition] = new Cell(
                  j + xPosition,
                  i + yPosition,
                  0,
                  type,
                  typeColor
                );
              }
            }
            if (alignment === "vertical") {
              if (
                j === 1 &&
                (i === 0 ||
                  i === 1 ||
                  i === 2 ||
                  i === 3 ||
                  i === 4 ||
                  i === 5 ||
                  i === 6 ||
                  i === 7 ||
                  i === 8 ||
                  i === 9)
              ) {
                this.grid[i + yPosition][j + xPosition] = new Cell(
                  j + xPosition,
                  i + yPosition,
                  1,
                  type,
                  typeColor
                );
              } else {
                this.grid[i + yPosition][j + xPosition] = new Cell(
                  j + xPosition,
                  i + yPosition,
                  0,
                  type,
                  typeColor
                );
              }
            }
          }
        }
      }
    }
  }
  setupExploder(xPosition, yPosition, type, typeColor) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        for (let i = -7; i < 12; i++) {
          for (let j = -7; j < 12; j++) {
            if ((i === 0 || i === 4) && (j === 0 || j === 2 || j === 4)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else if ((i === 1 || i === 2 || i === 3) && (j === 0 || j === 4)) {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                1,
                type,
                typeColor
              );
            } else {
              this.grid[i + yPosition][j + xPosition] = new Cell(
                j + xPosition,
                i + yPosition,
                0,
                type,
                typeColor
              );
            }
          }
        }
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let y = i * resolution;
        let x = j * resolution;
        if (this.grid[i][j].state === 1) {
          ctx.fillStyle = cellColor(this.grid[i][j].color, 0, i);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (this.grid[i][j].state === 0 && this.grid[i][j].generationsDead === 1) {
          ctx.fillStyle = cellColor(this.grid[i][j].color, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (this.grid[i][j].state === 0 && this.grid[i][j].generationsDead === 2) {
          ctx.fillStyle = cellColor(this.grid[i][j].color, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (this.grid[i][j].state === 0 && this.grid[i][j].generationsDead === 3) {
          ctx.fillStyle = cellColor(this.grid[i][j].color, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (this.grid[i][j].state === 0 && this.grid[i][j].generationsDead === 4) {
          ctx.fillStyle = cellColor(this.grid[i][j].color, this.grid[i][j].generationsDead);
          ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }
  }

  drawLimitedSight(ctx, object) {
    let iArr = getPeriodicArray(convertBallToGrid(object.y - 165, resolution), 180, 4);
    let jArr = getPeriodicArray(convertBallToGrid(object.x - 140, resolution), 120, 3);
    // let iArr = getPeriodicArray(convertBallToGrid(object.y - 60, resolution), 180, 10);
    // let jArr = getPeriodicArray(convertBallToGrid(object.x - 140, resolution), 120, 1);

    for (let i = 0; i < iArr.length; i++) {
      for (let j = 0; j < jArr.length; j++) {
        let y = iArr[i] * resolution;
        let x = jArr[j] * resolution;

        if (this.grid[iArr[i]][jArr[j]].state === 1) {
          ctx.fillStyle = cellColor(this.grid[iArr[i]][jArr[j]].color);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 1
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 2
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 3
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 4
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }
  }
  drawLimitedSightNarrow(ctx, object) {
    let iArr = getPeriodicArray(convertBallToGrid(object.y - 60, resolution), 180, 10);
    let jArr = getPeriodicArray(convertBallToGrid(object.x - 140, resolution), 120, 1);

    for (let i = 0; i < iArr.length; i++) {
      for (let j = 0; j < jArr.length; j++) {
        let y = iArr[i] * resolution;
        let x = jArr[j] * resolution;

        if (this.grid[iArr[i]][jArr[j]].state === 1) {
          ctx.fillStyle = cellColor(this.grid[iArr[i]][jArr[j]].color);
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 1
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 2
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 3
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
        if (
          this.grid[iArr[i]][jArr[j]].state === 0 &&
          this.grid[iArr[i]][jArr[j]].generationsDead === 4
        ) {
          ctx.fillStyle = cellColor(
            this.grid[iArr[i]][jArr[j]].color,
            this.grid[iArr[i]][jArr[j]].generationsDead
          );
          ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }
  }

  countNeighbours() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let sum = 0;
        // include maxAge property
        if (this.grid[y][x].generationsLived === this.maxAge) {
          sum = 3;
          this.grid[y][x].generationsLived = 0;
        } else {
          if (this.grid[y][x].type.includes("health")) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                if (
                  this.grid[getPeriodicValue(y + j, this.rows)][getPeriodicValue(x + i, this.cols)]
                    .state === 1 &&
                  this.grid[getPeriodicValue(y + j, this.rows)][
                    getPeriodicValue(x + i, this.cols)
                  ].type.includes("health")
                ) {
                  sum++;
                }
              }
            }
            sum -= this.grid[y][x].state;
            this.grid[y][x].neighbours = sum;
          }
          if (this.grid[y][x].type.includes("damage")) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                if (
                  this.grid[getPeriodicValue(y + j, this.rows)][getPeriodicValue(x + i, this.cols)]
                    .state === 1 &&
                  this.grid[getPeriodicValue(y + j, this.rows)][
                    getPeriodicValue(x + i, this.cols)
                  ].type.includes("damage")
                ) {
                  sum++;
                }
              }
            }
            sum -= this.grid[y][x].state;
            this.grid[y][x].neighbours = sum;
          }
          if (this.grid[y][x].type.includes("portal")) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                if (
                  this.grid[getPeriodicValue(y + j, this.rows)][getPeriodicValue(x + i, this.cols)]
                    .state === 1 &&
                  this.grid[getPeriodicValue(y + j, this.rows)][
                    getPeriodicValue(x + i, this.cols)
                  ].type.includes("portal")
                ) {
                  sum++;
                }
              }
            }
            sum -= this.grid[y][x].state;
            this.grid[y][x].neighbours = sum;
          }
          if (this.grid[y][x].type.includes("black hole")) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                if (
                  this.grid[getPeriodicValue(y + j, this.rows)][getPeriodicValue(x + i, this.cols)]
                    .state === 1 &&
                  this.grid[getPeriodicValue(y + j, this.rows)][
                    getPeriodicValue(x + i, this.cols)
                  ].type.includes("black hole")
                ) {
                  sum++;
                }
              }
            }
            sum -= this.grid[y][x].state;
            this.grid[y][x].neighbours = sum;
          }
          if (this.grid[y][x].type.includes("item")) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                if (
                  this.grid[getPeriodicValue(y + j, this.rows)][getPeriodicValue(x + i, this.cols)]
                    .state === 1 &&
                  this.grid[getPeriodicValue(y + j, this.rows)][
                    getPeriodicValue(x + i, this.cols)
                  ].type.includes("item")
                ) {
                  sum++;
                }
              }
            }
            sum -= this.grid[y][x].state;
            this.grid[y][x].neighbours = sum;
          }
        }
      }
    }
  }
  update() {
    this.countNeighbours();

    let gridNextGeneration = this.grid;

    let state = this.grid.map(arr => arr.map(cell => cell.state));
    let neighbours = this.grid.map(arr => arr.map(cell => cell.neighbours));

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        // give birth
        if (state[y][x] === 0 && neighbours[y][x] === 3) {
          gridNextGeneration[y][x].state = 1;
          gridNextGeneration[y][x].generationsDead = 0;
          gridNextGeneration[y][x].generationsLived = 0;
        }
        // let die
        else if (
          (state[y][x] === 1 && neighbours[y][x] < 2) ||
          (state[y][x] === 1 && neighbours[y][x] > 3)
        ) {
          gridNextGeneration[y][x].state = 0;
          gridNextGeneration[y][x].generationsDead = 0;
          gridNextGeneration[y][x].generationsLived = 0;
        }
        // increase cells age (either dead or alive)
        else if (state[y][x] === 1) gridNextGeneration[y][x].generationsLived++;
        else if (state[y][x] === 0) gridNextGeneration[y][x].generationsDead++;
      }
    }

    this.grid = gridNextGeneration;
  }
}
