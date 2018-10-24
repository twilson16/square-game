// import Keyboarder from './keyboarder'
// import Square from './Square'
import {COLORS, GRID_SIZE} from './constants'
// import Hazard from './Hazard'
// import {colliding} from './Game'

class Coin {
  constructor (game, pos) {
    this.game = game
    this.pos = { x: 3, y: 0 }
    this.center = {
      x: 390,
      y: 210
    }
    this.size = {
      x: 30,
      y: 30
    }
  }

  update () {
  }

  draw () {
    let context = this.game.context
    context.fillStyle = COLORS.coin
    context.fillRect(GRID_SIZE * (3 + this.pos.x) + 15, GRID_SIZE * (this.pos.y + 3) + 15, 30, 30)
  }
}

export default Coin
