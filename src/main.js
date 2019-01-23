// --- NOT WORKING ---
//  - start/stop

// --- TO DO/IDEAS ---
//  - add music
//  - add pixel frame
//  - add color gradient
//  - make variables const
//  - mobile version
//  - implement area of visibility/just show frame around ball
//    - make it round
//  - implement more worlds
//  - make ball pixely
//  - implement shooting feature
//  - make black hole attract damage cells
//  - make black hole erase all cells
//  - implement initial conditions
//    - patterns to collect in the other worlds

//
// --- GLOBAL VARIABLES ---
// ___ GET CANVAS PROPERTIES ___
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// let width = canvas.width;
// let height = canvas.height;
let width = 800;
let height = 1200;

//
// ___ SET GAME PROPERTIES ___
// // canvas size: 800 x 1200 ==> ratio: 2 / 3
let ratio = width / height;
// cols and rows are dependend in order to make pixels appear squared
let cols = 120;
let rows = cols / ratio;

let resolution = width / cols; // size of one cell ==> 6.66
let radius = 1.5 * resolution; // ==> 10

let populationDensity = 0.07;
let maxAge = false;

let intervalId;
let level = 0;
let justHitPortal = false;
let justHitBlackHole = false;
let itemsCollected = 0;

//
// --- INITIALISE GAME ---
let ball = new Ball(300, 300, 0, radius);

// ___ MAIN WORLD ___
let health = new GameOfLife(rows, cols, 0.6 * populationDensity, "health", "yellow", maxAge);
health.setup();
let damage = new GameOfLife(rows, cols, 0.8 * populationDensity, "damage", "red", maxAge);
damage.setup();
let gliderGun = new GameOfLife(rows, cols, 0, "damage", "red");
gliderGun.setupGilderGun(rows / 5, cols / 5);
let blackHole = new GameOfLife(rows, cols, 0, "black hole", "dark blue");
blackHole.setupExploder(cols - cols / 5, rows - rows / 6);
let portal1 = new GameOfLife(rows, cols, 0, "portal", "light blue");
portal1.setupPortal(cols / 6, rows - rows / 3, "horizontal");
let portal2 = new GameOfLife(rows, cols, 0, "portal", "light blue");
portal2.setupPortal(cols - cols / 6, rows / 3, "vertical");

let mainWorld = [0, "limited", ball, health, damage, gliderGun, portal1, portal2, blackHole];

//
// ___ WORLD1 ___
let health1 = new GameOfLife(rows, cols, 0.6 * populationDensity, "health", "green", maxAge);
health1.setup();
let damage1 = new GameOfLife(rows, cols, 1 * populationDensity, "damage", "red", maxAge);
damage1.setup();
let item1 = new GameOfLife(rows, cols, 0, "item", "pink");
item1.setupPortal(cols - cols / 6, rows / 3, "vertical");

let world1 = [1, "full", ball, health1, damage1, portal1, item1];

//
// ___ WORLD2 ___
let health2 = new GameOfLife(rows, cols, 0.9 * populationDensity, "health", "green", maxAge);
health2.setup();
let damage2 = new GameOfLife(rows, cols, 1.1 * populationDensity, "damage", "red", maxAge);
damage2.setup();
let item2 = new GameOfLife(rows, cols, 0, "item", "pink");
item2.setupPortal(cols / 6, rows - rows / 3, "horizontal");

let world2 = [1, "full", ball, health2, damage2, portal2, item2];

//
// --- GAME LOGIC AND DRAWING ---
// ___ MAIN WORLD ___
function updateEverything(world) {
  world[2].update();
  for (let i = 3; i < world.length; i++) {
    world[i].update();
    if (checkCollision(world[2], world[i]) && world[i].type === "health") {
      console.log("checkCollision called HEALTH");
      if (gainHealth(ball, radius)) {
        ball.radius *= 1.1;
        ball.speed *= 1.1;
      }
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "damage") {
      console.log("checkCollision called DAMAGE");
      if (!gameOver(ball, radius)) {
        ball.radius *= 0.9;
        ball.speed *= 0.9;
      } else {
        ball.radius = 0;
        ball.speed = 0;
        stop();
      }
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "black hole" && !justHitBlackHole) {
      console.log("checkCollision called BLACK HOLE");
      justHitBlackHole = true;
      if (itemsCollected === 2) {
        ball.radius = 0;
        ball.speed = 0;
        mainWorld.splice(2, mainWorld.length - 3);
      } else {
        ball.speed *= -0.2;
      }
      setTimeout(() => (justHitBlackHole = false), 500)
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "item") {
      console.log("checkCollision called ITEM");
      switch (world[i]) {
        case item1:
        document.querySelector(".item1").classList.add("collected")
          break;
        case item2:
        document.querySelector(".item2").classList.add("collected")
          break;
      }
      ball.speed *= -1;
      world.pop();
      itemsCollected++;
    }
    if (checkCollision(world[2], world[i]) && world[i].type === "portal" && !justHitPortal) {
      console.log("checkCollision called PORTAL");
      justHitPortal = true;
      switch (world[i]) {
        case portal1:
          level = 1;
          break;
        case portal2:
          level = 2;
          break;
      }
      stop();
      if (world !== mainWorld) level = 0;
      intervalId = setInterval(animation, 1000 / 60);
      setTimeout(() => (justHitPortal = false), 2000);
    }
  }
}

function drawEverything(world) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  // draw everything except ball
  for (let i = 3; i < world.length; i++) {
    switch (world[1]) {
      case "limited":
        world[i].drawLimitedSight(ctx, ball);
        break;

      default:
        world[i].draw(ctx);
        break;
    }
  }

  // draw ball
  world[2].draw(ctx);
}
function animation() {
  switch (level) {
    case 0:
      updateEverything(mainWorld);
      drawEverything(mainWorld);
      break;
    case 1:
      updateEverything(world1);
      drawEverything(world1);
      break;
    case 2:
      updateEverything(world2);
      drawEverything(world2);
      break;

    default:
      break;
  }
}
function stop() {
  clearInterval(intervalId);
}

//
// --- USER INTERFACE ---
window.onload = function() {
  drawEverything(mainWorld);

  document.querySelector(".btn-start").onclick = function() {
    console.log("START");
    intervalId = setInterval(animation, 1000 / 30);
  };
  document.querySelector(".btn-stop").onclick = function() {
    console.log("STOP");
    stop();
  };

  // listen for key events
  document.onkeydown = function(e) {
    e.preventDefault(); // stop default behaviour (scrolling)
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 13: // enter
        intervalId = setInterval(animation, 1000 / 30);
        break;
      case 38: // up
        ball.speed += 1;
        break;
      case 40: // down
        ball.speed -= 1;
        break;
      case 37: // left
        ball.vAngle = -0.07;
        break;
      case 39: // right
        ball.vAngle = 0.07;
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
