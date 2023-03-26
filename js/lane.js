class Lane {
    constructor (x, y, player, game, obstacles, freqObstacle) {
        
        this.game = game;
        this.x = x;
        this.y = y;
        this.obstacles = []
        this.npc = new Npc ()
        this.y0 = game.height * y;

		this.pos = {
			x: game.width * 0.2,
			y: this.y0,
		};



    }

    handleObstacles () {
            
            // this.imgObs = new Image();
            // this.imgObs.src = 'assets/valla.png';
            
            // this.width = 27 * 0.4;
            // this.height = 316 * 0.15; 
            // this.colisionada = false;

            if (game.frameCounter % freqObstacle === 0) this.generateObstacle();

            this.pos = {
                x: this.game.width,
                y: this.pos.y,
            };
     
            this.game = game;
    
            this.dx = 8; 
        
     
        draw() {
            const { ctx } = this.game;
            
            ctx.drawImage (this.imgObs, this.pos.x, this.pos.y, this.width, this.height)
            }
    
        move() {
            this.pos.x -= this.dx;
        }

        isCollision(elemento) {

            if (elemento[0] instanceof Obstacle) {
                return elemento.some(
                    (obj) =>
                        this.player.pos.x + this.player.width - 25 > obj.pos.x &&
                        this.player.pos.x < obj.pos.x + obj.width &&
                        this.player.pos.y + this.player.height - 10 > obj.pos.y &&
                        this.player.pos.y < obj.pos.y + obj.height
                );
            }
    
            } else if (elemento instanceof Goal) {
                // this.yaColisionado = true;
                return this.player.pos.x + this.player.width - 25 > elemento.pos.x &&
                    this.player.pos.x < elemento.pos.x + elemento.width &&
                    this.player.pos.y + this.player.height - 10 > elemento.pos.y &&
                    this.player.pos.y < elemento.pos.y + this.height
            }
    
        }

        generateObstacle() {
            this.obstacles.push(new Obstacle(this));
        },
        
        clearObstacles() {
            this.obstacles = this.obstacles.filter(
                (obstacle) => obstacle.pos.x + obstacle.width > 0
            );
        }

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