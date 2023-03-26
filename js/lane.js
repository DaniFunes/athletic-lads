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


    generateObstacle() {
        this.obstacles.push(new Obstacle(this.game, this));

    }

    clearObstacles() {
        this.obstacles = this.obstacles.filter(
            (obstacle) => obstacle.pos.x + obstacle.width > 0
        );
    }

    // checkJump() {
    //     this.obstacles.forEach((obstacle) => {
    //         if (this.player.pos.x === this.obstacles.pos.x - 25) {
    //             if (this.player.calidad >= 5 && this.player.y0 === this.player.pos.y) {
    //                 this.player.currentSprite = this.player.sprites.jump;
    //                 this.speed.y = -9;
    //                 this.pos.y -= 1;

    //             }
    //         }

    //     }

    //     )


    // }


}


