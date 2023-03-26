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
		this.npc1 = new Npc(0, 0, "red", this)
		this.npc2 = new Npc(0, 0, "yellow", this)
		this.npc3 = new Npc(0, 0, "green", this)
		this.lane1 = new Lane(0, 0.62, this, this.player)
		this.lane2 = new Lane(0, 0.68, this, this.npc1)
		this.lane3 = new Lane(0, 0.74, this, this.npc2)
		this.lane4 = new Lane(0, 0.8, this, this.npc3)


	},

	start() {
		this.frameCounter = 0;

		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;

			this.npc1.setRandomQuality();
			this.npc2.setRandomQuality();
			this.npc3.setRandomQuality();

			// this.lane2.checkJump ();
			// console.log(this.lane2.obstacles)
			if (this.lane3.length) console.log(this.lane3.obstacles.pos.x)
			


			if (this.frameCounter % 95 === 0) this.lane1.generateObstacle();
			if (this.frameCounter % 120 === 0) this.lane2.generateObstacle();
			if (this.frameCounter % 140 === 0) this.lane3.generateObstacle();
			if (this.frameCounter % 160 === 0) this.lane4.generateObstacle();
			if (this.frameCounter % 255 === 0) this.generateBottle();
			if (this.frameCounter === 3600) this.generateGoal();

			this.drawAll();
			this.moveAll();

			this.npc1.checkJump(this.lane2);
			// console.log(this.npc1.calidad)


			
			this.handleObstacles(this.player);
			this.handleObstacles(this.npc1);
			this.handleObstacles(this.npc2);
			this.handleObstacles(this.npc3);

			this.lane1.clearObstacles();
			this.lane2.clearObstacles();
			this.lane3.clearObstacles();
			this.lane4.clearObstacles();

			this.deleteObstacles(this.lane1);
			this.deleteObstacles(this.lane2);
			this.deleteObstacles(this.lane3);
			this.deleteObstacles(this.lane4);

			this.clearBottles();
		}, 1000 / this.fps);
	},


	handleObstacles(player) {

		if (player instanceof Player) {
			// console.log("soy una isntancia de jugador")
			if (this.isCollision(this.lane1.obstacles, this.player)) {
				this.background.dx = 7;

				this.lane1.obstacles.forEach((obstaculo) => { obstaculo.dx = 7 });
				this.lane2.obstacles.forEach((obstaculo) => { obstaculo.dx = 7 });
				this.lane3.obstacles.forEach((obstaculo) => { obstaculo.dx = 7 });
				this.lane4.obstacles.forEach((obstaculo) => { obstaculo.dx = 7 });
				this.bottles.forEach((obstaculo) => { obstaculo.dx = 7 });
				this.npc1.setVelocityFast();
				this.npc2.setVelocityFast();
				this.npc3.setVelocityFast();

				setTimeout(() => {

					this.lane1.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.lane2.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.lane3.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.lane4.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.bottles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.npc1.setVelocityDefault();
					this.npc2.setVelocityDefault();
					this.npc3.setVelocityDefault();
					this.background.dx = 8;
				}, "1000");

			}

			if (this.goal) {
				const { goal } = this
				// console.log("ahora chocate")
				if (this.isCollision(goal, player) && !goal.alcanzada) {
					goal.alcanzada = true;
					// console.log("he colisionado con la meta")
					this.youWin()
				}
			}

			if (this.isCollision(this.bottles, this.player) && !this.bottles.colisionada) {
				this.background.dx = 9;
				this.lane1.obstacles.forEach((obstaculo) => { obstaculo.dx = 9 });
				this.lane2.obstacles.forEach((obstaculo) => { obstaculo.dx = 9 });
				this.lane3.obstacles.forEach((obstaculo) => { obstaculo.dx = 9 });
				this.lane4.obstacles.forEach((obstaculo) => { obstaculo.dx = 9 });
				this.bottles.forEach((obstaculo) => { obstaculo.dx = 9 });
				this.npc1.setVelocitySlow();
				this.npc2.setVelocitySlow();
				this.npc3.setVelocitySlow();

				setTimeout(() => {

					this.lane1.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.lane2.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.lane3.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.lane4.obstacles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.bottles.forEach((obstaculo) => { obstaculo.dx = 8 });
					this.npc1.setVelocityDefault();
					this.npc2.setVelocityDefault();
					this.npc3.setVelocityDefault();
					this.background.dx = 8;
				}, "1000");


			}


		} else {
			if (this.isCollision(this.lane2.obstacles, this.npc1) && !this.lane2.obstacles.colisionada) {
				this.lane2.obstacles.colisionada = true;
				// console.log("he colisionado en el carril 2")
				this.npc1.setVelocitySlow();

				setTimeout(() => {
					player.setVelocityDefault();
				}, "1000");
			}

			if (this.isCollision(this.lane3.obstacles, this.npc2) && !this.lane3.obstacles.colisionada) {
				this.lane3.obstacles.colisionada = true;
				console.log("he colisionado en el carril 3")

				this.npc2.setVelocitySlow();

				setTimeout(() => {
					player.setVelocityDefault();
				}, "1000");
			}

			if (this.isCollision(this.lane4.obstacles, this.npc3) && !this.lane4.obstacles.colisionada) {
				// console.log("he  colisionado en el carril 4")
				this.npc3.setVelocitySlow();

				setTimeout(() => {
					player.setVelocityDefault();
				}, "1000");
			}
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


	isCollision(elemento, player) {

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


		}
		else if (elemento[0] instanceof Bottle) {
			return elemento.some((obj) =>
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
		console.log("has ganado")
		setTimeout(() => {
			clearInterval(this.animationLoopId);
			if (confirm('HAS GANADO LA CARRERA ¿VOLVER A EMPEZAR?')) {
				this.goal.alcanzada = false;
				this.init()};
		}, 1000)

	},

	deleteObstacles(lane) {
		if (this.goal) {

			if (this.goal.alcanzada) {

				lane.obstacles = lane.obstacles.filter(
					(obstacle) => obstacle.pos.x < this.goal.pos.x
				)
			}
		}
	}

}
