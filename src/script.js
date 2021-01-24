import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"
import { Crab } from "./engine/characters/crab.js"

async function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	game.newEntity("testbackground", new Entity(0, 0, newImage("./assets/under_da_sea.png")))
	game.newEntity("test", new Entity(400, 200, newImage("./assets/gnome.png")))
	//game.newEntity("textbackground", new Textbox(344, 800, newImage("./assets/textbox_background_test.png"), "Hello Crab."))
	//Textbox coords : 344, 800
	let player = game.newEntity("playerTest", new Crab(1000, 300, newImages({
		body: "./assets/crab/crab_body.png",
		arms: "./assets/crab/crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/crab/crab_legs.png"
	})))
	await sleep(1)
	await player.speak("Hello. My name is Inignome Montoya. You killed my\nfather. Prepare to die.", "yellow")
	await player.speak("Well, fuck.", "cyan")
}

window.addEventListener("load", onload)
