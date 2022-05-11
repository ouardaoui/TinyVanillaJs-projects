const canvas = document.querySelector('canvas')
canvas.height = 576
canvas.width = 1024
const enemyHp =  document.querySelector('.enemy')
const playerHp =  document.querySelector('.player')
let time = document.querySelector('.time')
let c = canvas.getContext('2d')

time.textContent = 60;


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
        c.fillRect(this.attX + this.x,this.y,this.
            attWidth,50);        
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
        x :  256 - 50,
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
        x :256 *3, 
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
let i = 0;
let j = 0;
// check collition beetwon player and enemy
const collision = (player, enemy) => {
    if((player.x  + player.attWidth  >= enemy.x ) 
    && (player.x +player.attWidth <= enemy.x + enemy.width)
    && (player.y <= enemy.y + enemy.height )
    && (player.y + 50  >= enemy.y))
    {
        if(player.att && i <= 100 && j <= 100)
        {
            i += 1;
            playerHp.style.width = i + "%";
        }
        if(enemy.att)
        {
            j += 1;
            enemyHp.style.width = j + "%";
        }
    }
    console.log(i,j);
}

const a = setInterval(function(){
    time.textContent -= 1;
    if(i >= 100 || j>= 100 )
        time.textContent = 0;
    if(time.textContent == 0)
    {
        if(i > j ){
        console.log("player won" );
        clearInterval(a);
        }
        else if(i < j ){
        console.log('enemy won');
        clearInterval(a);
        } 
        else
            time.textContent = 20;
    }
},1000);

function animate()
{
  window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
   c.fillRect(0,0,canvas.width,canvas.height)
        player.move();
        enemy.move();
        if(player.att || enemy.att)
        {
            collision(player,enemy)
        }
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
        {
            setTimeout(() => {
            player.att = false;
            }, 100)
        }
    })
}
eventHandler(player)
eventHandler(enemy)
