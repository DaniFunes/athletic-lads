class Npc {
    constructor(x, y, color, game) {

        this.sprites = {

            run: {
                img: createImage(`assets/${color}-run.png`),
                frames: 12,
                frameIndex: 0,

            },
            jump: {
                img: createImage(`assets/${color}-jump.png`),
                frames: 12,
                frameIndex: 0,

            },
            // fall: {
            // 	img: createImage('assets/blue-slide.png'),
            // 	frames: 12,
            // 	frameIndex: 0,
            // }	
        };

        this.game = game;
        this.currentSprite = this.sprites.run;
        this.setSprite(this.currentSprite)


        this.width = undefined;
        this.height = undefined;

        this.y0 = undefined;

        this.pos = {
            x: game.width * 0.4,
            y: this.y0,
        };

        this.speed = {
            x: 0,
            y: 0,
        };

        this.jumping  = false
        this.state = 'normal'

    }

    setSprite() {

        this.width = this.currentSprite.img.width / this.currentSprite.frames;
        this.height = this.currentSprite.img.height;
    }


    draw(frameCounter) {
        const { ctx } = this.game;
        this.setSprite()
        this.animateSprite(frameCounter);

        if (this.y0 === this.pos.y) {
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
        if(this.pos.x < 0) {
            this.state = "normal"
        }

        const gravity = 0.8;

        if (this.pos.y < this.y0) {
            this.speed.y += gravity;
        } else {
            this.speed.y = 0;
            this.pos.y = this.y0;
        }
        

        this.pos.y += this.speed.y;
        this.pos.x += this.speed.x;
    }

    // setVelocitySlow() {

    //     if (this.speed.x >= 0) {
      
    //         console.log("LA VIDA PASA")
    //         this.speed.x = -1
    //         setTimeout(() => {
    //             this.speed.x = 7 - this.game.velocity
    //         }, 1500)
    //     }

       
    // }

    getHeight() {
		return this.currentSprite.img.height
	}

    setRandomQuality() {

        // console.log("CALCULANDO")
        this.calidad = getRandomIntInclusive(1, 10);
        // console.log(this.calidad)
    }

    boost(){
		this.state = 'boosted'
	}

	stun(){
		
        if (this.state !== 'stuned') {
			this.state = 'stuned'
			
		
			this.speed.x += this.game.stunVelocity
		
			setTimeout(() => {
				this.speed.x = 0
				this.state = 'normal'

			}, "1000");
		}	
	}

    rearrange(velocity){

        if(this.state === 'normal') {
            this.state = 'rearrenged'
            this.speed.x += -velocity
        }
        
	}

    setNormalVelocity() {
        this.state = 'normal'
        this.speed.x = 0
    }

}