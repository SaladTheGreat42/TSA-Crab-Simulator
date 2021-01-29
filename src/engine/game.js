class Game {

	constructor() {
		// puts canvas on the html doc
		this.canvas = make("canvas")
		document.body.appendChild(this.canvas)
		this.ctx = this.canvas.getContext("2d")
		this.entities = {}
		this.frameCounter = 0
		this.fpsInterval = 1000 / 60
		this.fpsThen = 0
	}

	loop(now) { // puts update and draw functions into one function
		let elapsed = now - this.fpsThen
		if(elapsed > this.fpsInterval) { // makes sure fps is locked at 60
			this.update()
			this.draw()
			this.fpsThen = now - (elapsed % this.fpsInterval)
		}
		//console.log(2)
		window.requestAnimationFrame(this.loop.bind(this)) // calls next frame + fancy stuff so "this" works
	}

	update() { // updates game logic
		for(let name of Object.keys(this.entities)) { // loop through every entity and update them
			this.entities[name].update()
		}
		this.frameCounter++
	}

/*
                   1920px
       -----------------------------
       |                           |
1080px |     16:9 aspect ratio     |
       |                           |
       |                           |
       -----------------------------

Game is automatically scaled from 1920x1080 to width and height of window.
Coordinates are in 1920x1080 but are scaled to fit whatever the current size is,
so (960, 540) is in the middle of the screen regardless of the actual size.

*/

	draw(timestep) { // draws to the screen
		// update canvas size
		this.canvas.height = window.innerHeight
		this.canvas.width = window.innerHeight * (16 / 9)
		this.ctx.scale(this.canvas.width / 1920, this.canvas.height / 1080)
		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		// test rectangle fills half of screen to test scaling
		this.ctx.beginPath()
		this.ctx.rect(0, 0, 960, 1080)
		this.ctx.fillStyle = "#272838"
		this.ctx.fill()

		for(let name of Object.keys(this.entities)) { // loop through every entity and draw it to screen
			this.entities[name].draw()
		}
	}

	debugText(text) {
		this.ctx.font = "16px Monaco"
		this.ctx.fillStyle = "#F9F8F8"
		this.ctx.fillText(text, 10, 26)
	}

	newEntity(name, entity) {
		entity.name = name
		this.entities[name] = entity
		return this.entities[name]
	}

	deleteEntity(name) {
		delete this.entities[name]
	}

}

export { Game }
