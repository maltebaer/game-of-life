// --- GAME OF LIFE ---

// --- NOT WORKING ---
/* 
     
*/
// --- TO DO ---
/* 
     - implement controllable object
     - implement initial conditions
     - implement object-landsape interaction
*/

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let testing = false;

let populationDensity = 0.7;
let maxAge = false;
let rows = (cols = 300);

if (testing) var game = new GameOfLife(10, 10);
else var game = new GameOfLife(rows, cols, maxAge);

game.setup(populationDensity);

function updateEverything() {
  game.countNeighbours();
  game.nextGeneration();
}
function drawEverything() {
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  game.draw();
}

// function animation() {
//   updateEverything();
//   drawEverything();
//   window.requestAnimationFrame(animation);
// }
// if (testing) drawEverything();
// else animation();

if (testing) drawEverything();
else {
  setInterval(() => {
    updateEverything();
    drawEverything();
  }, 1000 / 5);
}
