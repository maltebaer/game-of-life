var debug = false;

function create2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function drawCoordinates(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "chartreuse";
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 100);
  ctx.stroke();

  ctx.restore();
}

function getDistanceOfObjects(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
}
function getDistanceOfXY(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function getPeriodicValue(value, length) {
  return (value + length) % length;
}
function getPeriodicArray(startIndex, periodLength, arrLengthDivisor) {
  let arr = [];
  for (let i = startIndex; i < periodLength / arrLengthDivisor + startIndex; i++) {
    arr.push((i + periodLength) % periodLength);
  }
  return arr;
}

function convertBallToGrid(coordianteBall, resolution) {
  return Math.floor(coordianteBall / resolution);
}

function checkCollision(object, game) {
  let collision = false;

  y = convertBallToGrid(object.y, resolution);
  x = convertBallToGrid(object.x, resolution);

  let type = game.grid[y][x].type;

  if (
    type.includes("damage") ||
    type.includes("portal") ||
    type.includes("black hole") ||
    type.includes("item")
  ) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (
          game.grid[getPeriodicValue(y + j, game.rows)][getPeriodicValue(x + i, game.cols)]
            .state === 1
        ) {
          collision = true;
        }
      }
    }
  } else if (type.includes("health")) {
    collision = game.grid[y][x].state === 1;
  }
  return [collision, type];
}

function gameOver(object) {
  if (object.radius < (2 * MAX_RADIUS) / 15) {
    ball.radius = 0;
    ball.speed = 0;
    return true;
  } else {
    return false;
  }
}
function gainHealth(object) {
  if (object.radius < MAX_RADIUS) {
    return true;
  } else {
    return false;
  }
}
function gainSpeed(object) {
  if (Math.abs(object.speed) < MAX_SPEED) {
    return true;
  } else {
    return false;
  }
}

function cellColor(color, generationsDead = 0, i) {
  let alpha = 1 - generationsDead / 5;
  let gradient = (10 * 180) / i;
  switch (color) {
    case "dark blue":
      return `rgba(51, 102, 255, ${alpha})`;
    case "light blue":
      return `rgba(153, 179, 255, ${alpha})`;
    case "yellow":
      return `rgba(255, 255, 0, ${alpha})`;
    case "red":
      return `rgba(255, 20, 50, ${alpha})`;
    case "green":
      return `rgba(0, 255, 0, ${alpha})`;
    case "pink":
      return `rgba(255, 102, 153, ${alpha})`;

    default:
      return `rgba(255, 255, 255, ${alpha})`;
  }
}
