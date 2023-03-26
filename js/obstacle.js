class Obstacle {
	constructor(game, lane) {
		this.game = game;
		this.lane = lane;
		this.imgObs = new Image();
		this.imgObs.src = 'assets/valla.png';

		this.width = 27 * 0.4;
		this.height = 316 * 0.15;
		this.colisionada = false;

		this.pos = {
			x: game.width,
			y: lane.y0,
		};

		this.dx = 8;
	}


	draw() {
		const { ctx } = this.game;

		ctx.drawImage (this.imgObs, this.pos.x, this.pos.y, this.width, this.height);
		// console.log("pintando ostaculo")
	}

	move() {
		this.pos.x -= this.dx;

		// if(this.game.background.dx === 10) {
		// 	this.dx = 10
		// }
	}
}




