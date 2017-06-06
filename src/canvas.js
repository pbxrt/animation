let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

let mouse = {
  x: innerWidth/2,
  y: innerHeight/2
}
//增加随机颜色数组
let colorArr = [
  '#A45D90',
  '#513D5A',
  '#F3CFAE',
  '#F0AB9A',
  '#F17370'
]
//鼠标移动时，更改mouse对象的属性
window.addEventListener('mousemove', function(e){
  mouse.x = e.x
  mouse.y = e.y
})
window.addEventListener('resize', function(){
  start()
})

function Ball(x, dx, y, dy, radius,color){
  this.x = x
  this.dx = dx
  this.y = y
  this.dy = dy
  this.radius = radius
  //存储ball的初始radius值
  this.initialRadius = radius
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
    //如果ball的x坐标距离鼠标的x坐标不超过50，ball的y坐标距离鼠标的y坐标也不超过50的话,让它的半径增1
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      this.radius += 1
      //如果ball的半径超过50将不再继续增加
      if(this.radius >= 50){
        this.radius = 50
      }
    }
    //如果ball的x坐标距离鼠标的x坐标超过50 或者 ball的y坐标距离鼠标超过50，让他的半径减1
    if(mouse.x - this.x > 50 || mouse.x - this.x < -50 || mouse.y - this.y > 50 || mouse.y - this.y < -50){
      this.radius -= 1
      //如果ball的半径小于其初始半径将不再继续减小
      if(this.radius <= this.initialRadius){
        this.radius = this.initialRadius
      }
    }
    this.draw()
  }
}


var ballArr;
//把这段代码封装到start函数中，window resize的时候调用
function start(){
  ballArr = []
  for(var i=0; i<800; i++){
    var radius = 2 + Math.random()*5
    //设置dx的值为-4到4之间
    var dx = Math.random()*8 - 4
    //设置dy的值为-3到3之间
    var dy = Math.random()*6 - 3
    //设置随机颜色
    var color = colorArr[Math.floor(Math.random()*colorArr.length)]
    var x = innerWidth/2, y = innerHeight/2; 
    var ball = new Ball(x, dx, y, dy, radius, color);
    //将每个ball的实例存储到ballArr中
    ballArr.push(ball)
  }
}

//最开始的时候调用一次
start()

function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  //调用每个ball的update方法
  ballArr.forEach((ball) => {
    ball.update()
  })
}

animate()