
// const player = document.getElementById("ReadyPlayerOne");
const control = document.getElementById('canvas').getContext('2d');

// var viewportWidth = 635;
// var viewportHeight = 1385;
let viewportHeight = document.documentElement.clientWidth;
let viewportWidth = document.documentElement.clientHeight;

// TimeoutValue sets the refreshrate, now it's set to 10 times per second (milliseconds)
const timeoutValue = 100;
const IncreaseValue = 30;
const appleSize = 30;
const canvasEl = document.getElementsByTagName('canvas')[0];
canvasEl.width = viewportHeight-appleSize;
canvasEl.height = viewportWidth-appleSize;



window.addEventListener('resize',()=>{
    viewportWidth = document.documentElement.clientWidth-appleSize-appleSize;
    viewportHeight = document.documentElement.clientHeight-appleSize-appleSize;
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

let arrAppleBoundaries = [];
// this code generates the random apples
arrAppleBoundaries.push(generateApple());
arrAppleBoundaries.push(generateApple());
arrAppleBoundaries.push(generateApple());
arrAppleBoundaries.push(generateApple());
arrAppleBoundaries.push(generateApple());


function main(){
    if(direction === 'ArrowRight'){
        // x++;
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
    setTimeout(main, timeoutValue);      //
}

main();

function movePlayer(x, y){
    // console.log(viewportHeight);
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
    if(x>=maxViewportHeight-5){
        x=maxViewportHeight-5;
        direction = "";
    }
    if(y>=maxViewportWidth-5){
        y=maxViewportWidth-5;
        direction = "";
    }
// define all boundaries in new array with values of (x1,y1,x2,y2)
//     if(arrAppleBoundaries.isArray()){
        if(arrAppleBoundaries.length<=2){
            // this code generates the random apples
            arrAppleBoundaries.push(generateApple());
            arrAppleBoundaries.push(generateApple());
            arrAppleBoundaries.push(generateApple());
            console.log(arrAppleBoundaries);
        }
    for (let i = 0; i < arrAppleBoundaries.length; i++) {
        if(x >= arrAppleBoundaries[i][0] && x <= arrAppleBoundaries[i][2]){
            if(y >= arrAppleBoundaries[i][1] && y <= arrAppleBoundaries[i][3]){
                //grow snake grow! for now console log what you want to do little snake.
                control.beginPath();
                control.clearRect(arrAppleBoundaries[i][0], arrAppleBoundaries[i][1], appleSize+6, appleSize+6);
                arrAppleBoundaries.splice(i, 1);
                console.log("array after delete: ");
                console.log(arrAppleBoundaries);
            }
        }
    }

    // }
    moveXY.style.left = x + "px";
    moveXY.style.top  = y + "px";
}

function generateApple(){
    let r = appleSize / 2;
    let appleX = intRandom(r, 1360);
    let appleY = intRandom(r,615);
    console.log("apple random generated (x,y): (" + appleX + "," + appleY + ")");
    // inside color of the apple (red)
    control.fillStyle = '#FF0000';
    // begin drawing
    control.beginPath();
    // circle (x, y, startAngle = 0, endAngle, boolCounterClockWise)
    control.arc(appleX, appleY, r, 0, 2 * Math.PI, false);
    // fill circle inside red
    control.fill();
    // border of the circle
    control.lineWidth = 3;
    // not red but close
    control.strokeStyle = '#FF0066';
    control.stroke();
    // draw green
    control.fillStyle = "green";
    // 1/3rd opacity
    control.globalAlpha = 0.3;
    // draw the boundaries using rectangular overlay (to have "overlap-coordinates")
    //        fillRect(x, y, width plus a little extra, height plus a little extra);
    let appleRectX1 = appleX-r-3;
    let appleRectY1 = appleY-r-3;
    let appleRectX2 = parseInt(appleRectX1) + appleSize + 6;
    let appleRectY2 = parseInt(appleRectY1) + appleSize + 6;
    control.beginPath();
    control.fillRect(appleRectX1, appleRectY1, appleSize+6, appleSize+6);
    // reset opacity for further drawing..
    control.globalAlpha = 1;
    // store boundaries in new array  (x1,y1,x2,y2)
    return [appleRectX1, appleRectY1, appleRectX2, appleRectY2];
}

function intRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
