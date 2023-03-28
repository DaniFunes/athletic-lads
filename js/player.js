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
	
		};


		this.currentSprite = this.sprites.run;
		this.setSprite(this.currentSprite)

		this.width = undefined;
		this.height = undefined;



		this.pos = {
			x: game.width * 0.4,
			y: undefined,
		};

		this.speed = {
			x: 0,
			y: 0,
		};

		this.state = 'normal'

		this.setControls();
	}

	getHeight() {
		return this.currentSprite.img.height
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
						this.speed.y = -8.8;
						this.pos.y -= 1;
						const jumpEffectSound = new Audio('assets/jump.mp3')
						jumpEffectSound.play()
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
			this.pos.y - this.height,
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
		const gravity = 0.75;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.speed.y = 0;
			this.pos.y = this.y0;
		}

		this.pos.y += this.speed.y;

	}

	boost(){
		if (this.state !== 'boosted') {
			this.state = 'boosted'
			
		
			this.game.velocity += this.game.boostVelocity
		
			setTimeout(() => {
				this.game.velocity = this.game.normalVelocity
				this.state = 'normal'

				this.game.npcs.forEach(npc => {
					npc.setNormalVelocity()
				})
			}, "1000");
		}	
	}

	stun(){
	

		if (this.state !== 'stuned') {
			this.state = 'stuned'
			
		
			this.game.velocity += this.game.stunVelocity
		
			setTimeout(() => {
				this.game.velocity = this.game.normalVelocity
				this.state = 'normal'

				this.game.npcs.forEach(npc => {
					npc.setNormalVelocity()
				})
			}, "1000");
		}	
	}


}
