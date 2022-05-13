// let canvas = document.getElementById('canvas');
// let context = canvas.getContext("2d");
// let r = canvas.parentElement.getBoundingClientRect();
// canvas.width = r.width;
// canvas.height = r.height;
//
// context.fillStyle = "red";
// context.fillRect(0, 0, canvas.width, canvas.height);
/*----GetWindowSizeNoScrollBarrs--START-------*/
//Get inner width and height of current window
// var viewportWidth = document.documentElement.clientWidth;
// var viewportHeight = document.documentElement.clientHeight;
var viewportWidth = 635;
var viewportHeight = 1385;
//Update values if window is resized
window.addEventListener('resize',()=>{
    viewportWidth = document.documentElement.clientWidth;
    viewportHeight = document.documentElement.clientHeight;
})
/*----GetWindowSizeNoScrollBarrs--FINISH-------*/
const player = document.getElementById("ReadyPlayerOne");
let x = viewportHeight/2;
let y= viewportWidth/2;
let IncreaseValue = 10;
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
