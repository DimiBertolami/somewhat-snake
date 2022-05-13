
const player = document.getElementById("ReadyPlayerOne");
let x = 300;
let y= 300;
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
        x= x+10;
    }
    if(direction === 'ArrowLeft'){
        x=x-10;
    }
    if(direction === 'ArrowDown'){
        y= y+10;
    }
    if(direction === 'ArrowUp'){
        y=y-10;
    }
    movePlayer(x, y);
    setTimeout(main, 50);
}

main();

function movePlayer(x, y){
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
    if(x>=1336){
        x=1336
        direction = "";
    }
    if(y>=588){
        y=588
        direction = "";
    }
    moveXY.style.left = x + "px";
    moveXY.style.top  = y + "px";
}
