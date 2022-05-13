

var viewportWidth = 635;
var viewportHeight = 1385;
let appleSize = 30;
generateApple();

window.addEventListener('resize',()=>{
    viewportWidth = document.documentElement.clientWidth;
    viewportHeight = document.documentElement.clientHeight;
})
/*----GetWindowSizeNoScrollBarrs--FINISH-------*/
const player = document.getElementById("ReadyPlayerOne");
let x = viewportHeight/2;
let y= viewportWidth/2;
let IncreaseValue = 1;
let direction;

document.body.addEventListener("keydown", function(event){
    direction = event.key;
    console.log(direction);
    }
);
document.body.addEventListener("keyup", function(event){
    direction = event.key;
    // console.log("letting go of key: " + direction);
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
    console.log(viewportHeight);
    console.log(viewportWidth);
    let maxViewportHeight = viewportHeight-50;
    let maxViewportWidth = viewportWidth-45;
    let moveXY = document.getElementById("ReadyPlayerOne");
    console.log("x: " + x + " y: " + y);
    if(x<=7){
        x=7
        direction = "";
    }
    if(y<=7){
        y=7
        direction = "";
    }
    if(x>=maxViewportHeight){
        x=maxViewportHeight;
        direction = "";
    }
    if(y>=maxViewportWidth){
        y=maxViewportWidth;
        direction = "";
    }
    moveXY.style.left = x + "px";
    moveXY.style.top  = y + "px";
}

function generateApple(){
    const control = document.getElementById('canvas').getContext('2d');
    // const ctx = canvas.getContext('2d');
    let appleX = intRandom(0, 1370);
    let appleY = intRandom(0,625);
    control.fillStyle = 'yellow';
    control.fillRect(appleX, appleY, appleSize, appleSize);
}

function intRandom(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
