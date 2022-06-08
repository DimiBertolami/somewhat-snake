
// const player = document.getElementById("ReadyPlayerOne");
const control = document.getElementById('canvas').getContext('2d');
const ReadyPlayerOne = document.getElementById('ReadyPlayerOne');
const ghost1 = document.getElementById('ghost1');
const ghost2 = document.getElementById('ghost2');
const ghost3 = document.getElementById('ghost3');
const ghost4 = document.getElementById('ghost4');
count = 0;

// let viewportHeight = document.documentElement.clientWidth;
// let viewportWidth = document.documentElement.clientHeight;
var viewportWidth = 635;
var viewportHeight = 1385;
// TimeoutValue sets the refreshrate in milliseconds
const timeoutValue = 50;
const IncreaseValue = 10;
const appleSize = 50;
const initialApples = 5;
const canvasEl = document.getElementsByTagName('canvas')[0];
canvasEl.width = viewportHeight-appleSize;
canvasEl.height = viewportWidth-appleSize;

let arrAppleBoundaries = [];
let arrApplesEaten = [];

window.addEventListener('resize',()=>{
    viewportWidth = document.documentElement.clientWidth-appleSize-appleSize;
    // viewportWidth = canvasEl.width;
    viewportHeight = document.documentElement.clientHeight-appleSize-appleSize;
    // viewportHeight = canvasEl.height;
})

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
// this code generates the random apples
for (let i = 0; i < initialApples; i++) {arrAppleBoundaries.push(generateApple());}
ReadyPlayerOne.appendChild(document.createTextNode(`0`));

main();

function main(){
    if(direction === 'ArrowRight'){x= x+IncreaseValue}
    if(direction === 'ArrowLeft'){x=x-IncreaseValue}
    if(direction === 'ArrowDown'){y= y+IncreaseValue}
    if(direction === 'ArrowUp'){y=y-IncreaseValue}
    movePlayer(x, y);
    moveGhosts(x, y);
    setTimeout(main, timeoutValue);
}
function moveGhosts(x, y){
        if(getBounds(ghost1)==='ghost1 caught you'){
            // console.log('hello from ghost1');
        }
        if(getBounds(ghost2)==='ghost2 caught you'){
        // console.log('ghost2 also says hi');
       }
        if(getBounds(ghost3)==='ghost3 caught you'){
        // console.log('ghost3 just killed you');
        }
        if(getBounds(ghost4)==='ghost4 caught you'){
            // console.log('ghost4 just snuffed you');
        }
}
function getBounds(ghost){
    let PlayerBoundaries = ReadyPlayerOne.getBoundingClientRect();
    let ghostBoundaries = ghost.getBoundingClientRect();
    let ghostX = document.getElementById(ghost.id);
    playerLeft = PlayerBoundaries.left +'px';
    playerTop = PlayerBoundaries.top +'px';
    playerRight = PlayerBoundaries.left + PlayerBoundaries.width + 'px';
    playerBottom = PlayerBoundaries.top + PlayerBoundaries.height + 'px';
    ghostLeft = ghostBoundaries.left + 'px';
    ghostRight = ghostBoundaries.left+ 30 +'px';
    ghostTop = ghostBoundaries.top+ 'px';
    ghostBottom = ghostBoundaries.top+ 30+ 'px';
    if(ghostLeft>=playerLeft && ghostRight <= playerRight){
        console.log(`${ghostX.id} caught you`);
    } else {
        ghost.style.top = PlayerBoundaries.top + 'px';
        ghost.style.left = PlayerBoundaries.left + 'px';
        // console.log(`${ghostX.id} is moving closer to you`);
    }
}
function movePlayer(x, y){
    let maxViewportHeight = viewportHeight-appleSize-IncreaseValue;
    let maxViewportWidth = viewportWidth-appleSize-IncreaseValue;

    if(x<=7){
        x=7
        direction = "";
    }
    if(y<=7){
        y=7
        direction = "";
    }
    if(x>=maxViewportHeight-5){
        x=maxViewportHeight-5;
        direction = "";
    }
    if(y>=maxViewportWidth-5){
        y=maxViewportWidth-5;
        direction = "";
    }
        // all five apples gone? here's some more
        if(arrAppleBoundaries.length<1){
            // this code generates the extra random apples
            arrAppleBoundaries.push(generateApple());
            arrAppleBoundaries.push(generateApple());
            arrAppleBoundaries.push(generateApple());
            arrAppleBoundaries.push(generateApple());
            arrAppleBoundaries.push(generateApple());
        }
        // eat apples, remove apple from array, update player counter
    for (let i = 0; i < arrAppleBoundaries.length; i++) {
        if(x >= arrAppleBoundaries[i][0] && x <= arrAppleBoundaries[i][2]){
            if(y >= arrAppleBoundaries[i][1] && y <= arrAppleBoundaries[i][3]){
                control.beginPath();
                arrApplesEaten.push(arrAppleBoundaries[i]);
                control.clearRect(arrAppleBoundaries[i][0], arrAppleBoundaries[i][1], appleSize+6, appleSize+6);
                arrAppleBoundaries.splice(i, 1);

                ReadyPlayerOne.removeChild(ReadyPlayerOne.childNodes[0]);
                ReadyPlayerOne.appendChild(document.createTextNode(`${++count}`));

            }
        }
    }

    ReadyPlayerOne.style.left = x + "px";
    ReadyPlayerOne.style.top  = y + "px";
}
function generateApple(){
    // requestAnimationFrame(generateApple);
    let r = appleSize/2;
    let appleX = intRandom(70, 1250);
    let appleY = intRandom(70,550);
    console.log(`apple (${appleX},${appleY})`);
    // inside color of the apple (red)
    control.fillStyle = 'green';
    // begin drawing
    control.beginPath();
    // circle (x, y, startAngle = 0, endAngle, boolCounterClockWise)
    control.arc(appleX, appleY, r, 0, 2 * Math.PI, false);
    // fill circle inside red
    control.fill();
    // border of the circle
    control.lineWidth = 3;
    // not red but close
    control.strokeStyle = 'yellow';
    control.stroke();
    // draw green
    control.fillStyle = "green";
    // 1/3rd opacity
    control.globalAlpha = 0.1;
    // draw the boundaries using rectangular overlay (to have "overlap-coordinates")
    //        fillRect(x, y, width plus a little extra, height plus a little extra);
    let appleRectX1 = appleX-r-3;
    let appleRectY1 = appleY-r-3;
    let appleRectX2 = parseInt(appleRectX1) + appleSize + 6;
    let appleRectY2 = parseInt(appleRectY1) + appleSize + 6;
    control.beginPath();
    control.fillRect(appleRectX1+3, appleRectY1+3, appleSize, appleSize);
    // reset opacity for further drawing..
    control.globalAlpha = 1;
    // store boundaries in new array  (x1,y1,x2,y2)
    return [appleRectX1, appleRectY1, appleRectX2, appleRectY2];
}
function intRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
