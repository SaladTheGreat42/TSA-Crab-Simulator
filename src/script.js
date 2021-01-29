import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"
import { Crab } from "./engine/characters/crab.js"

async function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	let option = await menu()
	if(option) { // game
		game.newEntity("testbackground", new Entity(0, 0, newImage("./assets/under_da_sea.png")))
		let gnome = game.newEntity("test", new Entity(400, 200, newImage("./assets/gnome.png")))
		gnome.color = "yellow"
		//game.newEntity("textbackground", new Textbox(344, 800, newImage("./assets/textbox_background_test.png"), "Hello Crab."))
		//Textbox coords : 344, 800
		let player = game.newEntity("playerTest", new Crab(1000, 300, newImages({
			body: "./assets/crab/crab_body.png",
			arms: "./assets/crab/crab_arms.png",
			eyes: "./assets/crab/crab_eyes.png",
			legs: "./assets/crab/crab_legs.png"
		}), "cyan"))
		await sleep(1)
		await gnome.speak("Hello. My name is Inignome Montoya. You killed my\nfather. Prepare to die.")
		await player.speak("Well fuck")
	} else { // credits
		game.newEntity("creditsTest", new Entity(0, 0, newImage("./assets/creditsTest.png")))
	}
}

async function menu() {
	let toggle = true // true if on play button, false if on credits button
	game.newEntity("menu", new Entity(0, 0, newImage("./assets/mainMenuTest.png")))
	let selector = game.newEntity("selector", new Entity(570, 550, newImage("./assets/selector.png")))

	while(true) {
		let input = await inputPromise()
		if(input == "Enter") return toggle
		if(["w", "s", "ArrowUp", "ArrowDown"].includes(input)) {
			toggle = toggle ? false : true
			if(toggle) {
				selector.y = 550
			} else {
				selector.y = 750
			}
		}
	}
	
};

window.addEventListener("load", onload)
