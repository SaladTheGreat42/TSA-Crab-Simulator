function onload() {
	const game = new Game()
	game.draw()
}

function resizeCanvas(canvas) {

}

class Game {

	constructor() {
		this.canvas = id("canvas")
		this.ctx = this.canvas.getContext("2d")
		this.timestamp = 0
	}

	draw(timestep) {
		//console.log(this)
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.font = "32px Comic Sans MS"
		this.ctx.fillText("CrabSimulator.com", 10, 10 + 32)
		this.ctx.fillText(this.calculateFPS(performance.now()), 10, 40 + 32)
		//console.log(this.calculateFPS(performance.now()))
		window.requestAnimationFrame(this.draw.bind(this))
	}

	calculateFPS(timestamp) {
		let elapsed = timestamp - this.timestamp
		this.timestamp = timestamp
		return 1000 / elapsed
	}

}

window.addEventListener("load", onload)
