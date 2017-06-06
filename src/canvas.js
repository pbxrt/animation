let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

function Ball(x, dx, y, dy, radius,color){
  this.x = x
  this.dx = dx
  this.y = y
  this.dy = dy
  this.radius = radius
  this.color = color
  ctx.beginPath()
  ctx.arc(this.x, this.y ,this.radius, 0, Math.PI*2, true)
  ctx.fillStyle = this.color
  ctx.fill()
}
Ball.prototype.update = function(){
  this.x += this.dx
  this.y += this.dy
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true)
  ctx.fillStyle = this.color
  ctx.fill()
}

var ball = new Ball(200, 1, 200, 1, 100, '#ccc');

function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  ball.update()
}

animate()