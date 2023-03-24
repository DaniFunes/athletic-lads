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

		this.obstacles = [];
		this.bottles = [];

	},

	start() {
		this.frameCounter = 0;

		this.animationLoopId = setInterval(() => {
			this.clear();

			// console.log(this.currentFrame)
			// console.log(this.frameCounter)
			this.frameCounter++;
			// console.log(this.frameCounter)
			// console.log(this.currentFrame)

			if (this.frameCounter % 90 === 0) this.generateObstacle();
			if (this.frameCounter % 155 === 0) this.generateBottle();
			if (this.frameCounter === 3600) this.generateGoal();

			this.drawAll();
			this.moveAll();


			if (this.isCollision(this.obstacles)) this.gameOver();
			if (this.isCollision(this.bottles)) this.gameOver();

			// console.log(this.currentFrame)


			// if (this.goal && !yaColisionado) {
			// 	estaColisionando = this.isCollision(this.goal)
			// 	yaColisionado = true;
			// }
			// if (this.goal && estaColisionando) {
			// 	estaColisionando = false
			// 	// this.clearGoal();
			// 	this.youWin();

			// }
			// const { yaColisionado } = this;
			// console.log(yaColisionado)

			// let estaColisionando = this.isCollision(this.goal)
			// console.log(estaColisionando)
			

			if (this.goal) {
				// console.log(this.frameCounter)
				// console.log(estaColisionando)
				if (this.isCollision(this.goal) && !this.goal.alcanzada) {				
					this.goal.alcanzada = true;
					this.youWin()
				}
			}

			this.clearObstacles();
			this.clearBottles();
		}, 1000 / this.fps);
	},


	drawAll() {

		this.background.draw();

		this.obstacles.forEach((obstacle) => {
			obstacle.draw();
		});

		this.bottles.forEach((bottle) => {
			bottle.draw();
		});

		if (this.goal) this.goal.draw();


		this.player.draw(this.frameCounter);

	},

	moveAll() {
		this.background.move();

		this.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		this.bottles.forEach((bottle) => {
			bottle.move();
		});

		if (this.goal) this.goal.move();

		this.player.move(this.frameCounter);

	},

	clearObstacles() {
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.pos.x + obstacle.width > 0
		);
	},

	clearBottles() {
		this.bottles = this.bottles.filter(
			(bottle) => bottle.pos.x + bottle.width > 0
		);

	},

	clearGoal() {
		this.goal = null;

	},


	isCollision(elemento) {
		// console.log(elemento)


		if (elemento[0] instanceof Obstacle) {
			return elemento.some(
				(obj) =>
					this.player.pos.x + this.player.width - 25 > obj.pos.x &&
					this.player.pos.x < obj.pos.x + obj.width &&
					this.player.pos.y + this.player.height - 10 > obj.pos.y &&
					this.player.pos.y < obj.pos.y + obj.height
			);
		}
		else if (elemento[0] instanceof Bottle) {
			return elemento.some(
				(obj) =>
					this.player.pos.x + this.player.width - 25 > obj.pos.x &&
					this.player.pos.x < obj.pos.x + obj.width &&
					this.player.pos.y + this.player.height - 10 > obj.pos.y &&
					this.player.pos.y < obj.pos.y + obj.height
			);

		} else if (elemento instanceof Goal) {
			this.yaColisionado = true;
			return this.player.pos.x + this.player.width - 25 > elemento.pos.x &&
				this.player.pos.x < elemento.pos.x + elemento.width &&
				this.player.pos.y + this.player.height - 10 > elemento.pos.y &&
				this.player.pos.y < elemento.pos.y + this.height
		}

	},


	generateObstacle() {
		this.obstacles.push(new Obstacle(this));
	},

	generateBottle() {
		this.bottles.push(new Bottle(this));
	},

	generateGoal() {
		this.goal = new Goal(this);
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
