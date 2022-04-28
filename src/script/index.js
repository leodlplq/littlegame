let canvas
let ctx
let player
let enemies = []
let cursor = {
	x: 0,
	y: 0,
}
window.onload = () => {
	canvas = document.querySelector('#game')
	ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	player = new Player(ctx, canvas, '#ffc800')
	for (let i = 0; i < 1; i++) {
		enemies.push(new Enemy(ctx, canvas, 'red'))
	}
	animate()
}

const animate = () => {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	enemies.forEach((enemey) => {
		enemey.update()
	})
	player.update()
	movePlayer()
}

window.addEventListener('resize', () => {
	// cancelAnimationFrame(flowFieldAnimation)
	console.log('resize')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	// flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
	// flowField.animate(0)
})

window.addEventListener('mousemove', (e) => {
	cursor.x = e.x
	cursor.y = e.y
})

const movePlayer = () => {
	player.velocity.x = (cursor.x - player.position.x) * 0.1
	player.velocity.y = (cursor.y - player.position.y) * 0.1
}

class Player {
	constructor(ctx, canvas, color) {
		this.ctx = ctx
		this.canvas = canvas
		this.position = {
			x: canvas.width / 2,
			y: canvas.height / 2,
		}

		this.velocity = {
			x: 0,
			y: 0,
		}
		this.radius = 20
		this.color = color
	}

	draw(x, y) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, this.radius / 2, 0, Math.PI * 2)
		this.ctx.fillStyle = this.color
		this.ctx.fill()
		this.ctx.closePath()
	}

	update() {
		this.draw(this.position.x, this.position.y)
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (
			this.position.x + this.radius >= this.canvas.width ||
			this.position.x < 0
		) {
			this.velocity.x = -this.velocity.x * 0.5
		}

		if (
			this.position.y + this.radius >= this.canvas.height ||
			this.position.y < 0
		) {
			this.velocity.y = -this.velocity.y * 0.5
		}
	}
}

class Enemy {
	constructor(ctx, canvas, color) {
		this.ctx = ctx
		this.canvas = canvas
		this.position = {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
		}

		this.velocity = {
			x: (Math.random() - 0.5) * 2,
			y: (Math.random() - 0.5) * 2,
		}
		this.radius = Math.random() * 50 + 5
		this.color = color
	}

	draw(x, y) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, this.radius / 2, 0, Math.PI * 2)
		this.ctx.fillStyle = this.color
		this.ctx.fill()
		this.ctx.closePath()
	}

	update() {
		this.draw(this.position.x, this.position.y)
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (
			this.position.x + this.radius >= this.canvas.width ||
			this.position.x < 0
		) {
			this.velocity.x = -this.velocity.x
		}

		if (
			this.position.y + this.radius >= this.canvas.height ||
			this.position.y < 0
		) {
			this.velocity.y = -this.velocity.y
		}
	}
}
