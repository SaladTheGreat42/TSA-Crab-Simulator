import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"
import { Crab } from "./engine/characters/crab.js"
import { TitleScreenWaves, TitleScreenController } from "./engine/characters/titleScreen.js"

async function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	let option = await menu()
	const actOneQueue = ["../days/debugDay.js"]

	await game.fadeOut()
	await game.titleText("Act 1 - Ex Nihilo", 3)
	// Act 2 - Exigence?
	// Act 3 - Finalis?

	// act 1 days
	for(let day of actOneQueue) {
		game.day++
		await game.titleText(`Day ${game.day}`, 3)
		day = await import(actOneQueue)
		// put await game.fadeIn() at the beginning of every day
		await day.execute()
		// put await game.fadeOut() at the end of every day
	}

	alert("yay you made it past act 1! I'm proud of you :)")
}


async function menu() {

	game.newEntity("background", new Entity(0, 0, newImage("./assets/titleScreen/background.png")))

	game.newEntity("waves", new TitleScreenWaves(0, 0, newImages({
		"wave_1": "./assets/titleScreen/waves_1.png",
		"wave_2": "./assets/titleScreen/waves_2.png",
		"wave_3": "./assets/titleScreen/waves_3.png"
	}), ["wave_1", "wave_2", "wave_3",], "cyan"))

	let selector = game.newEntity("selector", new TitleScreenController())
	await selector.start()

	/*
	while(true) {
		let input = await inputPromise()
		if(input == "Enter") {
			if(selector.state) { // if first screen
				if(selector.selection) { // if over start button
					return // start game
				} else {
					selector.credits() // open credits
				}
			} else {
				selector.closeCredits() // closes credits
			}
			if(selector.state && !selector.selection) selector.credits()
		}
		if(["a", "d", "ArrowRight", "ArrowLeft"].includes(input)) {
			if(selector.state) selector.selection = selector.selection ? false : true
		}
	}
	*/

	/*
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
	*/

};

window.addEventListener("load", onload)
