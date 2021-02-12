class BlackScreen {
	constructor(state) {
		this.alpha = 0
	}

	async fadeOut() {
		for(let i = 0; i < 60; i++) {
			this.alpha = i / 59
			await game.frame()
		}
		return
	}

	async fadeIn() {
		for(let i = 0; i < 60; i++) {
			this.alpha = 1 - i / 59
			await game.frame()
		}
		return
	}

	draw() {
		game.ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`
		game.ctx.fillRect(0, 0, 1920, 1080)
	}

}

export { BlackScreen }
