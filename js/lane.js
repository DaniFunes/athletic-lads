class Lane {
    constructor(posLane, game, player) {


        this.posLane = posLane
        this.player = player;
        this.game = game;
        this.obstacles = [];

       
        this.y0 = this.game.height * this.posLane;
   
        this.pos = {
            x: game.width * 0.4,
            y: this.y0,
        };

        this.player.y0 = this.y0;
    }


    generateObstacle() {
        this.obstacles.push(new Obstacle(this.game, this));

    }

    clearObstacles() {
        this.obstacles = this.obstacles.filter(
            (obstacle) => obstacle.pos.x + obstacle.width > 0
        );
    }

    checkJump() {
        if(!(this.player instanceof Npc)) return
        if(!this.obstacles.length) return

                const distance = Math.floor(this.obstacles[0].pos.x) - (this.player.pos.x + this.player.width)

                if (distance < -50) {
                    this.player.jumping = false
                    return
                }

                if (this.player.jumping) return

                if (distance <= 92) {
                    this.player.jumping = true
                
                    this.player.setRandomQuality()
                    if (this.player.calidad >= 6 && this.player.pos.y === this.player.y0 && !this.obstacles[0].colisionada) {

                        if (this.game.velocity === 8) {
                            this.player.speed.y = -9.8;

                        } else {
                            this.player.speed.y = -9
                        }
                        this.obstacles[0].colisionada = true;
                        this.player.currentSprite = this.player.sprites.jump;
                        this.player.pos.y -= 1;
                    } else if (this.player.calidad < 6 && this.player.pos.y === this.player.y0 && !this.obstacles[0].colisionada) {
                        if (this.game.velocity === 7) {
                            this.player.speed.y = -9;
                        } else {
                            this.player.speed.y = -8
                        }
                        this.obstacles[0].colisionada = true;
                        this.player.currentSprite = this.player.sprites.jump;
                        this.player.pos.y -= 1;   


                    }
                }


}
}

