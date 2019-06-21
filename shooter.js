canvas = document.getElementById("myCanvas");

ctx = canvas.getContext("2d");
canvas.width=window.innerWidth*0.4;

canvas.height=window.innerHeight*0.8;
var height=canvas.height;
var width = canvas.width;
var dx = 6;
var rightClicked = false;
var leftClicked = false;
var paused = false;
var score=0;
var noOfBullets=1;
var counter=0;
var noOfRocks=0;
var side;
var level = 0;
var cannon= new Image();
cannon.src= "cannon.jpg";

var image = [];
image.push(new Image());
image[0].src = "space.png";
image.push(new Image());
image[1].src = "time.png";
image.push(new Image());
image[2].src = "power.png";
image.push(new Image());
image[3].src = "soul.png";
image.push(new Image());
image[4].src = "reality.png";
image.push(new Image());
image[5].src = "mind.png";


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 37) {
        rightClicked = true;
    }

    else if (e.keyCode == 39) {
        leftClicked = true;
    }

    else if (e.keyCode == 32) {
        paused = !paused;
    }

    else if (e.keyCode == 13) {
        start  = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 37) {
        rightClicked = false;
    }

    else if (e.keyCode == 39) {
        leftClicked = false;
    }
}
function scenery(){
	ctx.fillStyle="#CFF3F9";
	ctx.fillRect(0,0,width,500);
	ctx.beginPath();
	ctx.fillStyle="#778CBF"
    ctx.moveTo(0,300);
    ctx.lineTo(canvas.width*0.13,200);
    ctx.lineTo(canvas.width*0.35,400);
    ctx.lineTo(0,400);
    ctx.lineTo(0,300);
    

    ctx.moveTo(width*0.25,307);
    ctx.lineTo(canvas.width*0.5,150);
    ctx.lineTo(width*0.75,307);
    ctx.lineTo(canvas.width*0.65,400);
    ctx.lineTo(canvas.width*0.35,400);
    ctx.lineTo(width*0.25,307);
    
    ctx.moveTo(canvas.width*0.65,400);
    ctx.lineTo(width*0.87,200);
    ctx.lineTo(width,300);
    ctx.lineTo(width,400);
    ctx.lineTo(width*0.65,400);
    ctx.fill();

    ctx.closePath();
    
    ctx.beginPath();
    ctx.fillStyle="white";

    ctx.moveTo(width*0.04,270);
    ctx.lineTo(width*0.10,260);
    ctx.lineTo(width*0.14,280);
    ctx.lineTo(width*0.20,265);
    ctx.lineTo(width*0.13,200);
   
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.moveTo(width*0.38,225);
    ctx.lineTo(width*0.42,250);
    ctx.lineTo(width*0.5,220);
    ctx.lineTo(width*0.57,245);
    ctx.lineTo(width*0.63,230);
    ctx.lineTo(width*0.5,150);

    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.moveTo(width*0.81,250);
    ctx.lineTo(width*0.84,270); 
    ctx.lineTo(width*0.89,248);
    ctx.lineTo(width*0.95,260);
    ctx.lineTo(width*0.87,200) 
    ctx.fill();
    ctx.closePath();
    
}
function Ground() {
    this.x = 0;
    this.y = height - 100;

    this.draw = function() {

        ctx.beginPath();
    
    var gradient = ctx.createLinearGradient(0,400, 0,height);
    gradient.addColorStop(0, "#25CD71");
    
    gradient.addColorStop(1, '#5EDF34');
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x,this.y,width,height);
    ctx.closePath();
    }
}

