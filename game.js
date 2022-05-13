

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
// define all boundaries in new array with values of (x1,y1,x2,y2)
let arrAppleBoundaries = [
        [randomApple[0],  randomApple[1],  randomApple[2],  randomApple[3]],
        [randomApple2[0], randomApple2[1], randomApple2[2], randomApple2[3]],
        [randomApple3[0], randomApple3[1], randomApple3[2], randomApple3[3]],
        [randomApple4[0], randomApple4[1], randomApple4[2], randomApple4[3]],
        [randomApple5[0], randomApple5[1], randomApple5[2], randomApple5[3]]
    ]
// console.log("apples is " + arrAppleBoundaries.length);
console.log(arrAppleBoundaries);
for (let i = 0; i < arrAppleBoundaries.length; i++) {
    console.log("apple (" + (i+1) + ") (x1,y1): (" + arrAppleBoundaries[i][0] + "," + arrAppleBoundaries[i][1] + ") (x2,y2): (" + arrAppleBoundaries[i][2] + "," + arrAppleBoundaries[i][3] + ")");
}


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
    setTimeout(main, 1000);
}

main();

function movePlayer(x, y){
    // console.log(viewportHeight);
    console.log("_________________________________________________________________________________");
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
    for (let i = 0; i < arrAppleBoundaries.length; i++) {
        if(x === arrAppleBoundaries[i][0] || x===arrAppleBoundaries[i][2]){
            console.log(arrAppleBoundaries[i][0] + " x " + arrAppleBoundaries[i][2]);
            if(y === arrAppleBoundaries[i][1] || x === arrAppleBoundaries[i][3]){
                console.log(arrAppleBoundaries[i][1] + " y " + arrAppleBoundaries[i][3]);
                //grow snake grow! for now consolelog what you want to do little snake..
                // what kind of monster feeds a snake apples by the way..
                // console.log("boundaries are crossed!")

            }
        }
    }
    moveXY.style.left = x + "px";
    moveXY.style.top  = y + "px";
}

function generateApple(){
    const control = document.getElementById('canvas').getContext('2d');
    let rTwo = appleSize
    let r = rTwo / 2;
    let appleX = intRandom(r, 1360);
    let appleY = intRandom(r,615);

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
    // not red but close
    control.strokeStyle = '#FF0066';
    control.stroke();
    // draw green
    control.fillStyle = "green";
    // half the opacity of the apple
    control.globalAlpha = 0.5;
    // actually draw the boundaries fillRect(x, y, width plus a little extra, height plus a little extra);
    let appleRectX1 = appleX-r-3;
    let appleRectY1 = appleY-r-3;
    let appleRectX2 = appleX-r+6;
    let appleRectY2 = appleY-r+6;
    control.fillRect(appleRectX1, appleRectY1, appleSize+6, appleSize+6);
    // reset opacity for further drawing..
    control.globalAlpha = 1;
    // store boundaries in new array  (x1,y1,x2,y2)
    return [appleRectX1, appleRectY1, appleRectX2, appleRectY2];
}

function intRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
