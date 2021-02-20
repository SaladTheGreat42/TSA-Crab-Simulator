import { Game } from "../engine/game.js"
import { Entity, Character, Textbox } from "../engine/entity.js"
import { Crab } from "../engine/characters/crab.js"

export async function execute() {

	// initialize all characters, backgrounds, etc. here
	game.newEntity("testbackground", new Entity(0, 0, newImage("./assets/legacy/under_da_sea.png")))
	let gnome = game.newEntity("gnome", new Entity(400, 200, newImage("./assets/legacy/gnome.png")))
	gnome.color = "yellow"
	let player = game.newEntity("playerTest", new Crab(1000, 300, newImages({
		body: "./assets/crab/crab_body.png",
		arms: "./assets/crab/crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/crab/crab_legs.png",
		arms_1: "./assets/crab/crab_arms_1.png",
		legs_1: "./assets/crab/crab_legs_1.png"
	}), ["body", "arms", "eyes", "legs"], "cyan"))

	await game.fadeIn() // fade from black
	await sleep(.5) // wait a little before jumping into action

	let choice = await gnome.prompt("Testing testing 1 2 3.", ["Convince the", "Educate the"]) // 32 characters
	choice = await gnome.prompt("Testing testing 1 2 3.", ["Convince the\n others", "Educate the\n others"], 1, 0.04, true) // 32 characters
	if(choice) { // left
		await player.move(player.x - 300, player.y, 1)
	} else { // right
		await player.move(player.x + 300, player.y, 1)
	}

	await sleep(1)

	await player.speak("Dope.")

	choice = await gnome.prompt("Are you obama", ["Yes", "No"])
	if (choice){
		await player.speak("Yes.")
		await gnome.speak("Wowowsds.")
	} else {
		await player.speak("No.")
		await gnome.speak("Wwowo")
	}

	await sleep(1)
	await gnome.speak("Hello. My name is Inignome Montoya. You killed my father. Prepare to die.")
	await player.speak("Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.")

	await game.fadeOut()

}
