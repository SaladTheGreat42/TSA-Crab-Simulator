import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"
import { Crab } from "./engine/characters/crab.js"
import { TitleScreenWaves, TitleScreenController } from "./engine/characters/titleScreen.js"

// debug makes it so you don't have to sit through 6 seconds of title text before starting, and it uses a different queue than normal
const debug = true

async function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	let option = await menu()
	const actOneQueue = debug ? ["./days/callToAction.js"] : ["./days/oldMan.js", "./days/peerPressure.js", "./days/strangeEncounters.js", "./days/theHike.js", "./days/debugDay.js"]
	await game.fadeOut()
	game.clearEntities()
	if(!debug) await game.titleText("Act 1 - Ex Nihilo", 3)
	// Act 2 - Exigence?
	// Act 3 - Finalis?

	// act 1 days
	for(let day of actOneQueue) {
		game.day++
		if(!debug) await game.titleText(`Day ${game.day}`, 3)
		day = await import(day)
		// put await game.fadeIn() at the beginning of every day
		await day.execute()
		// put await game.fadeOut() at the end of every day
		game.clearEntities()
	}

	if(!debug) await game.titleText("Act 2 - Exigence", 3)
	game.day++
	await game.titleText("Day 5", 3)
	// comment out once this exists
	//let day = await import("./days/meetup.js")
	//await day.execute()
	//game.clearEntities()
	game.day++
	await game.titleText("Day 6", 3)
	day = await import("./days/callToAction.js")
	await day.execute()
	game.clearEntities()
	game.day++
	await game.titleText("Day 7", 3)
	day = await import("./days/finale.js")
	await day.execute()
	game.clearEntities()

	// end game here

}


async function menu() {

	let background = game.newEntity("background", new Entity(0, 0, newImage("./assets/titleScreen/background.png")))

	let waves = game.newEntity("waves", new TitleScreenWaves(0, 0, newImages({
		"wave_1": "./assets/titleScreen/waves_1.png",
		"wave_2": "./assets/titleScreen/waves_2.png",
		"wave_3": "./assets/titleScreen/waves_3.png"
	}), ["wave_1", "wave_2", "wave_3",], "cyan"))

	let selector = game.newEntity("selector", new TitleScreenController())
	await selector.start()

};

window.addEventListener("load", onload)
