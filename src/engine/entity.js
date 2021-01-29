class Entity {
	constructor(x, y, image) {
		this.x = x
		this.y = y
		this.image = image
	}

	draw() {
		game.ctx.drawImage(this.image, this.x, this.y)
	}

	async speak(string, wait = 1, textSpeed = 0.04, color = this.color || "black") {
		let textbox = new Textbox(344, 800, newImage("../../assets/textbox_background_test.png"), "", color)

		// TODO : Split long text into multiple Textboxes
		string = string.split(" ")
		let textArray = [""]
		let l = 0

		for(let word of string) {
			if(textArray[l].length + word.length > 41) {
				l++
				textArray[l] = word + " "
			} else {
				textArray[l] += word + " "
			}
		}

		game.newEntity("textbox", textbox)
		for(let line in textArray) {
			for(let c of textArray[line]) {
				textbox.text += c
				switch(c) {
					case ".":
					case "!":
					case "?":
					case ";":
						await sleep(.5) // full stop sleep
						break
					case ",":
					case ":":
						await sleep(.25) // half stop sleep
						break
					default:
						await sleep(textSpeed)
				}
			}
			textbox.text += "\n"
		}

		textbox.state = 1 // adds little continue button in corner of textbox
		await inputPromise()
		textbox.delete()
		await sleep(wait)
	}

	update() {

	}

	delete() {
		game.deleteEntity(this.name)
	}
}

//Textbox coords : 344, 800

class Textbox extends Entity {
	constructor(x, y, image, text, color){
		super(x, y)
		this.x = x
		this.y = y
		this.image = image
		this.text = text
		this.color = color
		this.state = 0
	}

	draw() {
		game.ctx.drawImage(this.image, this.x, this.y)
		game.ctx.fillStyle = colorBank[this.color]
		// this.ctx.font = "16px Monaco"
		game.ctx.font = "46px Lucida Console" // TODO figure out a good font
		let lines = this.text.split("\n")
		for(let line in lines) {
			game.ctx.fillText(lines[line], this.x+40, this.y+80 + (line * 58))
		}
		// if(this.state == 1) game.ctx.fillRect(this.x + 1230 - 20 - 20, this.y + 253 - 20 - 20, 20, 20)
		if(this.state == 1) game.ctx.fillRect(this.x + 1190, this.y + 213, 20, 20)
	}

}

class Character extends Entity {
	constructor(x, y, images, color) {
		super(x, y)
		this.color = color
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

const colorBank = {
	red: "#FF0000",
	yellow: "#FFD700",
	green: "#008000",
	blue: "#1E90FF",
	purple: "#BA55D3",
	cyan: "#008B8B",
	white: "#FFFFFF",
	black: "#000000"
}

export { Entity, Character, Textbox }
