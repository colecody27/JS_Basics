    //Creating connection to canvas that allows for designing
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
//let header = document.getElementById(hits);
let header = document.querySelector('h1');

    //Create variables for moving ball 
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

    
    //Create variables for paddle 
let pHeight = 10;
let pWidth = 75;
let paddleX = (canvas.width-pWidth)/2;
let paddleY = (canvas.height-pHeight);
let paddleHits = 0;
header.textContent = 'Hits: ' + paddleHits;

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, paddleY, pWidth, pHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function paddleMover(){
        if(rightPressed){
            paddleX += 7;
        if(paddleX + pWidth > canvas.width)
            paddleX = canvas.width - pWidth;
        }
        else if(leftPressed){
            paddleX -= 7;
            if(paddleX < 0)
                paddleX = 0;
        }
    }

    function keyDownHandler(e){
        if(e.key == "Right" || e.key =="ArrowRight")
            rightPressed = true;
        else if(e.key == "Left" || e.key =="ArrowLeft")
            leftPressed = true;
    }

    function keyUpHandler(e){
        if(e.key == "Right" || e.key =="ArrowRight")
            rightPressed = false;
        else if(e.key == "Left" || e.key =="ArrowLeft")
            leftPressed = false;
    }

    //If next iteration will have a collision, reverse direction
    function collisionAvoidance(){
        if(x + dx >= canvas.width-ballRadius || x + dx < ballRadius)
            dx = -dx;
   
        if(y + dy < ballRadius) {
            dy = -dy;
            } else if(y + dy > canvas.height-ballRadius) {
                if(x >= paddleX && x <= paddleX + pWidth) {
                    dy = -dy;
                    paddleHits++;
                    header.textContent = 'Hits: ' + paddleHits;
                    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
                    ctx.fillStyle = randomColor;
                    ctx.fill();
                }
                else {
                    alert("GAME OVER");
                    document.location.reload();
                    clearInterval(interval);
                }
            }
        
    }

    //Creating a drawing loop that utilizes the "interval function"
    function draw(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawPaddle();
        paddleMover();
        drawBall();
        x+= dx;
        y+= dy;
        collisionAvoidance();
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    let interval = setInterval(draw, 10 - paddleHits/10);

/*
    Create semi-transparent rectangle  
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
*/