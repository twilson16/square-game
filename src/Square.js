import Keyboarder from './keyboarder'
import {COLORS, GRID_SIZE} from './constants'
// import Hazard from './Hazard'
// import Coin from './Coin'

class Square {
  constructor (game, pos) {
    this.game = game
    this.pos = { x: 0, y: 3 }
    this.keyboarder = new Keyboarder()
    this.keyboarder.on(Keyboarder.KEYS.LEFT, () => { this.moveSquare('left') })
    this.keyboarder.on(Keyboarder.KEYS.RIGHT, () => { this.moveSquare('right') })
    this.keyboarder.on(Keyboarder.KEYS.UP, () => { this.moveSquare('up') })
    this.keyboarder.on(Keyboarder.KEYS.DOWN, () => { this.moveSquare('down') })
  }

  update () {
  }

  draw () {
    let context = this.game.context
    context.fillStyle = COLORS.square
    context.fillRect((GRID_SIZE * (3 + this.pos.x) + 5), (GRID_SIZE * (3 + this.pos.y) + 5), 50, 50)
  }

  moveSquare (direction) {
    this.direction = direction

    if (this.direction === 'up') {
      this.pos.y--
    } else if (this.direction === 'down') {
      this.pos.y++
    } else if (this.direction === 'left') {
      this.pos.x--
    } else if (this.direction === 'right') {
      this.pos.x++
    }

    this.pos.x = Math.min(Math.max(this.pos.x, 0), 3)
    this.pos.y = Math.min(Math.max(this.pos.y, 0), 3)
  }
}

export default Square
