import { Game } from "./engine/game.js"
import { Entity, Character } from "./engine/entity.js"

function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	game.newEntity("test", new Entity(800, 400, newImage("./assets/gnome.png")))
	game.newEntity("playerTest", new Character(400, 800, newImages({
		body: "./assets/crab/crab_body.png",
		arms: "./assets/crab/crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/crab/crab_legs.png"
	})))
}

window.addEventListener("load", onload)
