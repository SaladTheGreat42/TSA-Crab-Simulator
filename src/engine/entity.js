class Entity {
	constructor(x, y, image) {
		this.x = x
		this.y = y
		this.image = image
		this.color = "black"
		this.state = {
			speaking: false
		}
		this.animation = {}
	}

	draw() {
		game.ctx.drawImage(this.image, this.x, this.y)
	}


	async speak(string, wait = 1, textSpeed = 0.04, color = this.color || "black") {
		this.state.speaking = true
		let textbox = new Textbox(344, 800, newImage("../../assets/textbox_background_test.png"), "", color)

		// TODO : Split long text into multiple Textboxes
		string = string.split(" ")
		let textboxArray = [[""]] // 2D array inf. x 3 containing lines within textboxes
		let t = 0
		let l = 0

		for(let word of string) {
			if(textboxArray[t][l].length + word.length > 41) {
				l++
				if(l > 2) { // 2 because line index starts at 0
					l = 0
					t++
				}
				textboxArray[t + 1] = [""]
				textboxArray[t][l] = word + " "
			} else {
				textboxArray[t][l] += word + " "
			}
		}
		textboxArray.pop() // delete blank textbox

		game.newEntity("textbox", textbox)

		for(let currentTextbox of textboxArray) {
			for(let line in currentTextbox) {
				for(let c of currentTextbox[line]) {
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
			this.state.speaking = false
			await inputPromise()
			this.state.speaking = true
			textbox.state = 0
			textbox.text = ""
		}
		textbox.delete()
		await sleep(wait)
	}
	async prompt(string, optionArray, color = "black", wait = 1, textSpeed = 0.04) {
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
		await sleep(wait)
		textbox.delete()

		let promptBox = new Textbox(144, 800, newImage("../../assets/textbox_background_test.png"), string, color)
		game.newEntity("promptBox", promptBox) // Remove old texbox and create new one slightly displaced
		let promptBackground = new Textbox(1384, 800, newImage("../../assets/prompt_background_test.png"), "", "black")
		game.newEntity("promptBackground", promptBackground) //Prepare choice box
		for (let c of optionArray) {
			promptBackground.text += "  "
			promptBackground.text += c
			promptBackground.text += "\n"
			promptBackground.text += "\n"
		}
		var selector = new Entity(1396, 837, newImage("../../assets/crabClaw.png"))
		game.newEntity("clawSelector", selector) //Create selector

		var toggle = true; //Prep choice code

		while(true) { // Choice code, wtf is .includes
			let input = await inputPromise()
			if(input == "Enter") {
				promptBox.delete()
				promptBackground.delete()
				selector.delete() // Delete everything

				await sleep(wait)
				return toggle // Return result
			}
			if(["w", "s", "ArrowUp", "ArrowDown"].includes(input)) {
				toggle = toggle ? false : true
				if(toggle) {
					selector.y = 837
				} else {
					selector.y = 957
				}
			}
		}



	}
	update() {

	}

	delete() {
		game.deleteEntity(this.name)
	}
}

//Textbox coords : 344, 800
//Textbox dimensions : 253, 1230
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
	constructor(x, y, imageBank, images, color) {
		super(x, y)
		this.color = color
		this.imageBank = imageBank
		this.images = {}
		for(let name of images) {
			this.images[name] = {}
			this.images[name].image = imageBank[name]
			this.images[name].x = 0
			this.images[name].y = 0
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
		return value + (Math.sin((game.frameCount - (seed * 12)) / 40) * 10)
	}


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
