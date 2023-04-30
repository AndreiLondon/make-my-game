let container = document.querySelector('.container');
//# for id
let ball = document.querySelector('#ball');
let paddle = document.querySelector('.paddle');
let btn_start = document.querySelector('.startBtn');

let gameOver = false;

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
console.log(containerDim);

btn_start.addEventListener('click', startGame);
document.addEventListener('keydown', function(e) {
    // when i press a key   
    let key = e.keyCode;
    //stops propagation
    e.preventDefault();
    //checks the key
    //then user wants to go left
    if (key === 37) paddle.left = true;
    //then user wants to go right
    else if (key === 39) paddle.right = true;
    //let key = event.key
    console.log(key)
});
//to cancel it
document.addEventListener('keyup', function(e) {
    let key = e.keyCode;
    e.preventDefault();
    if (key === 37) paddle.left = false;
    else if (key === 39) paddle.right = false;

});
function startGame() {
    //to hide gameover when we start the game
    document.querySelector('.gameover').style.display = 'none';
    //ball should be visable
    ball.style.display = 'block';
    //this is going to tell the browser performing the animation. Keep looping through whatever function 
    //we've got within the parameters here. Is goint to play out.
    //Looping over the update and this is where we have actions in the game
    animationRepeat = requestAnimationFrame(update);
    // console.log(paddle);
    // console.dir(paddle)
    let gameOver = false;
    // to release the ball set true
    let gameInPlay = true;
    //let gameInPlay = false;
    console.dir(paddle)
};
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
if(x > containerDim.width-20 || x < 0) {
    ballDir[0] *= -1;
}
if(y > containerDim.height-20 || y < 0) {
    ballDir[1] *= -1;
}
if(isCollide(ball,paddle)) {
    //collision

}
    x += ballDir[0];
    y += ballDir[1];
    // x++;
    ball.style.top = y + 'px';
    ball.style.left = x + 'px';
}

//Detect Collision

function isCollide(a,b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    console.log()
}





