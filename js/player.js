class Player {
	constructor(x, y, game) {
		this.game = game;

		// const {widthRun} = this.sprites.run.img.width;

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
			// fall: {
			// 	img: createImage('assets/blue-slide.png'),
			// 	frames: 12,
			// 	frameIndex: 0,
			// }	
		};


		this.currentSprite = this.sprites.run;
		this.setSprite(this.currentSprite)

		// console.log(document.body.querySelector("img"))
		this.width = undefined;
		this.height = undefined;

		this.y0 = game.height * 0.6;

		this.pos = {
			x: game.width * 0.2,
			y: this.y0,
		};

		this.speed = {
			x: 0,
			y: 0,
		};

		this.setControls();
	}

	setSprite() {

		this.width = this.currentSprite.img.width / this.currentSprite.frames;
		this.height = this.currentSprite.img.height;
	}

	setControls() {
		const { JUMP } = this.game.keys;

		addEventListener('keydown', ({ code }) => {
			switch (code) {
				case JUMP:
					if (this.y0 === this.pos.y) {
						this.currentSprite = this.sprites.jump;
						this.speed.y = -9;
						this.pos.y -= 1;
					}
					break;

			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;
		this.setSprite()
		this.animateSprite(frameCounter);

		if(this.y0 === this.pos.y) {
			this.currentSprite = this.sprites.run;
		}

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
			this.height,

		);
	}


	animateSprite(frameCounter) {
		if (frameCounter % 2 === 0) {
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
