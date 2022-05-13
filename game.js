

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
// console.log("apple dropped: (x,y): (" + randomApple[0] + "," + randomApple[1] + ") and size = " + randomApple[2]);
let randomApple2 = generateApple();
// console.log("apple dropped: (x,y): (" + randomApple2[0] + "," + randomApple2[1] + ") and size = " + randomApple2[2]);
let randomApple3 = generateApple();
// console.log("apple dropped: (x,y): (" + randomApple3[0] + "," + randomApple3[1] + ") and size = " + randomApple3[2]);
let randomApple4 = generateApple();
// console.log("apple dropped: (x,y): (" + randomApple4[0] + "," + randomApple4[1] + ") and size = " + randomApple4[2]);
let randomApple5 = generateApple();
// console.log("apple dropped: (x,y): (" + randomApple5[0] + "," + randomApple5[1] + ") and size = " + randomApple5[2]);
let arrApples = [
    [randomApple[0], randomApple[1], randomApple[2]],
    [randomApple2[0], randomApple2[1], randomApple2[2]],
    [randomApple3[0], randomApple3[1], randomApple3[2]],
    [randomApple4[0], randomApple4[1], randomApple4[2]],
    [randomApple5[0], randomApple5[1], randomApple5[2]]
]
console.log(arrApples);
console.log(arrApples[0]);
console.log(arrApples[0][1]);
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
    // const ctx = canvas.getContext('2d');
    let appleX = intRandom(10, 1360);
    let appleY = intRandom(10,615);
    // control.fillStyle = 'green';
    // control.fillRect(appleX, appleY, appleSize, appleSize);

    let r = 15;
    control.fillStyle = '#FF0000';
    control.beginPath();
    control.arc(appleX, appleY, r, 0, 2 * Math.PI, false);
    control.fill();
    control.lineWidth = 3;
    control.strokeStyle = '#FF0066';
    control.stroke();

    return [appleX, appleY, appleSize, appleSize];
}

function intRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
