import { Character } from "../entity.js"

class Crab extends Character {
	constructor(x, y, images) {
		super(x, y, images)
		this.state = 0
		/*
			0 - resting
			1 - looking right
			2 - looking left
			3 - clicking / speaking
			4 - scuttling
		*/
	}

	draw() {
		let i = 0
		for(let image in this.images) {
			game.ctx.drawImage(this.images[image].image, this.curveOffset(this.x + this.images[image].x, i), this.curveOffset(this.y + this.images[image].y, i - 1))
			i++
		}
	}

	lookDirection(direction) {
		// 1 for right, -1 for left, 0 for reset
		this.images["eyes"].x = direction * 20
	}

	/*
	changeState(newState) {
		this.state = newState
		this.images["eyes"].x = 0
		this.images["arms"].image = newImage("./assets/crab/crab_arms.png")
		switch(this.state) {
			case 0:
				break
			case 1:
				this.images["eyes"].x = 20
				break
			case 2:
				this.images["eyes"].x = -20
				break
			case 3:
				this.images["arms"].image = newImage("./assets/crab/crab_arms_1.png")
				break
			case 4:
				break
		}
	}
	*/
}

export { Crab }
