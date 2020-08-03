class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.f = Infinity
    this.g = Infinity
    this.h = undefined
    this.previous = undefined
    this.gCal = false
    this.marked = false
  }
  highlight() {
    let x = this.i * scale
    let y = this.j * scale
    ctx.beginPath()
    ctx.fillStyle = "rgba(0,0,120,0.7)"
    ctx.fillRect(x, y, scale, scale)
    ctx.closePath()
  }
  highlightGreen() {
    let x = this.i * scale
    let y = this.j * scale
    ctx.beginPath()
    ctx.fillStyle = "rgba(0,255,0,0.8)"
    ctx.fillRect(x, y, scale, scale)
    ctx.closePath()
  }
  neighbors() {
    let allNeigbors = []

    if (grid[this.i][this.j - 1]) {
      allNeigbors.push(grid[this.i][this.j - 1])
    }
    if (grid[this.i + 1] && grid[this.i + 1][this.j]) {
      allNeigbors.push(grid[this.i + 1][this.j])
    }
    if (grid[this.i][this.j + 1]) {
      allNeigbors.push(grid[this.i][this.j + 1])
    }
    if (grid[this.i - 1] && grid[this.i - 1][this.j]) {
      allNeigbors.push(grid[this.i - 1][this.j])
    }
    if (grid[this.i - 1] && grid[this.i - 1][this.j - 1]) {
      allNeigbors.push(grid[this.i - 1][this.j - 1])
    }
    if (grid[this.i + 1] && grid[this.i + 1][this.j - 1]) {
      allNeigbors.push(grid[this.i + 1][this.j - 1])
    }
    if (grid[this.i + 1] && grid[this.i + 1][this.j + 1]) {
      allNeigbors.push(grid[this.i + 1][this.j + 1])
    }
    if (grid[this.i - 1] && grid[this.i - 1][this.j + 1]) {
      allNeigbors.push(grid[this.i - 1][this.j + 1])
    }
    return allNeigbors
  }
  draw() {
    if (!this.marked) {
      let x = this.i * scale
      let y = this.j * scale
      ctx.beginPath()
      ctx.fillStyle = "#999"
      ctx.fillRect(x, y, scale - 1, scale - 1)
      ctx.closePath()
    } else {
      let x = this.i * scale
      let y = this.j * scale
      ctx.beginPath()
      ctx.fillStyle = "rgba(255,0,0,0.8)"
      ctx.fillRect(x, y, scale - 1, scale - 1)
      ctx.closePath()
    }
  }
}
