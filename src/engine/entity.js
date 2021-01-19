class Entity {
	constructor(x, y, image) {
		this.x = x
		this.y = y
		this.image = image
	}

	draw() {
		game.ctx.drawImage(this.image, this.x, this.y)
	}

	update() {

	}

	delete() {
		game.deleteEntity(this.name)
	}
}

class Character extends Entity {
	constructor(x, y, images) {
		super(x, y)
		this.images = {}
		for(let image in images) {
			this.images[image] = {}
			this.images[image].image = images[image]
			this.images[image].x = 0
			this.images[image].y = 0
		}
	}

	draw() {
		let i = 0
		for(let image in this.images) {
			game.ctx.drawImage(this.images[image].image, this.curveOffset(this.x + this.images[image].x, i), this.curveOffset(this.y + this.images[image].y, i - 1))
			i++
		}
	}

	curveOffset(value, seed) {
		return value + (Math.sin((game.frameCounter - (seed * 12)) / 40) * 10)
	}
}

export { Entity, Character }
