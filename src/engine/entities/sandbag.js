import { Entity, Character } from "../entity.js"

class Sandbag extends Entity {
	constructor(image) {
		super(0, 0, image)
		this.locked = true
	}

	update() {
		super.update()
		if(this.locked) {
			//console.log(game.entities)
			this.x = game.entities.blueCrab.x + game.entities.blueCrab.images.arms.x + this.curveOffset()
			this.y = game.entities.blueCrab.y + game.entities.blueCrab.images.arms.y + this.curveOffset() - 20
		}
	}

	curveOffset() {
		return Math.sin(game.frameCount / 40) * 10
	}

}

export { Sandbag }
