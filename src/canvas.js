let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

let mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', function(e){
  mouse.x = e.x
  mouse.y = e.y
})

function Ball(x, dx, y, dy, radius,color){
  this.x = x
  this.dx = dx
  this.y = y
  this.dy = dy
  this.radius = radius
  this.color = color
}
Ball.prototype = {
  //每次重新绘制的时候都要调用的方法
  draw: function(){
    ctx.beginPath()
    ctx.arc(this.x, this.y ,this.radius, 0, Math.PI*2, true)
    ctx.fillStyle = this.color
    ctx.fill()
  },
  //每次更新ball的坐标
  update: function(){
    this.x += this.dx
    //如果ball的x坐标超出屏幕，让他反向运动
    if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
      this.dx = -this.dx
    }
    this.y += this.dy
    //如果ball的y坐标超出屏幕，让他反向运动
    if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
      this.dy = -this.dy
    }
    //如果ball的x坐标距离鼠标的x坐标不超过50的话，让它的半径增1
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50){
      this.radius += 1
    }
    //如果ball的y坐标距离鼠标的x坐标不超过50的话，让它的半径增1
    if(mouse.y - this.y < 50 && mouse.y - this.y > -50){
      this.radius += 1
    }
    this.draw()
  }
}


var ballArr = []
for(var i=0; i<10; i++){
  var radius = 3 + Math.random()*10
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