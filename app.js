let container = document.querySelector('.container');
//# for id
let ball = document.querySelector('#ball');
let paddle = document.querySelector('.paddle');
let btn_start = document.querySelector('.startBtn');

let gameOver = true;

//keep the ball in the game keep it on the paddle back and forth when I move it.
//When I press the keyup it releases the ball.
let gameInPlay = false;
let score = 0;
let lives = 3;

//for animation
let animationRepeat;

//Ball direction - what direction the ball is moving, how many slots is moving and last one can be speed
let ballDir = [5, 5, 5];

// 1st one We can set a horizontal x axes  
// 2nd one vertucal y axes
// and we can ajust those numbers with js

//container dimensions 
/*
https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 container.getBoundingClientRect() returns an object that contains the size and position 
 of the bounding rectangle for the specified element relative to the viewport.
 Once the containerDim variable has been assigned the value of the 
 container.getBoundingClientRect() function call, you can access various properties 
 of the returned object to obtain information about the size and position of the 
 element on the page. For example, you might use containerDim.width to obtain 
 the width of the element, or containerDim.top to obtain the distance from 
 the top of the viewport to the top of the element.
 */
let containerDim = container.getBoundingClientRect();
//console.log(containerDim);

btn_start.addEventListener('click', startGame);
document.addEventListener('keydown', function (e) {
    // when i press a key   
    let key = e.keyCode;
    //stops propagation
    e.preventDefault();
    //checks the key
    //then user wants to go left
    if (key === 37) paddle.left = true;
    //then user wants to go right
    else if (key === 39) paddle.right = true;
    else if (key === 38 && !gameInPlay) gameInPlay = true;
    //let key = event.key
    //console.log(key)
});
//to cancel it
document.addEventListener('keyup', function (e) {
    let key = e.keyCode;
    e.preventDefault();
    if (key === 37) paddle.left = false;
    else if (key === 39) paddle.right = false;
});

function startGame() {
    if (gameOver) {
        //to hide gameover when we start the game
        document.querySelector('.gameover').style.display = 'none';
        //ball should be visable
        ball.style.display = 'block';
        //this is going to tell the browser performing the animation. Keep looping through whatever function 
        //we've got within the parameters here. Is goint to play out.
        //Looping over the update and this is where we have actions in the game
        lives = 3;
        setupBricks(18);
        lifeUpdater();
        animationRepeat = requestAnimationFrame(update);
        // console.log(paddle);
        // console.dir(paddle)
        gameOver = false;
        // to release the ball set true
        gameInPlay = false;
        //let gameInPlay = false;
        //console.dir(paddle)
    }
};

function setupBricks(num) {
    let row = {
        x: ((containerDim % 100) / 2),
        y: 50
    };
    for (let x = 0; x < num; x++) {
        if (row.x > (containerDim.width - 100)) {
            row.y += 70;
            row.x = ((containerDim.width % 100) / 2);
        }
        brickMaker(row);
        row.x += 100;
    }
}

function brickMaker(row) {
    let div = document.createElement('div');
    div.setAttribute('class', 'brick');
    div.style.backgroundColor = 'yellow';
    let pointDiv = Math.ceil(Math.random() * 10) + 2;
    div.dataset.points = pointDiv;
    div.innerHTML = pointDiv;
    div.style.left = row.x + 'px';
    div.style.top = row.y + 'px';
    container.appendChild(div);

}
function update() {
    //Animation
    //Check if the gameOver still false
    if (gameOver === false) {
        //if it is so we can put the game and play
        let pCurrent = paddle.offsetLeft;
        //lets check paddle is exist
        if (paddle.left && pCurrent > 0) {
            pCurrent -= 5;
        } else if (paddle.right && pCurrent < (containerDim.width - paddle.offsetWidth)) {
            pCurrent += 5;
        }
        paddle.style.left = pCurrent + 'px';
        // console.log(pCurrent);
        //Moving a ball   
        if (!gameInPlay) {
            waitingOnPaddle();
        } else {
            ballMove();
        }
        animationRepeat = requestAnimationFrame(update);

        /*
        offsetLeft is a property of DOM elements in JavaScript that represents the distance, 
        in pixels, between the left edge of the element and the left edge of its nearest positioned 
        ancestor element.
         */
        // console.log(pCurrent);


    }

}

function waitingOnPaddle() {
    //Move the ball
    ball.style.top = (paddle.offsetTop - 22) + 'px';
    ball.style.left = (paddle.offsetLeft + 70) + 'px';

}

function ballMove() {
    // X - position (horizontal position)
    let x = ball.offsetLeft;
    // Y - position (vertical position)
    let y = ball.offsetTop;
    //if(x > containerDim.width || x < 0) {
    if (x > (containerDim.width - 20) || x < 0) {
        ballDir[0] *= -1;
    }
    if (y > (containerDim.height - 20) || y < 0) {
        if (y > (containerDim.height - 20)) {
            fallOffTheEdge();
            return;
        };
        ballDir[1] *= -1;
    }
    //Collision checks if our 2 elements are colliding
    if (isCollide(ball, paddle)) {
        //collision
        // Callculation of collision x is where the ball is located and we also can find where the paddle is located
        // dividing by 10 giving a spread between -9 to +9. Ideal for ball direction calculation (BallDir)
        let nDir = ((x - paddle.offsetLeft) - (paddle.offsetWidth / 2))/10;
        //console.log(nDir);
        ballDir[0] = nDir;
        ballDir[1] *= -1;
        console.log('HIT');
        /*
        Example
    bottom: 679
    height: 602
    left: 81.1875
    right: 668.78125
    top: 77
    width: 587.59375
    x: 81.1875
    y: 77
    
    How to calculate 
    left top 00 corner was 81.1875 - horizontal X coordinates
    far right top corner would have the same top position, has Y position
    X position = 81.1875 + 587.59375 = 668.78125
    */

    }
    x += ballDir[0];
    y += ballDir[1];
    // x++;
    ball.style.top = y + 'px';
    ball.style.left = x + 'px';
}

//LifeUpdater

function lifeUpdater() {
    document.querySelector('.lives').innerHTML = lives;
}

function stopper() {
    gameInPlay = false;
    //ball sit on top of the paddle
    ballDir[0 - 5];
    waitingOnPaddle()

    //cancel animation frame
    window.cancelAnimationFrame(animationRepeat);

}

//FallOffTheEdge func
/*
Whe the ball has gone too far and it stops the ball for moving
 */
function fallOffTheEdge() {
    //Loosing the live as well when the ball FallOffTheEdge
    lives--;
    lifeUpdater()
    stopper();
}


//Detect Collision
/*Two different objects on the page and we want to know when element a (ball) 
travels over any other bounding box of the paddle b.
So I abble to check if at any point of any coordinaties top lefthand side to bottom righthand side 
so all 4 corners of that element whatever overlaping.
*/

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    console.log(aRect);
    console.log(bRect);
    console.log('********');
    console.log(aRect.bottom < bRect.top || aRect.top > bRect.bottom || aRect.right < bRect.left || aRect.left > bRect.right);
}







