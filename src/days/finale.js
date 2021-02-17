import { Game } from "../engine/game.js"
import { Entity, Character, Textbox } from "../engine/entity.js"
import { Crab } from "../engine/characters/crab.js"
import { BlackScreen } from "../engine/entities/blackScreen.js"
import { Boat } from "../engine/entities/boat.js"

export async function execute() {

	// initialize all characters, backgrounds, etc. here
	let background = game.newEntity("background", new Entity(0, 0, newImage("./assets/finaleDay/background_1.png")))
	background.color = "green"
	let player = game.newEntity("player", new Crab(1000, 492, newImages({
		body: "./assets/crab/crab_body.png",
		arms: "./assets/crab/crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/crab/crab_legs.png",
		arms_1: "./assets/crab/crab_arms_1.png",
		legs_1: "./assets/crab/crab_legs_1.png"
	}), ["body", "arms", "eyes", "legs"], "cyan"))
	if(game.variables.pirateIntervene) {
		var pirate = game.newEntity("pirateCrab", new Crab(81, 398, newImages({
			body: "./assets/pirateCrab/pirate_crab_body.png",
			arms: "./assets/pirateCrab/pirate_crab_arms.png",
			eyes: "./assets/crab/crab_eyes.png",
			hat: "./assets/pirateCrab/pirate_crab_hat.png",
			legs: "./assets/pirateCrab/pirate_crab_legs.png",
			arms_1: "./assets/pirateCrab/pirate_crab_arms_1.png",
			legs_1: "./assets/pirateCrab/pirate_crab_legs_1.png"
		}), ["body", "arms", "hat", "eyes", "legs"], "darkBlue"))
	}
	let orangeCrab = game.newEntity("orangeCrab", new Crab(459, 372, newImages({
		body: "./assets/orangeCrab/orange_crab_body.png",
		arms: "./assets/orangeCrab/orange_crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/orangeCrab/orange_crab_legs.png",
		arms_1: "./assets/orangeCrab/orange_crab_arms_1.png",
		legs_1: "./assets/orangeCrab/orange_crab_legs_1.png"
	}), ["body", "arms", "eyes", "legs"], "orange"))
	if(!game.variables.sand) {
		var blueCrab = game.newEntity("blueCrab", new Crab(277, 486, newImages({
			body: "./assets/blue_crab/blue_crab_body.png",
			arms: "./assets/blue_crab/blue_crab_arms.png",
			eyes: "./assets/crab/crab_eyes.png",
			legs: "./assets/blue_crab/blue_crab_legs.png",
			arms_1: "./assets/blue_crab/blue_crab_arms_1.png",
			legs_1: "./assets/blue_crab/blue_crab_legs_1.png"
		}), ["body", "arms", "eyes", "legs"], "blue"))
	}
	let oldMan = game.newEntity("oldMan", new Crab(525, 549, newImages({
		body: "./assets/oldManCrab/old_crab_body.png",
		arms: "./assets/oldManCrab/old_crab_arms.png",
		eyes: "./assets/oldManCrab/old_crab_eyes.png",
		legs: "./assets/oldManCrab/old_crab_legs.png",
		arms_1: "./assets/oldManCrab/old_crab_arms_1.png",
		legs_1: "./assets/oldManCrab/old_crab_legs_1.png"
	}), ["body", "arms", "eyes", "legs"], "gray"))
	let yellowCrab = game.newEntity("yellowCrab", new Crab(135, 625, newImages({
		body: "./assets/yellowCrab/yellow_crab_body.png",
		arms: "./assets/yellowCrab/yellow_crab_arms.png",
		eyes: "./assets/crab/crab_eyes.png",
		legs: "./assets/yellowCrab/yellow_crab_legs.png",
		arms_1: "./assets/yellowCrab/yellow_crab_arms_1.png",
		legs_1: "./assets/yellowCrab/yellow_crab_legs_1.png"
	}), ["body", "arms", "eyes", "legs"], "yellow"))
	let boat = game.newEntity("boat", new Boat(-1150, -75, newImages({
		boat: "./assets/boat/boat.png",
		rudder0: "./assets/boat/rudder_0.png",
		rudder1: "./assets/boat/rudder_1.png",
		rudder2: "./assets/boat/rudder_2.png",
		rudder3: "./assets/boat/rudder_3.png"
	})))

	await game.fadeIn() // fade from black
	await sleep(.5) // wait a little before jumping into action

	await player.speak("This is it, the highest point in the bay.")
	await oldMan.speak("And you're sure that's what the fish was talking about?", 0.5, 0.06)
	await player.speak("No doubt about it. A shadow, loud noise, it's all there.", 1)
	await oldMan.speak("We're all rootin' for you, kid.", 0.25, 0.06)
	if(!game.variables.sand) await blueCrab.speak("Ay, I know you can do it!", 0.25)
	await orangeCrab.speak("Dude, you got this.", 0.25)
	await yellowCrab.speak("Knock 'em outta the park!", 0.25)
	if(game.variables.pirateIntervene) await pirate.speak("Blow the man down!", 0.25)

	await sleep(0.5)
	await player.move(1272, 80, 3)
	await sleep(0.5)

	await player.speak("It's getting louder. I think this is it.")
	await boat.move(boat.x + 1000, boat.y, 6)


	// boat comes

	game.blackScreen.alpha = 1

	// set up for next screen

	await sleep(2)
	await game.fadeIn()

	await game.fadeOut()

}
