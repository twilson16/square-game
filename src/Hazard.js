// import Keyboarder from './keyboarder'
// import Square from './Square'
import {COLORS, GRID_SIZE} from './constants'
// import Coin from './Coin'

class Hazard {
  constructor (game, pos, vel) {
    this.game = game
    this.velocity = vel
    this.length = 240
    this.center = pos
  
    // this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }
  }

  update () {
    this.center.x += this.velocity.x
    this.center.y += this.velocity.y
  }

  draw () {
    let context = this.game.context
    context.fillStyle = COLORS.hazard
    context.fillRect(this.center.x - 15, this.center.y - 15, 30, 30)
  }
}

export default Hazard
