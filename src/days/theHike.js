import { Game } from "../engine/game.js"
import { Entity, Character, Textbox } from "../engine/entity.js"
import { Crab } from "../engine/characters/crab.js"

export async function execute() {

	// initialize all characters, backgrounds, etc. here
	game.newEntity("background", new Entity(0, 0, newImage("./assets/under_da_sea.png")))
	let player = game.newEntity("player", new Crab(1000, 300, newImages({
		body: "./assets/crab/crab_body.png",
		arms: "./assets/crab/crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/crab/crab_legs.png",
		arms_1: "./assets/crab/crab_arms_1.png",
		legs_1: "./assets/crab/crab_legs_1.png"
	}), ["body", "arms", "eyes", "legs"], "cyan"))

	await game.fadeIn() // fade from black
	await sleep(.5) // wait a little before jumping into action

	await game.fadeOut()

}
