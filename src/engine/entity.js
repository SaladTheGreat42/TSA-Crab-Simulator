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
		game.ctx.font = "50px Arial" // TODO figure out a good font
		let lines = this.text.split("\n")
		for(let line in lines) {
			game.ctx.fillText(lines[line], this.x+40, this.y+90 + (line * 50))
		}
		if(this.state == 1) game.ctx.fillRect(this.x + 1230 - 20 - 20, this.y + 253 - 20 - 20, 20, 20)
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

	// TODO get input from player
	async speak(string, color = "black", wait = 1, textSpeed = 0.04) {
		let textbox = new Textbox(344, 800, newImage("../../assets/textbox_background_test.png"), "", color)
		game.newEntity("textbox", textbox)
		for(let c of string) {
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
		textbox.state = 1
		await new Promise((resolve, reject) => {
			document.addEventListener("keypress", e => {
				if(e.key == "Enter") resolve()
			})
		})
		textbox.delete()
		await sleep(wait)
	}
}

/*
function tokenize(string) {
	let array = []
	while(string.length != 0) {
		if(string.startsWith("\n")) {
			array.push("<br>")
			string = string.substring(2)
		} else {
			array.push(string[0])
			string = string.substring(1)
		}
	}
	return array
}
*/

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
