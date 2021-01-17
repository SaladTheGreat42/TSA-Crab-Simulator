function id(elementID) {
	return document.getElementById(elementID)
}

function make(element) {
	return document.createElement(element)
}

function newImage(file) {
	let image = document.createElement("img")
	image.src = file
	return image
}

function newImages(array) {
	let finalArray = []
	for(image of array) {
		finalArray.push(newImage(image))
	}
	return finalArray
}
