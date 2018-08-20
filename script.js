const GRID_SIZE = 60
const ticks_per_move = 10
const COLORS = {
    // background: '#000f85',
    // background: '#0760ba',
    background: '#243196',
    square: '#FFFFFF',
    wall: '#FFFFFF',
    hazards: '#000000',
    coin: '#eac610',

}

function startGame() {
    let game = new Game(screen)
    game.start()
}


class Game {
    constructor() {
        this.canvas = document.getElementById('screen')
        this.context = this.canvas.getContext('2d')
        this.size = {
            width: this.canvas.width,
            height: this.canvas.height
        }
        this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }
        this.keyboarder = new Keyboarder()
        this.keyboarder.on(Keyboarder.KEYS.LEFT, () => this.pos = ('left'))
        this.keyboarder.on(Keyboarder.KEYS.RIGHT, () => this.pos = ('right'))
        this.keyboarder.on(Keyboarder.KEYS.UP, () => this.pos = ('up'))
        this.keyboarder.on(Keyboarder.KEYS.DOWN, () => this.pos = ('down'))
        this.square = new Square(this, {
            // x: Math.floor(this.size.width / 2),
            // y: Math.floor(this.size.height / 2)
        })
        this.coin = new Coin(this, {

        })
        this.hazards = new Hazards(this, {

        })


