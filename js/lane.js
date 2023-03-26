class Lane {
    constructor(x, posLane, game, player) {


        this.posLane = posLane
        this.player = player;
        this.game = game;
        this.obstacles = [];
        this.y0 = this.game.height * this.posLane;

        this.pos = {
            x: game.width * 0.2,
            y: this.y0,
        };

        this.player.y0 = this.y0;
    }

    
        // } else {

        // }

      



    // isCollision(elemento) {

    //     if (elemento[0] instanceof Obstacle) {
    //         return elemento.some(
    //             (obj) =>
    //                 this.player.pos.x + this.player.width - 25 > obj.pos.x &&
    //                 this.player.pos.x < obj.pos.x + obj.width &&
    //                 this.player.pos.y + this.player.height - 10 > obj.pos.y &&
    //                 this.player.pos.y < obj.pos.y + obj.height
    //         )

    //     } else if (elemento instanceof Goal) {
    //         return this.player.pos.x + this.player.width - 25 > elemento.pos.x &&
    //             this.player.pos.x < elemento.pos.x + elemento.width &&
    //             this.player.pos.y + this.player.height - 10 > elemento.pos.y &&
    //             this.player.pos.y < elemento.pos.y + this.height
    //     }

    // }

    generateObstacle() {
		this.obstacles.push(new Obstacle(this.game, this));
        // console.log("generando ostaculo")
        // console.log(this.obstacles)
	}

	clearObstacles() {
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.pos.x + obstacle.width > 0
		);
	}


}


