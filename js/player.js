class Player {
	constructor(x, y, game) {
		this.game = game;

		
		this.sprites = {
			run: {
				img: createImage('assets/blue-run.png'),
				frames: 12,
				frameIndex: 0,
			},
			jump: {
				img: createImage('assets/blue-jump.png'),
				frames: 12,
				frameIndex: 0,
			},
			fall: {
				img: createImage('assets/blue-slide.png'),
				frames: 12,
				frameIndex: 0,
			}	
		};

		this.currentSprite = this.sprites.run;

	
		// this.img = new Image();
		// this.img.src = 'assets/player.png';

		// this.img.currentFrame = 0;
		// this.img.frameCount = 12;

		this.width = 73 * 0.5;
		this.height = 90 * 0.5;

		this.y0 = game.height *  0.6;

		this.pos = {
			x: game.width * 0.2,
			y: this.y0,
		};

		this.speed = {
			x: 0,
			y: 0,
		};


		this.setCotrols();
	}



	setCotrols() {
		const { JUMP } = this.game.keys;

		addEventListener('keydown', ({ code }) => {
			switch (code) {
				case JUMP:
					if (this.y0 === this.pos.y) {
						this.speed.y = -10;
						this.pos.y -= 1;
					}
					break;

			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;

		if (this.controls.right.pressed) {
			this.currentSprite = this.sprites.rightRun;
		} else if (this.controls.left.pressed) {
			this.currentSprite = this.sprites.leftRun;
		}

		this.animateSprite(frameCounter);

		ctx.drawImage(
			this.currentSprite.img,
			this.currentSprite.frameIndex *
				(this.currentSprite.img.width / this.currentSprite.frames),
			0,
			this.currentSprite.img.width / this.currentSprite.frames,
			this.currentSprite.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);

	}


	animateSprite(frameCounter) {
		if (frameCounter % 1 === 0) {
			this.currentSprite.frameIndex++;

			if (this.currentSprite.frameIndex === this.currentSprite.frames) {
				this.currentSprite.frameIndex = 0;
			}
		}
	}

	move() {
		const gravity = 0.8;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.speed.y = 0;
			this.pos.y = this.y0;
		}

		this.pos.y += this.speed.y;
	}
}