        // this.keyboarder = new Keyboarder()
    }



    update() {
        // this.score()

        this.square.update()


    }

    draw() {
        this.context.clearRect(0, 0, this.size.width, this.size.height)

        this.background()
        this.grid()
        this.border()
        this.score()

        this.square.draw()
        this.coin.draw()
        this.hazards.draw()
        // this.square.moveSquare()

        this.context.font = '30px courier'
        this.context.fillStyle = COLORS.wall
        this.context.fillText('use arrow keys to take the coin', GRID_SIZE * 1, GRID_SIZE * 9, GRID_SIZE * 8)
    }


    tick() {
        this.ticks++
            this.update()
        this.draw()
        window.requestAnimationFrame(() => this.tick())
    }

    start() {
        this.tick()
    }

    border() {
        this.context.strokeStyle = COLORS.wall;
        this.context.lineWidth = 20;
        this.context.strokeRect(150, 150, 300, 300);
    }

    background() {
        this.context.fillStyle = COLORS.background;
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    grid() {
        this.context.strokeStyle = COLORS.wall;
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

    score() {
        this.context.font = '26px courier'
        this.context.fillStyle = COLORS.wall
        this.context.fillText('high score:', GRID_SIZE * 3, GRID_SIZE * 1.5, GRID_SIZE * 2)
    }


}


class Square {
    constructor(game, pos) {
        this.game = game
        this.pos = pos
        // let x = this.size.width;
        // let y = this.size.height
        // this.size = {
        //     width: this.canvas.width,
        //     height: this.canvas.height
        // }
        // this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }
        // let x = this.size;
        // let y = this.size;
        
    }

    // moveLeft () {
    //     if (this.direction === 'up') {
    //       this.direction = 'left'
    //     } else if (this.direction === 'left') {
    //       this.direction = 'left'
    //     } else if (this.direction === 'down') {
    //       this.direction = 'left'
    //     } else if (this.direction === 'right') {
    //       this.direction = 'up'
    //     }
    //   }

    // moveRight () {
    //     if (this.direction === 'up') {
    //       this.direction = 'right'
    //     } else if (this.direction === 'left') {
    //       this.direction = 'up'
    //     } else if (this.direction === 'down') {
    //       this.direction = 'left'
    //     } else if (this.direction === 'right') {
    //       this.direction = 'down'
    //     }
    //   }

    // moveUp () {
    //     if (this.direction === 'up') {
    //         this.direction = 'up'
    //       } else if (this.direction === 'left') {
    //         this.direction = 'up'
    //       } else if (this.direction === 'down') {
    //         this.direction = 'left'
    //       } else if (this.direction === 'right') {
    //         this.direction = 'down'
    //       }
    //     }

    // moveDown () {
    //     if (this.direction === 'up') {
    //         this.direction = 'up'
    //       } else if (this.direction === 'left') {
    //         this.direction = 'up'
    //       } else if (this.direction === 'down') {
    //         this.direction = 'left'
    //       } else if (this.direction === 'right') {
    //         this.direction = 'down'
    //       }
    //     }


    update() {
        this.moveSquare()
        // this.update(this.tick)
    }

    draw() {
        var x = this.size
        var y = this.size
        let context = this.game.context
        context.fillStyle = COLORS.square
        context.fillRect((GRID_SIZE*3 + 5), (GRID_SIZE*6 + 5), 50, 50)
        
}

    moveSquare(direction) {
        // let newSquare = {
        //   x: this.size/2,
        //   y: this.size-30
        // }
        
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

        // if (this.keyboarder.on(Keyboarder.KEYS.LEFT, () => this.direction = 'left')){
        //     newSquare.x--
        // }
        // if (this.keyboarder.on(Keyboarder.KEYS.RIGHT, () => this.direction = 'right')) {
        //     newSquare.x++
        // }
        // if (this.keyboarder.on(Keyboarder.KEYS.UP, () => this.direction = 'up')) {
        //     newSquare.y--
        // }
        // if (this.keyboarder.on(Keyboarder.KEYS.DOWN, () => this.direction = 'down')) {
        //     newSquare.y++
        // }
    
        // newSquare.x = Math.max(newSquare.x, 0)
        // newSquare.x = Math.min(newSquare.x, this.game.squares.x - 1)
        // newSquare.y = Math.max(newSquare.y, 0)
        // newSquare.y = Math.min(newSquare.y, this.game.squares.y - 1)
    
        // if (newSquare.x !== this.square.x || newSquare.y !== this.square.y) {
        //   this.square.unshift(newSquare)
        // //   if (this.growing) {
        //     this.growing = false
        //   } else {
        //     this.newSquare.pop()
        //   }
        }
    



class Coin {
    constructor(game, pos) {
        this.game = game
        // this.direction = 'up'

    }

    update() {

    }

    draw() {
        let context = this.game.context
        context.fillStyle = COLORS.coin
        context.fillRect(GRID_SIZE * 6 + 15, GRID_SIZE * 3 + 15, 30, 30)

        // addCoin: function() {
        //     var coinPosition = [
        //         {x: this.size.width/2 -8*8, y:game.height/2 -8*8}, {x: game.width/2, y:game.height/2 -8*8}, {x: game.width/2 +8*8, y:game.height/2 -8*8},
        //         {x: game.width/2 -8*8, y:game.height/2}, {x: game.width/2, y:game.height/2}, {x: game.width/2 +8*8, y:game.height/2},
        //         {x: game.width/2 -8*8, y:game.height/2 +8*8},{x: game.width/2, y:game.height/2 +8*8}, {x: game.width/2 +8*8, y:game.height/2 +8*8},
        //     ];

        //     for (var i = 0; i < coinPosition.length; i++) {
        //         if (coinPosition[i].x == this.coin.x && coinPosition[i].y == this.coin.y)
        //             coinPosition.splice(i, 1);
        //         else if (coinPosition[i].x < this.square.x +7*8 && coinPosition[i].x > this.square.x -7*8 &&
        //             coinPosition[i].y < this.square.y +7*8 && coinPosition[i].y > this.square.y -7*8 )
        //             coinPosition.splice(i, 1);
        //     }

        //     var newPos = coinPosition[game.rnd.integerInRange(0, coinPosition.length -1)];

        //     this.coin.reset(newPos.x, newPos.y);
        //     game.add.tween(this.coin.scale).to({x:1, y:1}, 100).start();

        //     this.coinTaking = false;
        // },

    }


}




class Hazards {
    constructor(game, pos) {
        this.game = game
    }

    upate() {

    }

    draw() {
        let context = this.game.context
        context.fillStyle = COLORS.hazards
        context.fillRect(GRID_SIZE * 1 + 15, GRID_SIZE * 3 + 15, 30, 30)
    }
}



// make border solid for square and coin
// square moves on key press
// coin disappears when square gets to it and adds to score
// randomly generate coin location within border
// black squares move across the screen randomly
// black squares kill you when they hit you and score back to 0, but remain in same spot


// directions at bottom and high score

class Keyboarder {
    constructor() {
        this.keyState = {}

        window.addEventListener('keydown', function (e) {
            this.keyState[e.keyCode] = true
        }.bind(this))

        window.addEventListener('keyup', function (e) {
            this.keyState[e.keyCode] = false
        }.bind(this))
    }

    isDown(keyCode) {
        return this.keyState[keyCode] === true
    }

    on(keyCode, callback) {
        window.addEventListener('keydown', function (e) {
            if (e.keyCode === keyCode) {
                callback()
            }
        })
    }
}

Keyboarder.KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    S: 83
}

startGame()