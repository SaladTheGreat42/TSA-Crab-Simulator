import { Entity } from "../entity.js"

class Boat extends Entity {
	constructor(x, y, imageBank) {
		super(x, y)
		this.imageBank = imageBank
		this.image = imageBank.boat
		this.rudder = imageBank.rudder0
		this.rudderState = 0
	}

	update() {
		super.update()
		if(!(game.frameCount % 3)) {
			switch(this.rudderState) {
				case 0:
					this.rudder = this.imageBank.rudder1
					this.rudderState = 1
					break
				case 1:
					this.rudder = this.imageBank.rudder2
					this.rudderState = 2
					break
				case 2:
					this.rudder = this.imageBank.rudder3
					this.rudderState = 3
					break
				case 3:
					this.rudder = this.imageBank.rudder0
					this.rudderState = 0
					break
			}
		}
	}

	draw() {
		super.draw()
		// rudder
		game.ctx.drawImage(this.rudder, this.x - 35, this.y + 112, this.rudder.width * this.scale, this.rudder.height * this.scale)
	}

}

export { Boat }
