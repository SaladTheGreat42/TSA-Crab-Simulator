import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"

function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	game.newEntity("testbackground", new Entity(0, 0, newImage("./assets/under_da_sea.png")))
	game.newEntity("test", new Entity(400, 200, newImage("./assets/gnome.png")))
	game.newEntity("textbackground", new Textbox(344, 800, newImage("./assets/textbox_background_test.png"), "Hello Crab."))
//Textbox coords : 344, 800
	game.newEntity("playerTest", new Character(1000, 300, newImages({
		body: "./assets/crab/crab_body.png",
		arms: "./assets/crab/crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/crab/crab_legs.png"
	})))
}

window.addEventListener("load", onload)
