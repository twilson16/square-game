const Grid_size = 60
const ticks_per_move = 10
const Colors = {
    background: 'darkblue',
    square: '#FFFFFF',
    wall: '#FFFFFF',
    bullets: '#000000',
    
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
        this.square = new Square(this, {
            x: Math.floor(this.size.width / 2),
            y: Math.floor(this.size.height / 2)})
    }

    

    update() {

    }

    draw() {
        this.context.clearRect(0, 0, this.size.width, this.size.height)

        this.background()
        this.grid()
        this.border()

        this.square.draw()

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
        this.context.strokeStyle = '#FFFFFF';
        this.context.lineWidth = 20;
        this.context.strokeRect(150, 150, 300, 300);
    }

    background() {
        this.context.fillStyle = '#000f85';
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    grid() {
        this.context.strokeStyle = Colors.wall
        this.context.lineWidth = 1

        this.context.beginPath()
        for (var x = 0; x < this.size.width; x += Grid_size) {
            this.context.moveTo(x, 0)
            this.context.lineTo(x, this.size.height)
        }

        for (var y = 0; y < this.size.height; y += Grid_size) {
            this.context.moveTo(0, y)
            this.context.lineTo(this.size.width, y)
        }

        this.context.stroke()
    }




}


class Square {
    constructor (game, pos) {
        this.game = game
        
    }


    update() {
    
    }

    draw() {
        let context = this.game.context
        context.fillStyle = 'red'
        context.fillRect(Grid_size*3 + 5, Grid_size*6 +5, 50, 50)
    }
}

startGame()