let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')
ctx.font = '48px serif'
ctx.fillText('Hello world!', 100, 100)