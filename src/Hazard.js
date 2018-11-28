import {COLORS} from './constants'


class Hazard {
  constructor (game, pos, vel) {
    this.game = game
    this.velocity = vel
    this.length = 240
    this.center = pos
    this.size = {x: 30, y: 30}
  }

  update () {
    this.center.x += this.velocity.x
    this.center.y += this.velocity.y
  }

  draw () {
    let context = this.game.context
    context.fillStyle = COLORS.hazard
    context.fillRect(this.center.x - 15, this.center.y - 15, this.size.x, this.size.y)
  }
}

export default Hazard
