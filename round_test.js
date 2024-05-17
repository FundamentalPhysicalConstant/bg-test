const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const IMAGE_URL = 'round_green.png'
const IMAGE_WIDTH = 800
const IMAGE_HEIGHT = 800

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const CENTER_X = WIDTH / 2
const CENTER_Y = HEIGHT / 2

canvas.width = WIDTH
canvas.height = HEIGHT

function makeRound(x, y, areaMinX, areaMaxX, areaMinY, areaMaxY) {
    const object = {
        x: x,
        y: y,
        dirX: 0,
        dirY: 0,
        interval: 0,
        resetInterval: 20,
        maxSpeed: 15,
        areaMinX: areaMinX,
        areaMaxX: areaMaxX,
        areaMinY: areaMinY,
        areaMaxY: areaMaxY,
        image: null,

        update(ctx) {
            this.calculatePos()
            this.drawImage(ctx)
        },

        drawImage(ctx) {
            const x = Math.round(this.x)
            const y = Math.round(this.y)
            this.image.opacity = 0.1
            ctx.drawImage(this.image, x - IMAGE_WIDTH/2, y - IMAGE_HEIGHT/2, IMAGE_WIDTH, IMAGE_HEIGHT)
        },
    
        calculatePos() {
            if (this.interval === this.resetInterval) {
                this.interval = 0
                const dirX = (this.x - this.areaMinX) / (this.areaMaxX - this.areaMinX)
                const dirY = (this.y - this.areaMinY) / (this.areaMaxY - this.areaMinY)
                this.dirX += (Math.random() < dirX ? -1 : 1)
                this.dirY += (Math.random() < dirY ? -1 : 1)
            }

            if (this.dirX < 0 && Math.abs(this.dirX) > this.maxSpeed) this.dirX = -this.maxSpeed
            else if (this.dirX > 0 && Math.abs(this.dirX) > this.maxSpeed) this.dirX = this.maxSpeed

            if (this.dirY < 0 && Math.abs(this.dirY) > this.maxSpeed) this.dirY = -this.maxSpeed
            else if (this.dirY > 0 && Math.abs(this.dirY) > this.maxSpeed) this.dirY = this.maxSpeed

            this.x += this.dirX / 20
            this.y += this.dirY / 20

            this.interval++
        },
    }

    const image = new Image()
    image.src = IMAGE_URL

    object.image = image

    return object
}

const round1 = makeRound(0, 0, 0, WIDTH, 0, HEIGHT)
const round2 = makeRound(WIDTH, HEIGHT, 0, WIDTH, 0, HEIGHT)

function run() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    round1.update(ctx)
    round2.update(ctx)

    window.requestAnimationFrame(() => run())
}

run()