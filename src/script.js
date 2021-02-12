import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"
import { Crab } from "./engine/characters/crab.js"

async function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	let option = await menu()
	if(option) { // game
		const actOneQueue = ["../days/debugDay.js"]

		await game.fadeOut()
		await game.titleText("Act 1 - Ex Nihilo", 3)
		// Act 2 - Exigence?
		// Act 3 - Finalis?

		// act 1 days
		for(let day of actOneQueue) {
			game.day++
			await game.titleText(`Day ${game.day}`, 3)
			console.log(actOneQueue)
			day = await import(actOneQueue)
			// put await game.fadeIn() at the beginning of every day
			await day.execute()
			// put await game.fadeOut() at the end of every day
		}

		alert("yay you made it past act 1! I'm proud of you :)")

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
