class Entity {
	constructor(x, y, image) {
		this.x = x
		this.y = y
		this.image = image
		this.color = "black"
		this.state = {
			speaking: false,
			moving: [0, 0, -1]
		}
		this.animation = {}
	}

	draw() {
		game.ctx.drawImage(this.image, this.x, this.y)
	}

	// time in seconds assuming 60 fps
	async move(x, y, time) {
		let endTime = Math.floor(game.frameCount + (60 * time))
		this.state.moving = [(x - this.x) / endTime, (y - this.y) / endTime, endTime]
		await sleep(time)
		return
	}

	async speak(string, wait = 1, textSpeed = 0.04, color = this.color || "black") {
		this.state.speaking = true
		let textbox = new Textbox(344, 800, newImage("../../assets/textbox_background_test.png"), "", color)

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
		if(textboxArray[textboxArray.length - 1][0] == "") textboxArray.pop() // if the last textbox is empty, delete

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
			textbox.state.done = true // adds little continue button in corner of textbox
			this.state.speaking = false
			await inputPromise()
			this.state.speaking = true
			textbox.state.done = false
			textbox.text = ""
		}
		this.state.speaking = false
		textbox.delete()
		await sleep(wait)
	}

	async prompt(string, optionArray, color = "black", wait = 1, textSpeed = 0.04) {
		this.state.speaking = true
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
		this.state.speaking = false
		await sleep(wait)
		textbox.delete()

		let promptBox = new Textbox(144, 800, newImage("../../assets/textbox_background_test.png"), string, color)
		game.newEntity("promptBox", promptBox) // Remove old texbox and create new one slightly displaced
		let promptBackground = new Textbox(1384, 800, newImage("../../assets/prompt_background_test.png"), "", "black")
		game.newEntity("promptBackground", promptBackground) //Prepare choice box
		for (let c of optionArray) {
			promptBackground.text += ` ${c}\n\n` // it works like this just trust me
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
		if(typeof this.state.moving == "undefined") {
			console.log(this)
		}
		//console.log(this.state, this.state.moving, this.state.moving[2])
		if(this.state.moving[2] >= game.frameCount) {
			this.x += this.state.moving[0]
			this.y += this.state.moving[1]
		} else {
			this.state.moving[2] = -1
		}
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
		this.state.done = false
	}

	draw() {
		game.ctx.drawImage(this.image, this.x, this.y)
		game.ctx.fillStyle = colorBank[this.color]
		game.ctx.font = "46px Lucida Console"
		let lines = this.text.split("\n")
		for(let line in lines) {
			game.ctx.fillText(lines[line], this.x+40, this.y+80 + (line * 58))
		}
		// if(this.state == 1) game.ctx.fillRect(this.x + 1230 - 20 - 20, this.y + 253 - 20 - 20, 20, 20)
		if(this.state.done) game.ctx.fillRect(this.x + 1190, this.y + 213, 20, 20)
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
