// import Keyboarder from './keyboarder'
// import Square from './Square'
import {COLORS, GRID_SIZE} from './constants'
// import Coin from './Coin'

class Hazards {
  constructor (game, pos) {
    this.game = game
    this.pos = pos
    this.length = 240
    this.center = {
      x: Math.floor(Math.random() * 240) - 15,
      y: Math.floor(Math.random() * 240) + 15
    }
    // this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }
  }

  update () {
    // if (i = 0, i < 3, i++) {
    // this.center.x += 2
    this.sendHazards()
    
    // }
  }

  draw () {
    let context = this.game.context
    context.fillStyle = COLORS.hazards
    context.fillRect(this.center.x - 15, this.center.y - 15, 30, 30)
  }

  sendHazards () {
    // let sides = ['top', 'left', 'right', 'bottom']
    let entrySide = Math.floor((Math.random() * 3) + 1)
    let x, y, vx, vy
    if (entrySide === 1) {      
      x = Math.floor((Math.random() * 240) + 90)
      y = 0
      vx = this.center.x += 2
    } else if (entrySide === 2) {
      x = Math.floor((Math.random() * 240) + 90)
      y = 0
      vy = this.center.y += 2
    } else if (entrySide === 3) {
      x = 500
      y = Math.floor((Math.random() * 240) + 90)
      vx = this.center.x -= 2
    } else if (entrySide === 4) {
      x = Math.floor((Math.random() * 240) + 90)
      y = 500
      vy = this.center.y -= 2
    }
    this.game.hazardsArray.push(new Hazards(this, {x: x, y: y}, {x: vx, y: vy}))
  }
}

export default Hazards
