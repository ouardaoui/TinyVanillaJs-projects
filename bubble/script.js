const canvas = document.querySelector('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
var  c =  canvas.getContext('2d');

var mouse =  {
    x : undefined,
    y : undefined
}
window.addEventListener("mousemove", function(e){
    mouse.x = e.x
    mouse.y  = e.y
})

window.addEventListener("resize", function(){
canvas.width = window.innerWidth
canvas.height = window.innerHeight
})
class Circle{
    constructor(r)
    {
        this.r = Math.random() * 2 + 3 ;
        this.x = Math.random() * (innerWidth - 2* this.r)  + this.r
        this.y = Math.random() * (innerHeight - 2 * this.r) + this.r
        this.startAngle = 0;
        this.dx = Math.random()*2;
        this.dy = Math.random()*2;
        this.endAngle  = Math.PI * 2
        this.hue = Math.random() * 360 
        this.create()
        this.update()
    }
    create()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.r,this.startAngle,this.endAngle,false)
        c.strokeStyle = 'White'
        c.fillStyle = `hsl(${this.hue},50%,70%)`;
        c.fill()
        c.stroke()
    } 
    update()
    {
    if(this.x + this.r > innerWidth || this.x - this.r < 0){
        this.dx= -this.dx;
    }
    if(this.y + this.r > innerHeight || this.y - this.r < 0){
       this.dy= -this.dy;
    }

    if(mouse.x < this.x + 50 && mouse.x > this.x -50 
        && mouse.y < this.y +50 && mouse.y > this.y - 50)
        {
        if(this.r < 60)            
            this.r += 1;
        }
    else if(this.r > 3)
        this.r -=  1;
    this.y += this.dy    
    this.x += this.dx
    }

}

// create circle
let circleArray = []
for (var i = 0; i < 1000; i++)
{
    circleArray.push(new Circle())
}

//animation 
function animation(){
    requestAnimationFrame(animation)
    c.clearRect(0,0,innerWidth,innerHeight)
    for(var j = 0; j < circleArray.length; j++)
    {
    circleArray[j].create()
    circleArray[j].update()
    }
}
animation()