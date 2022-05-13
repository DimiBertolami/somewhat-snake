

// var viewportWidth = 635;
// var viewportHeight = 1385;
var viewportHeight = document.documentElement.clientWidth;
var viewportWidth = document.documentElement.clientHeight;

const IncreaseValue = 10;
const appleSize = 30;
var canvasEl = document.getElementsByTagName('canvas')[0];
canvasEl.width = viewportHeight-appleSize-appleSize;
canvasEl.height = viewportWidth-appleSize-appleSize;

// this code generates the random apples
let randomApple = generateApple();
let randomApple2 = generateApple();
let randomApple3 = generateApple();
let randomApple4 = generateApple();
let randomApple5 = generateApple();
// define all boundaries
let arrApples = [
    [randomApple[0], randomApple[1], randomApple[2],randomApple[3]],
    [randomApple2[0], randomApple2[1], randomApple2[2]],randomApple2[3],
    [randomApple3[0], randomApple3[1], randomApple3[2]],randomApple3[3],
    [randomApple4[0], randomApple4[1], randomApple4[2]],randomApple4[3],
    [randomApple5[0], randomApple5[1], randomApple5[2]], randomApple5[3]
]
console.log("array of apples");
console.log(arrApples);
for (let i = 0; i < arrApples.length; i++) {

    console.log("apple (" + (i+1) + ") (x1,y1): (" + arrApples[i][0] + ", " + arrApples[i][1] + ") (x2,y2): (" + arrApples[i][2] + "," + arrApples[i][2] + ")");
}
// this code generates the random apples


window.addEventListener('resize',()=>{
    viewportWidth = document.documentElement.clientWidth-appleSize-appleSize;
    viewportHeight = document.documentElement.clientHeight-appleSize-appleSize;
})

const player = document.getElementById("ReadyPlayerOne");
let x = viewportHeight/2;
let y= viewportWidth/2;
let direction;

document.body.addEventListener("keydown", function(event){
    direction = event.key;
    // console.log(direction);
    }
);
document.body.addEventListener("keyup", function(event){
    direction = event.key;
    }
)


function main(){
    if(direction === 'ArrowRight'){
        x++;
        x= x+IncreaseValue;
    }
    if(direction === 'ArrowLeft'){
        x=x-IncreaseValue;
    }
    if(direction === 'ArrowDown'){
        y= y+IncreaseValue;
    }
    if(direction === 'ArrowUp'){
        y=y-IncreaseValue;
    }
    movePlayer(x, y);
    setTimeout(main, 50);
}

main();

function movePlayer(x, y){
    // console.log(viewportHeight);
    // console.log(viewportWidth);
    let maxViewportHeight = viewportHeight-appleSize-IncreaseValue;
    let maxViewportWidth = viewportWidth-appleSize-IncreaseValue;
    let moveXY = document.getElementById("ReadyPlayerOne");
    // console.log("x: " + x + " y: " + y);
    // console.log("direction: " + direction);
    if(x<=7){
        x=7
        direction = "";
    }
    if(y<=7){
        y=7
        direction = "";
    }
    if(x>=maxViewportHeight-appleSize-IncreaseValue-IncreaseValue-5){
        x=maxViewportHeight-appleSize-IncreaseValue-IncreaseValue-IncreaseValue-5;
        direction = "";
    }
    if(y>=maxViewportWidth-appleSize-IncreaseValue-IncreaseValue-5){
        y=maxViewportWidth-appleSize-IncreaseValue-IncreaseValue-IncreaseValue-5;
        direction = "";
    }
    moveXY.style.left = x + "px";
    moveXY.style.top  = y + "px";
}

function generateApple(){
    const control = document.getElementById('canvas').getContext('2d');
    let appleX = intRandom(10, 1360);
    let appleY = intRandom(10,615);
    let rTwo = appleSize
    let r = rTwo / 2;
    // inside color of the apple (red)
    control.fillStyle = '#FF0000';
    // begin drawing
    control.beginPath();
    // circle (x, y, startAngle = 0, endAngle, boolCouterClockWise)
    control.arc(appleX, appleY, r, 0, 2 * Math.PI, false);
    // fill circle inside red
    control.fill();
    // border of the circle
    control.lineWidth = 3;
    control.strokeStyle = '#FF0066';
    control.stroke();
    // draw green
    control.fillStyle = 'green';
    // half the opacity of the apple
    control.globalAlpha = 0.5;
    // actually draw the boundaries
    control.fillRect(appleX-r-2, appleY-r-2, appleSize+3, appleSize+3);
    // reset opacity for further drawing..
    control.globalAlpha = 1;
    // store boundaries in new array
    return [appleX-r, appleY-r, parseInt(appleX)+r, parseInt(appleY)+r];
}

function intRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
