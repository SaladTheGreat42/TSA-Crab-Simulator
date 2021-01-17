class Game {

	constructor() {
		// puts canvas on the html doc
		this.canvas = make("canvas")
		document.body.appendChild(this.canvas)
		this.ctx = this.canvas.getContext("2d")
		this.perf = 0 // for FPS calulation
	}

	initialize() { // puts initial update and draw functions into one function

		this.image = make("img")
		this.image.src = "./assets/gnome.png"

		this.update()
		this.draw()
		window.requestAnimationFrame(this.initialize.bind(this)) // calls next frame + fancy stuff so "this" works
	}

	update() { // updates game logic

	}

/*
                   1920px
       -----------------------------
       |                           |
1080px |     16:9 aspect ratio     |
       |                           |
       |                           |
       -----------------------------

Game is automatically scaled from 1920x1080 to width and height of window
Coordinates are in 1920x1080 but are scaled to fit whatever the current size is,
so (960, 540) is in the middle of the screen regardless of the actual size

*/

	draw(timestep) { // draws to the screen
		// update canvas size
		this.canvas.height = window.innerHeight
		this.canvas.width = window.innerHeight * (16/9)
		this.ctx.scale(this.canvas.width / 1920, this.canvas.height / 1080)
		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		// test rectangle fills half of screen to test scaling
		this.ctx.beginPath()
		this.ctx.rect(0, 0, 960, 1080)
		this.ctx.fillStyle = "#272838"
		this.ctx.fill()

		this.debugText(`${Math.floor(this.calculateFPS())} fps`)

		this.ctx.drawImage(this.image, 960, 540)
	}

	debugText(text) {
		this.ctx.font = "32px Comic Sans MS"
		this.ctx.fillStyle = "#F9F8F8";
		this.ctx.fillText(text, 10, 42)
	}

	calculateFPS() { // returns fps
		let perf = performance.now()
		let elapsed = perf - this.perf
		this.perf = perf
		return 1000 / elapsed
	}

}

export { Game }