var ground = new Ground();
function Cannon() {
    this.x = width / 2 -30;
    this.y = height - 160;
    this.width = 60;
    this.height = 60;

    this.update = function() {

        if (leftClicked) {
            dx = 6;
        }
        if (rightClicked) {
            dx = -6;
        }
        if (this.x > width - 60) {
            this.x = width - 60;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (!leftClicked && !rightClicked) {
            dx = 0;
        }

        this.x += dx;

        this.draw();
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.drawImage(cannon, this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
}
var cannon1 = new Cannon();
function Bullet() {
    this.radius = 3;
    this.x = cannon1.x + 30;
    this.y = cannon1.y;
    this.speed = 15;
    var x = 1;

    this.update = function() {
        this.y -= this.speed;
        if (score / 100 > x) {
            this.speed += 1;
            x++;
        }
        this.draw();
    } 

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

var bullets = [];
var bullet = new Bullet();
bullets.push(bullet);
function createBullets() {
    if (counter % 5 === 0 && noOfBullets < 60) {
        var b = new Bullet();
        bullets.push(b);
        noOfBullets++;
    }
}
function Rock(side, xPos, yPos) {
    var direction = side;
    if (xPos > 0 && yPos > 0) {
        this.x = xPos;
        this.y = yPos;
        this.ySpeed = -2;
        this.chance = false;
        this.health = Math.round(40 + Math.random() * 20);
    }
    else {
        this.chance = true;
        this.ySpeed = 2;
        this.health = Math.round(80 + Math.random() * 50);
        direction = 1;
        this.y = 30 + Math.random() * 200;
        if (side > 0) {
            this.x = 0;
        }
        else {
            this.x = width - 60;
            direction = -1;
        }
    }
    
    var i = Math.round(Math.random() * 5);
    this.xSpeed = 1 * direction;
    this.gravity = 0.025;

    this.update = function() {
        
        if (this.y > ground.y - 60 || this.y <= 0) {
            this.ySpeed = -this.ySpeed;
        }

        if (this.x > width - 60 || this.x < 0) {
            this.xSpeed = -this.xSpeed;
        }

        this.y += this.ySpeed;
        this.x += this.xSpeed;
        this.ySpeed += this.gravity;

        this.draw();
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.drawImage(image[i], this.x, this.y, 60, 60);
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillStyle = "#000000"
        ctx.fillText(this.health, this.x + 20, this.y + 20);
        ctx.closePath();
    }

}

var rocks = [];

function createRocks() {
    if (counter % 700 === 0) {
        var variable = Math.round(Math.random() * 3);
        if (variable % 2 === 0) {
            side = 1;
        } 
        else {
            side = -1;
        }
        var r = new Rock(side, 0, 0);
        rocks.push(r);
        noOfRocks++;
    }
}

function isCollidingWithCannon(r) {
    if (r.x + 30 > cannon1.x && r.x + 0 < cannon1.x + cannon1.width && r.y + 30 > cannon1.y && r.y + 30 < cannon1.y + cannon1.height) {
        return true;
    }
}

function isCollidingWithRock(b, r) {
    var a = Math.abs(b.x - r.x - 30);
    var b = Math.abs(b.y - r.y - 30);
    var c = 33;
    if (Math.pow(a, 2) + Math.pow(b, 2) < Math.pow(c, 2)) {
        return true;
    }
}

function game(){
    ctx.clearRect(0,0,width,height);
    scenery();
    ground.draw();
    cannon1.update();
    createBullets();
    createRocks();
    
    if (paused) {
        ctx.font = "40px";
        ctx.fillText("Paused", width / 2, height / 2);
        return;
    }
    for (var i = 0; i < noOfRocks; i++) {
        r = rocks[i];
        r.update();
    }

    for (var i = 0; i < noOfBullets; i++) {
        b = bullets[i];
        b.update(); 

        if (b.y < 0) {
            b.y = cannon1.y;
            b.x = cannon1.x + 30;
        }
        
    }
    for (var i = 0; i < noOfRocks; i++) {

        if (isCollidingWithCannon(rocks[i])) {
            alert("GAME OVER!!Your score is " + score);
            
            ctx.fillText("Game Over", 200, 200);
            var highScore = localStorage.getItem("highScore");
            if (score > highScore) {
                alert("New High Score");
                localStorage.setItem("highScore", score);
            }
            document.location.reload();
            clearInterval(interval);
        }

        for (var j = 0; j < noOfBullets; j++) {

            if (rocks[i].health <= 0) {

                if (rocks[i].chance) {
                    var r1 = new Rock(1, rocks[i].x, rocks[i].y);
                    noOfRocks++;
                    rocks.push(r1);
                    var r2 = new Rock(-1, rocks[i].x, rocks[i].y);
                    noOfRocks++;
                    rocks.push(r2);

                    rocks.splice(i, 1);
                    noOfRocks--;
                    score--;
                    level += 5;
                }

                else {
                    rocks.splice(i, 1);
                    noOfRocks--;
                    score--;
                    level += 5;
                }
            }

            if (isCollidingWithRock(bullets[j], rocks[i])) {
                bullets.splice(j, 1);
                noOfBullets--;
                rocks[i].health--;
                score++;
            }
        }
    }
    ctx.font = "14px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 15);
    ctx.fillText("Press space to pause",width-125,15);
    counter++;
}
var interval=setInterval(game,10);
