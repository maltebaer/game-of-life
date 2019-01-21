// --- NOT WORKING ---
// - start/stop

// --- TO DO/IDEAS ---
//  - implement initial conditions
//    - black holes
//  - area of visibility

// --- GET CANVAS PROPERTIES ---
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

// --- SET GAME PROPERTIES ---
let resolution = 5; // size of one cell
let radius = 2 * resolution;
let cols = width / resolution;
let rows = height / resolution;

let populationDensity = 0.06;
let maxAge = false;

let running = false;

// --- INITIALISE GAME ---
let health = new GameOfLife(rows, cols, populationDensity, "health", maxAge);
health.setup();
let damage = new GameOfLife(rows, cols, populationDensity, "damage", maxAge);
damage.setup();
let blackHole = new GameOfLife(rows, cols, 0, "black hole");
blackHole.setupExploder(cols - 3 * resolution, rows - 3 * resolution);
let ball = new Ball(0, 0, 0, radius);

function checkCollision(object, game) {
  let collision = false;
  y = Math.floor(object.y / resolution);
  x = Math.floor(object.x / resolution);
  switch (game.type) {
    case "health":
      collision = health.grid[y][x].state === 1;
      break;
    case "damage":
      collision = damage.grid[y][x].state === 1;
      break;
    case "black hole":
      collision = blackHole.grid[y][x].state === 1;
      break;

    default:
      break;
  }
  return collision;
}

function updateEverything() {
  health.nextGeneration();
  damage.nextGeneration();
  blackHole.nextGeneration();
  ball.update();
  if (checkCollision(ball, health)) {
    console.log("checkCollision called HEALTH");
    if (ball.radius < 3 * radius) {
      ball.radius *= 1.1;
    }
  }
  if (checkCollision(ball, damage)) {
    console.log("checkCollision called DAMAGE");
    ball.radius *= 0.9;
  }
  if (checkCollision(ball, blackHole)) {
    console.log("checkCollision called BLACK HOLE");
    ball.radius = 0;
  }
}
function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  health.draw(ctx);
  damage.draw(ctx);
  blackHole.draw(ctx);
  ball.draw(ctx);
}
function animation() {
  updateEverything();
  drawEverything();
  window.requestAnimationFrame(animation);
}

// --- USER INTERFACE ---
window.onload = function() {
  drawEverything();

  document.querySelector(".btn-start").onclick = function() {
    console.log("START");
    running = true;
    animation();
  };
  document.querySelector(".btn-stop").onclick = function() {
    console.log("STOP");
    running = false;
  };

  // listen for key events
  document.onkeydown = function(e) {
    e.preventDefault(); // stop default behaviour (scrolling)
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 38: // up
        ball.speed += 1;
        break;
      case 40: // down
        ball.speed -= 1;
        break;
      case 37: // left
        ball.vAngle = -0.03;
        break;
      case 39: // right
        ball.vAngle = 0.03;
        break;
    }
  };
  document.onkeyup = function(e) {
    switch (e.keyCode) {
      case 37: // left
      case 39: // right
        ball.vAngle = 0;
        break;
    }
  };
};
