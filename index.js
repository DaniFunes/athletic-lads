addEventListener('load', () => {
	const startButton = document.querySelector("#startButton")
	const welcomeScreen = document.querySelector("main")
	const canvas = document.querySelector("canvas")

	startButton.onclick = function () {
	welcomeScreen.style.display = "none"
	canvas.style.display = "block"	
	Game.init();
	}
	
});
