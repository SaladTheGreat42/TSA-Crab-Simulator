class Game {

	constructor() {
		// puts canvas on the html doc
		this.canvas = make("canvas")
		document.body.appendChild(this.canvas)
		this.ctx = this.canvas.getContext("2d")
		this.perf = 0 // for FPS calulation
	}

	initialize() { // puts initial update and draw functions into one function
		this.update()
		this.draw()
		window.requestAnimationFrame(this.initialize.bind(this)) // calls next frame
	}

	update() { // updates game logic

	}

	draw(timestep) { // draws to the screen
		// update canvas size
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		//this.ctx.scale()
		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "#272838";
		this.ctx.fill();

		this.ctx.font = "32px Comic Sans MS"
		this.ctx.fillStyle = "#F9F8F8";
		this.ctx.fillText(this.calculateFPS(), 10, 10 + 32) // fps counter
	}

	calculateFPS() { // returns fps
		let perf = performance.now()
		let elapsed = perf - this.perf
		this.perf = perf
		return 1000 / elapsed
	}

}

export { Game }
