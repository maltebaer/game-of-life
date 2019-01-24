class Cell {
  constructor(x, y, initialState, type, color = "") {
    this.x = x;
    this.y = y;
    this.state = initialState;
    this.type = type;
    this.color = color;
    this.neighbours;
    this.generationsLived = 0;
    this.generationsDead = 0;
  }
}