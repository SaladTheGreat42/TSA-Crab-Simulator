import { Game } from "./engine/game.js"
import { Entity, Character, Textbox } from "./engine/entity.js"
import { Crab } from "./engine/characters/crab.js"

var finalToggle;

async function onload() {
	window.game = new Game()
	game.loop() // start the game loop
	await menu()
	if (finalToggle == false){
		game.newEntity("creditsTest", new Entity(0, 0, newImage("./assets/creditsTest.png")))
	} else {
		game.newEntity("testbackground", new Entity(0, 0, newImage("./assets/under_da_sea.png")))
		game.newEntity("test", new Entity(400, 200, newImage("./assets/gnome.png")))
		//game.newEntity("textbackground", new Textbox(344, 800, newImage("./assets/textbox_background_test.png"), "Hello Crab."))
		//Textbox coords : 344, 800
		let player = game.newEntity("playerTest", new Crab(1000, 300, newImages({
			body: "./assets/crab/crab_body.png",
			arms: "./assets/crab/crab_arms.png",
			eyes: "./assets/crab/crab_eyes.png",
			legs: "./assets/crab/crab_legs.png"
		})))
		await sleep(1)
		await player.speak("Hello. My name is Inignome Montoya. You killed my\nfather. Prepare to die.", "yellow")
		await player.speak("Well fuck", "cyan")
	}
}

async function menu(){
	let toggle = true;
	game.newEntity("menu", new Entity(0, 0, newImage("./assets/mainMenuTest.png")))
	var selector = game.newEntity("selector", new Entity(570, 550, newImage("./assets/selector.png")))
	async function promiseLoop(toggle) {
		console.log(toggle)
		const inputPromise = new Promise((resolve, reject) => {
		document.addEventListener("keypress", e => {
			if(e.key == "Enter") reject(toggle)
			else if (e.key == "w" || e.key == "s"){
				resolve(toggle)
			}
		})
	})
		await inputPromise.then(async (toggle) => {
			toggle = !toggle;
			selector.delete()
			if (toggle == false) selector = game.newEntity("selector", new Entity(570, 750, newImage("./assets/selector.png")))
			else if (toggle == true) selector = game.newEntity("selector", new Entity(570, 550, newImage("./assets/selector.png")))

			console.log(toggle)
		 	await promiseLoop(toggle);
		}).catch((toggle) => {
			console.log(toggle)
			finalToggle = toggle
			return toggle;
		})
	}
	await promiseLoop(toggle);
};

window.addEventListener("load", onload)
