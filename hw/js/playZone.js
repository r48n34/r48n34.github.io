const canBox = document.getElementById("canBox");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const img = document.getElementById('source');

ctx.canvas.width  = window.innerWidth * 0.99;
ctx.canvas.height = window.innerHeight * 0.85;

class BallClass{

    constructor(startX, startY){
        this.ballRadius = 20;

        //Pol
        this.x = startX;
        this.y = startY;

        //speed
        this.dx = Math.random() >= 0.5 ? 3 : -3;
        this.dy = Math.random() >= 0.5 ? 3 : -3;

        this.ballcolor = "#0095DD";
    }

    calBallPol(){

        if( this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
                    
            this.dx = -this.dx;
            this.ballcolor = "#0095DD";

        }
        if( this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
            this.ballcolor = "#DC143C";
        }
                
        this.x += this.dx;
        this.y += this.dy;

    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = this.ballcolor;
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.drawBall();
        this.calBallPol();
    }

}

let ballArr = [
    new BallClass( canvas.width / 2 , canvas.height - 30),
    new BallClass( canvas.width / 4 , canvas.height - 90),
    new BallClass( canvas.width / 5 , canvas.height - 90),
    new BallClass( canvas.width / 6 , canvas.height - 160),
]

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 10, 10);

    for(let i of ballArr){
        i.move();
    }

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

function resizewindows() {
    ctx.canvas.width  = window.innerWidth * 0.99;
    ctx.canvas.height = window.innerHeight * 0.85;
}
  
window.onresize = resizewindows;