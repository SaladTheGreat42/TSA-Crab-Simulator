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
		this.images = images
	}

	draw() {
		for(let index in this.images) {
			game.ctx.drawImage(this.images[index], this.curveOffset(this.x, index), this.curveOffset(this.y, index - 5))
		}
	}

	curveOffset(value, seed) {
		return value + (Math.sin((game.frameCounter - (seed * 25)) / 100) * 7)
	}
}

export { Entity, Character }
