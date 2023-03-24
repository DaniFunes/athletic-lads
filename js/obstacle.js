class Obstacle {
	constructor(game) {
		this.imgObs = new Image();
		this.imgObs.src = 'assets/valla.png';
		
		this.width = 27 * 0.4;
		this.height = 316 * 0.15; 
 
		this.pos = {
			x: game.width,
			y: game.player.y0 + game.player.height - this.height,
		};
 
		this.game = game;

		this.dx = 8; 
	}
 
	draw() {
		const { ctx } = this.game;
		
		ctx.drawImage (this.imgObs, this.pos.x, this.pos.y, this.width, this.height)
		}

	move() {
		this.pos.x -= this.dx;
	}
}

	
	

