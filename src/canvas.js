let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

function Ball(x,y,radius,color){
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  ctx.beginPath()
  ctx.arc(this.x, this.y ,this.radius, 0, Math.PI*2, true)
  ctx.fillStyle = this.color
  ctx.fill()
}

var ball = new Ball(200, 200, 100, '#ccc');