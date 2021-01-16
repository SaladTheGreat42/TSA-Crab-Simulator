import { Game } from "./engine/game.js"

function onload() {
	const game = new Game()
	game.initialize() // inital calls
}

window.addEventListener("load", onload)
