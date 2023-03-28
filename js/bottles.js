class Bottle {
	constructor(game) {
		this.imgBot = new Image();
		this.imgBot.src = 'assets/Bottle.png';

		this.width = 140 * 0.1;
		this.height = 399 * 0.1;

		this.pos = {
			x: game.width,
			y: game.player.y0 - (game.player.height * 2),
		};

		this.game = game;
		this.colisionada = false;

	}

	draw() {
		const { ctx } = this.game;

		ctx.drawImage(this.imgBot, this.pos.x, this.pos.y, this.width, this.height)
	}

	move() {
		this.pos.x -= this.game.velocity;

	}


}