class Goal {
    constructor(game) {

        this.imgGoal = new Image();
        this.imgGoal.src = 'assets/goal.png';

        this.width = 39 * 0.5;
        this.height = 449 * 0.5;
        this.alcanzada = false;
        
        this.pos = {
            x: game.width,
            y: 400,
        };

        this.game = game;

        this.dx = 8;

    }

    draw() {
        const { ctx } = this.game;

        ctx.drawImage(this.imgGoal, this.pos.x, this.pos.y, this.width, this.height)

    }

    move() {

        this.pos.x -= this.dx;
    }

}