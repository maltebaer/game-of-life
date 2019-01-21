class Cell {
  constructor(x, y, initialState, type) {
    this.x = x;
    this.y = y;
    this.state = initialState;
    this.type = type;
    this.neighbours;
    this.generationsLived = 0;
    this.generationsDead = 0;
  }
}