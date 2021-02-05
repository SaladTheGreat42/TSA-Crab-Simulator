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
		var selector = new Entity(1396, 847, newImage("../../assets/crabClaw.png"))
		game.newEntity("clawSelector", selector) //Create selector

		var toggle = true;
		var finalToggle = true; //Prep choice code

		async function promiseLoop(toggle) {
			console.log(toggle)
			const inputPromise = new Promise((resolve, reject) => {
			document.addEventListener("keypress", e => {
				if(e.key == "Enter") reject(toggle)
				else if (e.key == "w" || e.key == "s"){
					resolve(toggle)
				}
			})
		})
			await inputPromise.then(async (toggle) => {
				toggle = !toggle;
				selector.delete()
				if (toggle == false) selector = game.newEntity("clawSelector", new Entity(1396, 947, newImage("./assets/crabClaw.png")))
				else if (toggle == true) selector = game.newEntity("clawSelector", new Entity(1396, 847, newImage("./assets/crabClaw.png")))

				console.log(toggle)
			 	await promiseLoop(toggle);
			}).catch((toggle) => {
				console.log(toggle)
				finalToggle = toggle
				return toggle;
		})
	}  //Choice code

		await promiseLoop(toggle);
		promptBox.delete()
		promptBackground.delete()
		selector.delete() // Delete everything

		await sleep(wait)
		return finalToggle // Return result

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
