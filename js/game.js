const Game = {
	ctx: undefined,
	width: innerWidth,
	height: innerHeight,
	fps: 60,
	keys: {
		JUMP: 'Space',

	},

	init() {
		const canvas = document.querySelector('canvas');

		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		this.setup();
		this.start();
	},

	setup() {
		console.log('Estableciendo valores iniciales para el juego');

		this.player = new Player(0, 0, this);
		this.background = new Background(this);
		this.bottles = [];
		this.npc1 = new Npc (0, 0, "red", this)
		this.npc2 = new Npc (0, 0, "yellow", this)
		this.npc3 = new Npc (0, 0, "green", this)
		this.lane1 = new Lane (0, 0.62, this, this.player)
		this.lane2 = new Lane (0, 0.68, this, this.npc1)
		this.lane3 = new Lane (0, 0.74, this, this.npc2)
		this.lane4 = new Lane (0, 0.8, this, this.npc3)


	},

	start() {
		this.frameCounter = 0;

		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;

			if (this.frameCounter % 100 === 0) this.lane1.generateObstacle();
			if (this.frameCounter % 130 === 0) this.lane2.generateObstacle();
			if (this.frameCounter % 160 === 0) this.lane3.generateObstacle();
			if (this.frameCounter % 190 === 0) this.lane4.generateObstacle();
			if (this.frameCounter % 123 === 0) this.generateBottle();
			if (this.frameCounter === 3600) this.generateGoal();
			// if (this.isCollision(this.obstacles)) game.gameOver();
		   
			// if (this.game.goal) {
	
			// 	if (this.isCollision(this.game.goal) && !this.game.goal.alcanzada) {
			// 		game.goal.alcanzada = true;
			// 		this.youWin()
			// 	}
			// }

			console.log(this.goal)
			this.drawAll();
			this.moveAll();

			// this.lane2.handleObstacles (this.player);
			this.handleObstacles(this.player);
			if (this.isCollision(this.bottles)) this.gameOver();
	
			this.lane1.clearObstacles ();
			this.lane2.clearObstacles ();
			this.lane3.clearObstacles ();
			this.lane4.clearObstacles ();

			this.clearBottles();
		}, 1000 / this.fps);
	},


	handleObstacles(player) {
     
        if (player instanceof Player) {
			console.log("soy una isntancia de jugador")
            if (this.isCollision(this.lane1.obstacles, player)) {
				// this.gameOver();
				this.npc1.pos.x += this.speed.x;
			}
            
            if (this.goal) {
                const {goal} = this
                console.log("ahora chocate")
                if (this.isCollision(goal , player) && !goal.alcanzada) {
                    goal.alcanzada = true;
                    console.log("he colisionado con la meta")
                    this.youWin()
                }
            }

			if (this.isCollision(this.bottles, player)) this.clearBottles();
        }

	},



	drawAll() {

		this.background.draw();

		this.lane1.obstacles.forEach((obstacle) => {
			obstacle.draw();
		});

		this.lane2.obstacles.forEach((obstacle) => {
			obstacle.draw();
		});

		this.lane3.obstacles.forEach((obstacle) => {
			obstacle.draw();
		});

		this.lane4.obstacles.forEach((obstacle) => {
			obstacle.draw();
		});

		this.bottles.forEach((bottle) => {
			bottle.draw();
		});

		if (this.goal) this.goal.draw();


		this.player.draw(this.frameCounter);
		this.npc1.draw(this.frameCounter);
		this.npc2.draw(this.frameCounter);
		this.npc3.draw(this.frameCounter);

	},

	moveAll() {
		this.background.move();

		this.lane1.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.lane2.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.lane3.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.lane4.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.bottles.forEach((bottle) => {
			bottle.move();
		});

		if (this.goal) this.goal.move();

		this.player.move(this.frameCounter);
		this.npc1.move(this.frameCounter);
		this.npc2.move(this.frameCounter);
		this.npc3.move(this.frameCounter);

	},


	clearBottles() {
		this.bottles = this.bottles.filter(
			(bottle) => bottle.pos.x + bottle.width > 0
		);

	},

	clearGoal() {
		this.goal = null;
	},


	isCollision(elemento , player) {

		if (elemento[0] instanceof Obstacle) {
			return elemento.some(
				(obj) =>
					player.pos.x + player.width - 25 > obj.pos.x &&
					player.pos.x < obj.pos.x + obj.width &&
					player.pos.y + player.height - 10 > obj.pos.y &&
					player.pos.y < obj.pos.y + obj.height
			);

			} else if (elemento instanceof Goal) {
				// this.yaColisionado = true;
				return player.pos.x + player.width - 25 > elemento.pos.x &&
					player.pos.x < elemento.pos.x + elemento.width &&
					player.pos.y + player.height - 10 > elemento.pos.y &&
					player.pos.y < elemento.pos.y + this.height

			} else if (elemento[0] instanceof Bottle) {
			return elemento.some(
				(obj) =>
					player.pos.x + player.width - 25 > obj.pos.x &&
					player.pos.x < obj.pos.x + obj.width &&
					player.pos.y + player.height - 10 > obj.pos.y &&
					player.pos.y < obj.pos.y + obj.height
			);

		}

		

	},


	generateBottle() {
		this.bottles.push(new Bottle(this));
	},

	generateGoal() {
		this.goal = new Goal(this);
		console.log("genero goal")
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	gameOver() {
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEZAR?')) this.init();
	},

	youWin() {
		setTimeout(() => {
			clearInterval(this.animationLoopId);
			if (confirm('HAS GANADO LA CARRERA ¿VOLVER A EMPEZAR?')) this.init();
		}, 1000)

	}
};
