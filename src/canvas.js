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
}
Ball.prototype = {
  draw: function(){
    ctx.beginPath()
    ctx.arc(this.x, this.y ,this.radius, 0, Math.PI*2, true)
    ctx.fillStyle = this.color
    ctx.fill()
  },
  update: function(){
    this.x += this.dx
    if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
      this.dx = -this.dx
    }
    this.y += this.dy
    if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
      this.dy = -this.dy
    }
    this.draw()
  }
}


var ballArr = []
for(var i=0; i<10; i++){
  var radius = 10 + Math.random()*40
  var dx = Math.random()*10 - 5
  var dy = Math.random()*10 - 5
  var ball = new Ball(200, dx, 200, dy, radius, '#ccc');
  ballArr.push(ball)
}
function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  ballArr.forEach((ball) => {
    ball.update()
  })
}

animate()