class Goal {
    constructor(game) {

        this.imgGoal = new Image();
        this.imgGoal.src = 'assets/goal.png';

        this.width = 39 * 0.40;
        this.height = 449 * 0.4;
        this.alcanzada = false;
        
        this.pos = {
            x: game.width,
            y: game.height * 0.60,
        };

        this.game = game;

        this.dx = 8;

    }

    draw() {
        const { ctx } = this.game;

        ctx.drawImage(this.imgGoal, this.pos.x, this.pos.y, this.width, this.height)

    }

    move() {

        this.pos.x -= this.game.velocity;
    }

}