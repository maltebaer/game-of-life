class Cell {
  constructor(x, y, initialState) {
    this.x = x;
    this.y = y;
    this.state = initialState;
    this.neighbours;
    this.generationsLived = 0;
    this.generationsDead = 0;
  }
}