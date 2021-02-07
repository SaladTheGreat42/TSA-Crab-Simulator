import { Character } from "../entity.js"

class Crab extends Character {
	constructor(x, y, imageBank, images, color) {
		super(x, y, imageBank, images, color)
		this.animation = {
			clacking: false,
			legsRaised: false
		}
	}

	update() {
		super.update()
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
				this.images["arms"].image = this.imageBank.arms
			}
		}
		if(!(game.frameCount % 10)) {
			if(this.state.moving[2] != -1) {
				if(this.animation.legsRaised) {
					this.animation.legsRaised = false
					this.images["legs"].image = this.imageBank.legs_1
				} else {
					this.animation.legsRaised = true
					this.images["legs"].image = this.imageBank.legs
				}
			} else {
				this.animation.legsRaised = false
				this.images["legs"].image = this.imageBank.legs
			}
		}
	}

	lookDirection(direction) {
		// 1 for right, -1 for left, 0 for reset
		this.images["eyes"].x = direction * 20
	}

}

export { Crab }
