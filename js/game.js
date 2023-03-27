const Game = {
	ctx: undefined,
	width: innerWidth,
	height: innerHeight,
	fps: 60,
	keys: {
		JUMP: 'Space',

	},
	velocity: 8,
	normalVelocity: 8,
	stunVelocity: -2,
	boostVelocity: 2,
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

		this.npcs = [
			new Npc(0, 0, "red", this),
			new Npc(0, 0, "yellow", this),
			new Npc(0, 0, "green", this),
		]
		this.lanes = [
			new Lane(0.66, this, this.player),
			new Lane(0.725, this, this.npcs[0]),
			new Lane(0.775, this, this.npcs[1]),
			new Lane(0.84, this, this.npcs[2]),
		]


		this.bso = new Audio('assets/theme.wav')
		this.bso.play();
		this.bso.loop = true;

		// carril 1 = 0.63 .....0.695
		// carril 2 = 0.705 .....0.745
		// carril 3 = 0.755 .....0.803
		// carril 4 = 0.81 .... 0.865

	},

	start() {
		this.frameCounter = 0;

		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;

			if (this.frameCounter % 95 === 0) {
				this.lanes.forEach((lane, key) => {
					lane.generateObstacle()


					lane.obstacles[lane.obstacles.length - 1].pos.x -= 20 * key


				})
			}

			if (this.frameCounter % 255 === 0) this.generateBottle()
			if (this.frameCounter === 3600) this.generateGoal();
			console.log(this.bottles)
			this.drawAll();
			this.moveAll();
		

			this.lanes.forEach(lane => {
				lane.checkJump()
				this.handleObstacles(lane);
				lane.clearObstacles();
				this.deleteObstacles(lane);
			})

			this.clearBottles();
		}, 1000 / this.fps);
	},


	handleObstacles(lane) {


		if (lane.player instanceof Player) {
			if (this.isCollision(lane.obstacles, lane.player)) {
				lane.player.stun()

				this.npcs.forEach(npc => {
					npc.rearrange(this.stunVelocity)
				})
			}

			if (this.goal) {
				const { goal } = this
				if (this.isCollision(goal, this.player) && !goal.alcanzada) {
					goal.alcanzada = true;
					this.youWin()
				}
			}

			if (this.isCollision(this.bottles, this.player)) {
				console.log("colision con botella")
				const jumpEffect = new Audio('assets/SFX_Jump_01.wav')
				jumpEffect.play();
				lane.player.boost()
				this.catchBottles()
				this.npcs.forEach(npc => {
					npc.rearrange(this.boostVelocity)
				})

			}

		} else {

			if (this.isCollision(lane.obstacles, lane.player) && !lane.obstacles.colisionada) {
				lane.player.stun()

			}


			if (this.goal) {
				const { goal } = this
				this.npcs.forEach((npc) => {
					if (this.isCollision(goal, npc) && !goal.alcanzada) {
						goal.alcanzada = true;
						this.youLose()
					}

				})

			}

		}
	},



	drawAll() {

		this.background.draw();

		this.lanes.forEach(lane => {
			lane.obstacles.forEach((obstacle) => {
				obstacle.draw();
			})
		});

		this.bottles.forEach((bottle) => {
			bottle.draw();
		});

		if (this.goal) this.goal.draw();

		this.player.draw(this.frameCounter);
		this.npcs.forEach(npc => {
			npc.draw(this.frameCounter);
		})

	},

	moveAll() {
		this.background.move();
		this.lanes.forEach(lane => {
			lane.obstacles.forEach((obstacle) => {
				obstacle.move();
			})
		});

		this.bottles.forEach((bottle) => {
			bottle.move();
		});

		if (this.goal) this.goal.move();

		this.player.move(this.frameCounter);
		this.npcs.forEach(npc => {
			npc.move(this.frameCounter);
		})

	},


	clearBottles() {
		this.bottles = this.bottles.filter(
			(bottle) => bottle.pos.x + bottle.width > 0
		);
	},

	catchBottles() {
		this.bottles = this.bottles.filter(
			(bottle) => bottle.pos.x < 0
		)
	},

	// catchBottles() {
	// 	this.bottles = []
	// },

	clearGoal() {
		this.goal = null;
	},


	isCollision(elemento, player) {

		if (elemento[0] instanceof Obstacle) {
			return elemento.some(
				(obj) =>
					player.pos.x + player.width - 25 > obj.pos.x &&
					player.pos.x < obj.pos.x + obj.width &&
					player.pos.y + player.height > obj.pos.y &&
					player.pos.y < obj.pos.y + obj.height
			);

		} else if (elemento instanceof Goal) {
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
		this.bso.pause();
		setTimeout(() => {
			clearInterval(this.animationLoopId);
			if (confirm('HAS GANADO LA CARRERA ¿VOLVER A EMPEZAR?')) {
				this.goal.alcanzada = false;
				this.init()
			};
		}, 1000)

	},

	youLose() {
		this.bso.pause();
		setTimeout(() => {
			clearInterval(this.animationLoopId);
			if (confirm('HAS PERDIDO LA CARRERA ¿VOLVER A EMPEZAR?')) {
				this.goal.alcanzada = false;
				this.init()
			};
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
