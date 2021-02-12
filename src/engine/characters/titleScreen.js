import { Character } from "../entity.js"

class TitleScreenWaves extends Character {
	constructor(x, y, imageBank, images, color) {
		super(x, y, imageBank, images, color)
	}

	update() {
		this.x = this.animationFunction() - 129
		this.y = this.animationFunction() - 129
	}

	animationFunction() {
		return Math.sin(game.frameCount / 150) * 120
	}
}

class TitleScreenController {
	constructor() {
		this.state = true
		this.selection = true
		this.alpha = 1
	}

	async fade(state) {
		for(let i = 0; i < 30; i++) {
			this.alpha = 1 - i * 2 / 59
			await game.frame()
		}
		this.state = state
		for(let i = 0; i < 30; i++) {
			this.alpha = i * 2 / 59
			await game.frame()
		}
	}

	async start() {
		while(true) {
			let input = await inputPromise()
			if(input == "Enter") {
				if(this.state) { // if first screen
					if(this.selection) { // if over start button
						return // start game
					} else { // opens credits
						await this.fade(false)
					}
				} else { // closes credits
					await this.fade(true)
				}
			}
			if(["a", "d", "ArrowRight", "ArrowLeft"].includes(input)) {
				if(this.state) this.selection = this.selection ? false : true
			}
		}
	}

	draw() {
		game.ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
		if(this.state) {
			game.ctx.textAlign = "center"
			game.ctx.font = "130px Lucida Console"
			game.ctx.fillText("Crab", 1403, 584)
			game.ctx.fillText("Simulator", 1403, 712)
			game.ctx.font = "73px Lucida Console"
			game.ctx.textAlign = "left"
			if(this.selection) {
				game.ctx.fillText("      | Credits", 1074, 801)
				game.ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`
				game.ctx.fillText("Start", 1074, 801)
			} else {
				game.ctx.fillText("Start | ", 1074, 801)
				game.ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`
				game.ctx.fillText("        Credits", 1074, 801)
			}
		} else {
			game.ctx.font = "73px Lucida Console"
			game.ctx.textAlign = "center"
			// y of text = 500 + (73 * line) + 15
			game.ctx.fillText("Made by Jacob Johnson", 1403, 500)
			game.ctx.fillText("and Roger Cronin.", 1403, 588)
			game.ctx.fillText("More text here,", 1403, 676)
			game.ctx.fillText("eventually.", 1403, 764)
			game.ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`
			game.ctx.fillText("Back", 1403, 852)
		}
	}

	update() {

	}

}

export { TitleScreenWaves, TitleScreenController }
