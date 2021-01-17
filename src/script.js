import { Game } from "./engine/game.js"
import { Entity, Character } from "./engine/entity.js"

function onload() {
	window.game = new Game()
	game.initialize() // inital calls
	game.newEntity("test", new Entity(800, 400, newImage("./assets/gnome.png")))
	game.newEntity("characterTest", new Character(400, 800, newImages([
		"./assets/crab/crab_body.png",
		"./assets/crab/crab_arms.png",
		"./assets/crab/crab_eyes.png",
		"./assets/crab/crab_legs.png"
	])))
}

window.addEventListener("load", onload)
