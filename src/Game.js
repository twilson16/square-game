// import Keyboarder from './keyboarder'
import Square from './Square'
import {COLORS, GRID_SIZE} from './constants'
import Hazards from './Hazards'
import Coin from './Coin'

function isSamePos (pos, posSquare) {
  return pos.x === posSquare.x && pos.y === posSquare.y
}

function doesIntersectWithSquare (pos, posSquare) {
  for (let pos of posSquare) {
    if (isSamePos(pos, posSquare)) {
      return true
    }
  }
  return false
}

// export function colliding (b1, b2) {
//   return !(
//     b1 === b2 ||
//         b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
//         b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
//         b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
//         b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
//   )
// }

class Game {
  constructor () {
    this.canvas = document.getElementById('screen')
    this.context = this.canvas.getContext('2d')
    this.size = {
      width: this.canvas.width,
      height: this.canvas.height
    }
    this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }
    this.square = new Square(this)
    this.coin = new Coin(this)
    this.hazards = new Hazards(this)
    this.score = 0
  }

  update () {
    if (isSamePos(this.square.pos, this.coin.pos)) {
      this.score += 1
      this.coin.pos = {
        x: Math.floor(Math.random() * 4),
        y: Math.floor(Math.random() * 4)
      }
    }
    this.square.update()
    this.coin.update()
  }

  draw () {
    this.context.clearRect(0, 0, this.size.width, this.size.height)

    this.background()
    this.grid()
    this.border()
    this.drawScore()

    this.square.draw()
    this.coin.draw()
    this.hazards.draw()

    this.context.font = '30px courier'
    this.context.fillStyle = COLORS.wall
    this.context.fillText('use arrow keys to take the coin', GRID_SIZE * 1, GRID_SIZE * 9, GRID_SIZE * 8)
  }

  tick () {
    this.ticks++
    this.update()
    this.draw()
    window.requestAnimationFrame(() => this.tick())
  }

  start () {
    this.tick()
  }

  border () {
    this.context.strokeStyle = COLORS.wall
    this.context.lineWidth = 20
    this.context.strokeRect(150, 150, 300, 300)
  }

  background () {
    this.context.fillStyle = COLORS.background
    this.context.fillRect(0, 0, this.size.width, this.size.height)
  }

  grid () {
    this.context.strokeStyle = COLORS.wall
    this.context.lineWidth = 1

    this.context.beginPath()
    for (var x = 0; x < this.size.width; x += GRID_SIZE) {
      this.context.moveTo(x, 0)
      this.context.lineTo(x, this.size.height)
    }

    for (var y = 0; y < this.size.height; y += GRID_SIZE) {
      this.context.moveTo(0, y)
      this.context.lineTo(this.size.width, y)
    }

    this.context.stroke()
  }

  drawScore () {
    this.context.font = '26px courier'
    this.context.fillStyle = COLORS.wall
    this.context.fillText('current score:' + this.score, GRID_SIZE * 3, GRID_SIZE * 1.5, GRID_SIZE * 4)
  }

  placeCoin () {
    let foundValidPos = false
    let pos
    while (!foundValidPos) {
      pos = {
        x: Math.floor(Math.random() * (this.squares.x)),
        y: Math.floor(Math.random() * (this.squares.y))
      }

      foundValidPos = !(doesIntersectWithSquare(pos, this.coin) ||
                        doesIntersectWithSquare(pos, this.square))
    }
  }

  removeCoin (pos) {
    this.coin = this.coin.filter(function (coin) {
      return !isSamePos(pos, coin)
    })
  }
}

// make border solid for square and coin
// square moves on key press
// coin disappears when square gets to it and adds to score
// randomly generate coin location within border
// black squares move across the screen randomly
// black squares kill you when they hit you and score back to 0, but remain in same spot

// directions at bottom and high score

export default Game
