const canvas = document.querySelector('canvas')
canvas.height = 576
canvas.width = 1024
let c = canvas.getContext('2d')
c.fillRect(0,0,canvas.width,canvas.height)
class Sprit {
    constructor({position,format,color,delta,pressed,key,attack})
    {
        this.x = position.x;
        this.y = position.y;
        this.height = format.height;
        this.width = format.width;
        this.color = color;
        this.dx = delta.dx;
        this.dy = delta.dy;
        this.right  = pressed.right
        this.lift = pressed.lift
        this.att = pressed.att
        this.keyRight = key.right
        this.keyLeft = key.left
        this.keyUp = key.up
        this.keyAtt = key.att
        this.attX = attack.x
        this.attWidth = attack.width        
    }

    draw()
    {
        c.fillStyle = this.color ;
        c.fillRect(this.x, this.y,this.width,this.height)
    }

    attack()
    {
        c.fillStyle = "yellow";
        c.fillRect(this.attX + this.x,this.y,this.attWidth,50);        
    }

    move()
    {
        this.draw();
            if(this.att)
            {
            this.attack(); 
            }
            if(this.right && this.x + this.dx + this.width < canvas.width)
            {
                this.x += this.dx;
            }
            if(this.left && this.x - this.dx  > 0)
            {
                this.x -= this.dx;
            }
           this.y += this.dy;   
           if(this.y + this.height + this.dy > canvas.height)
            this.dy = 0;
            else
            this.dy += .7; // gravity
    }
}
format  = {
    height : 150,
    width : 50
    },
playerProp  = {
    format,
    position : 
    {
        x :  0,
        y : 0,
    },
    delta : 
    {
        dx : 5,
        dy : 0
    },
    color : "Red",
    pressed : 
    {
        right : false,
        left : false,
        att : false,
        up : false
    },
    key : {
        right : 'ArrowRight',
        left : "ArrowLeft",
        up : "ArrowUp",
        att : " "
    },
    attack : {
        x : 0,
        width : 100
    }
}
enemyProp  = {
    format,
    position : 
    {
        x :100, 
        y : 100,
    },
    color : "Blue",
    delta : {
        dx : 5,
        dy : 0
    },
 pressed : 
    {
        right : false,
        left : false,
        up : false,
        att : false
    },
    key : {
        right : "d",
        left : "a",
        up :"w",
        att : "s"
    },
    attack : {
        x : 50,
        width : -100
    }
}
let  player = new Sprit(playerProp);
player.draw()
let  enemy = new Sprit(enemyProp)
enemy.draw()

function animate()
{
  window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
   c.fillRect(0,0,canvas.width,canvas.height)
        player.move();
        enemy.move();
}
animate()

const eventHandler = (player) => {
window.addEventListener("keydown", (e) => {
        if(e.key == player.keyRight)
        {
            player.right  = true;
        }
        if(e.key  == player.keyLeft)   
        {
            player.left = true;
        }
        if(e.key == player.keyUp)
            player.dy = -20;
        if(e.key == player. keyAtt)
            player.att = true;
    })
    window.addEventListener("keyup",(e) => {
        if(e.key == player.keyRight)
        {
            player.right  = false;
        }
        if(e.key  == player.keyLeft)   
        {
            player.left = false;
        }
        if(e.key == player.keyUp)
            player.up = false;
        if(e.key == player.keyAtt)
            player.att = false;
    })
}
eventHandler(player)
eventHandler(enemy)