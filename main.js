const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = Math.floor(window.innerWidth - 20)
canvas.height = Math.floor(window.innerHeight - 100)
canvas.style.background = "#f1f1f1"

const scale = 30
let grid = []
const cols = Math.floor(canvas.height / scale)
const rows = Math.floor(canvas.width / scale)

function dist(x1, x2, y1, y2) {
  let a = x1 + x2
  let b = y1 + y2
  return Math.sqrt(a + b)
}

function removeFromArr(arr, node) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const x = arr[i]
    if (node == x) {
      node.marked = true
      arr.splice(i, 1)
    }
  }
}

function initGrid() {
  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j)
    }
  }
}

function drawGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].draw()
    }
  }
}
function drawSet(arr) {
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      const x = arr[i]
      x.highlight()
    }
  }
}
initGrid()

let openSet = []
let closedSet = []
let start = grid[0][0]
let goal = grid[rows - 1][cols - 1]
let current
let tG
start.g = 0
start.h = dist(start.i * scale, goal.i * scale)
start.f = start.h
openSet.push(start)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let dloop = requestAnimationFrame(animate)
  if (current === goal) {
    console.log("ended")
    let solver = goal
    drawGrid()
    while (solver.previous) {
      solver.highlightGreen()
      solver = solver.previous
    }
    cancelAnimationFrame(dloop)
    return
  }
  if (openSet.length) {
    current = openSet[0]
    for (let i = 0; i < openSet.length; i++) {
      if (current.f > openSet[i].f) {
        current = openSet[i]
      }
    }
    removeFromArr(openSet, current)
    let neighbors = current.neighbors()
    neighbors.forEach((n) => {
      tG =
        current.g +
        dist(current.i * scale, n.i * scale, current.j * scale, n.j * scale)
      if (tG < n.g) {
        n.previous = current
        n.g = tG
        n.f = n.g + n.h
        if (!openSet.includes(n)) {
          openSet.push(n)
        }
      }
    })
  } else {
    console.log("not reached")
    cancelAnimationFrame(dloop)
  }
  drawGrid()
  drawSet(openSet)
}
animate()
