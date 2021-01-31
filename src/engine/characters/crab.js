import { Character } from "../entity.js"

class Crab extends Character {
	constructor(x, y, imageBank, images, color) {
		super(x, y, imageBank, images, color)
		this.animation = {
			clacking: false
		}
	}

	update() {
		if(!(game.frameCount % 15)) {
			if(this.state.speaking) {
				if(this.animation.clacking) {
					this.animation.clacking = false
					this.images["arms"].image = this.imageBank.arms_1
				} else {
					this.animation.clacking = true
					this.images["arms"].image = this.imageBank.arms
				}
			} else {
				this.animation.clacking = false
			}
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
