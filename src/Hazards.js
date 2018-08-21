// import Keyboarder from './keyboarder'
// import Square from './Square'
import {COLORS, GRID_SIZE} from './constants'
// import Coin from './Coin'

class Hazards {
  constructor (game, pos) {
    this.game = game
    this.pos = pos
    this.center = {
      x: 0,
      y: 0
    }
  }

  upate () {
    // if (i = 0, i < 3, i++) {
    //   return sendHazards()
    // }
  }

  draw () {
    let context = this.game.context
    context.fillStyle = COLORS.hazards
    context.fillRect(GRID_SIZE + 15, GRID_SIZE * 3 + 15, 30, 30)
  }

//   sendHazards () {
//     let sides = ['top', 'left', 'right', 'bottom']
//     let entrySide = sides[Math.floor(Math.random() * sides.length)]
//     let x, y, vx, vy
//     if (entrySide === 'top') {
//       x = Math.random() * entrySide
//       y = Math.random() * this.square.height
//       vx = Math.random() * 4 - 2
//       vy = Math.random() * 2
//     } else if (entrySide === 'left') {
//       x = Math.random() * this.square.width
//       y = Math.random() * this.square.height
//       vx = Math.random() * 2
//       vy = Math.random() * 4 - 2
//     } else if (entrySide === 'bottom') {
//       x = Math.random() * this.square.width
//       y = Math.random() * this.square.height
//       vx = Math.random() * 4 - 2
//       vy = Math.random() * -2
//     } else if (entrySide === 'right') {
//       x = Math.random() * this.square.width
//       y = Math.random() * this.square.height
//       vx = Math.random() * -2
//       vy = Math.random() * 4 - 2
//     }
//     this.hazard.push(new Hazards(this, {x: x, y: y}, {x: vx, y: vy}))
//   }
}

export default Hazards
