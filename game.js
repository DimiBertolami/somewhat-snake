const control = document.getElementById('canvas').getContext('2d');
const ReadyPlayerOne = document.getElementById('ReadyPlayerOne');
const ghost1 = document.getElementById('ghost1');
const ghost2 = document.getElementById('ghost2');
const ghost3 = document.getElementById('ghost3');
const ghost4 = document.getElementById('ghost4');
const canvasEl = document.getElementsByTagName('canvas')[0];
const script = document.getElementsByTagName('script')[0];
count = 0;

// refreshrate in milliseconds
const timeoutValue = 50;
const ghostTimeout = 5000;
const IncreaseValue = 10;
const appleSize = 20;
const initialApples = 5;
let arrAppleBoundaries = [];
let arrApplesEaten = [];
let arrGhostText = [];
let arrGhosts = []
arrGhosts.push(ghost1, ghost2, ghost3, ghost4);
arrGhostText.push("ghost1", "ghost2", "ghost3", "ghost4");
let direction;
const randomX = intRandom(20, 1200);
const randomY = intRandom(20, 500);
viewportHeight = document.documentElement.clientHeight;
viewportWidth = document.documentElement.clientWidth;
// const viewportWidth = 1385;
// const viewportHeight = 635;
let x = viewportWidth / 2;
let y = viewportHeight / 2;
maxViewportHeight = viewportWidth - appleSize - IncreaseValue;
maxViewportWidth = viewportHeight - appleSize - IncreaseValue;
canvasEl.width = viewportWidth - appleSize;
canvasEl.height = viewportHeight - appleSize;
ReadyPlayerOne.appendChild(document.createTextNode(`0`));
ghost1.appendChild(document.createTextNode(`GET OVER HERE`));
ghost2.appendChild(document.createTextNode(`IMA GONNA CATCH YOUOUOUOU`));
ghost3.appendChild(document.createTextNode(`WHERE YOU GOIN?`));
ghost4.appendChild(document.createTextNode(`I'M NOT GONNA HURT YOU`));
// this code generates the random apples
for (let i = 0; i < initialApples; i++) {
    arrAppleBoundaries.push(generateApple());
}


main();

function randomGhostStuff(action= 'speed'){
    switch (action){
        case 'speed':
            //ghost speed is variable now!
            ghost1.style.transition = `${intRandom(1,4)}s linear`;
            ghost2.style.transition = `${intRandom(1,4)}s linear`;
            ghost3.style.transition = `${intRandom(1,4)}s linear`;
            ghost4.style.transition = `${intRandom(1,4)}s linear`;
            break;
        case 'shout':
            //ghosts should talk when chasing you..
            ghost1.removeChild(ghost1.childNodes[0]);
            ghost2.removeChild(ghost2.childNodes[0]);
            ghost3.removeChild(ghost3.childNodes[0]);
            ghost4.removeChild(ghost4.childNodes[0]);
            ghost1.appendChild(document.createTextNode(`IMA ALFA GHOST!`));
            ghost2.appendChild(document.createTextNode(`IMA GONNA CATCH YOUOUOUOU`));
            ghost3.appendChild(document.createTextNode(`STOP RUNNING`));
            ghost4.appendChild(document.createTextNode(`BOEOEOEOE`));
            break;
    }
    console.log(`random ${action} configured`);
}
//Variable Ghost Speed returns promise after 2 seconds
const first_function = function() {
    console.log("Entered first function," + "Variable Ghost Speed");
    return new Promise(resolve => {
        setTimeout(function() {
            resolve("\t\t This is first promise");
            randomGhostStuff(); //action = 'speed'
            console.log("Returned first promise from variable ghost speed function");
        }, 2000);
    });
};
//Variable Ghost Shouts returns promise after 4 seconds
const second_function = function() {
    console.log("Entered second function," + "Variable Ghost Shouts!");
    return new Promise(resolve => {
        setTimeout(function() {
            resolve("\t\t This is second promise");
            randomGhostStuff('shout');
            console.log("Returned second promise from variable ghost shout function");
        }, 4000);
    });
};
async function async_GhostStuff() {
    console.log('async Ghost settings executed');

    const first_promise= await first_function();
    console.log("After awaiting for 2 seconds," +
        "the promise returned from ghost speed function is:");
    console.log(first_promise);

    const second_promise= await second_function();
    console.log("After awaiting for 4 seconds, the" +
        "promise returned from ghost shout function is:");
    console.log(second_promise);
}
function moveGhosts(x, y) {
    x = intRandom(20, 1500) + 'px';
    y = intRandom(20, 500) + 'px';
    for (let i = 0; i < arrGhosts.length; i++) {
        if (updateCount(arrGhosts[i])) {
            control.beginPath();
            console.log(ReadyPlayerOne.childNodes[0]);
            if (ReadyPlayerOne.childNodes[0].textContent === '0') {
                ReadyPlayerOne.remove();
                alert(`GAME OVER`);
            } else {
                ReadyPlayerOne.style.left = x + 'px';
                ReadyPlayerOne.style.top = y + 'px';
                direction = '';
                arrGhosts[i].remove();
                generate(`${arrGhostText[i]}`);
            }
        }
    }
}
function generate(ghost = ''){
    let ghostEl = document.createElement('div');
    ghostEl.className = 'box';
    ghostEl.id = ghost;
    ghostEl.style.top = intRandom(20, 560)+'px';
    ghostEl.style.left = intRandom(20, 1200)+'px';
    ReadyPlayerOne.parentNode.insertBefore(document.body.appendChild(ghostEl), ReadyPlayerOne.nextSibling)
}
function getBounds(obj, bShow = true) {
    let PlayerBoundaries = ReadyPlayerOne.getBoundingClientRect();
    let ghostBoundaries = obj.getBoundingClientRect();
    let objX = document.getElementById(obj.id);
    playerLeft = PlayerBoundaries.left + 'px';
    playerTop = PlayerBoundaries.top + 'px';
    playerRight = PlayerBoundaries.left + PlayerBoundaries.width + 'px';
    playerBottom = PlayerBoundaries.top + PlayerBoundaries.height + 'px';
    ghostLeft = ghostBoundaries.left + 'px';
    ghostRight = ghostBoundaries.left + 30 + 'px';
    ghostTop = ghostBoundaries.top + 'px';
    ghostBottom = ghostBoundaries.top + 30 + 'px';
    if (ghostLeft >= playerLeft && ghostRight <= playerRight && ghostTop >= playerTop && ghostBottom <= playerBottom) {
        return `you're caught`;
    } else {
        // requestAnimationFrame(main);
        obj.style.top = PlayerBoundaries.top + 'px';
        obj.style.left = PlayerBoundaries.left + 'px';
        if (bShow === true) {
            return `${obj.id} location (${obj.style.top},${obj.style.left})`
        } else {
            return `${obj.id} is moving closer to you`;
        }
    }
}
function updateCount(ghost) {
    if (getBounds(ghost) === `you're caught`) {
        ReadyPlayerOne.removeChild(ReadyPlayerOne.childNodes[0]);
        ReadyPlayerOne.appendChild(document.createTextNode(--count));
        console.log(`${ghost.id} stole an apple!`);
        return true;
    } else {
        return false;
    }
}
function main() {
    // requestAnimationFrame(main);
    if (direction === 'ArrowRight') {
        x += IncreaseValue
    }
    if (direction === 'ArrowLeft') {
        x -= IncreaseValue
    }
    if (direction === 'ArrowDown') {
        y += IncreaseValue
    }
    if (direction === 'ArrowUp') {
        y -= IncreaseValue
    }
    movePlayer(x, y);
    moveGhosts(x, y);
    async_GhostStuff();
    setTimeout(main, timeoutValue);
}
function movePlayer(x, y) {
    getBounds(ReadyPlayerOne, false);

    if (x <= 7) {
        x = 7;
        direction = "";
    }
    if (y <= 7) {
        y = 7;
        direction = "";
    }
    if (x >= maxViewportHeight - 5) {
        x = maxViewportHeight - 5;
        direction = "";
    }
    if (y >= maxViewportWidth - 5) {
        y = maxViewportWidth - 5;
        direction = "";
    }
    // all the apples gone? here's some more
    if (arrAppleBoundaries.length < 1) {
        for (let i = 0; i < initialApples; i++) {
            arrAppleBoundaries.push(generateApple());
        }
    }
    // when snake eats apple, it removes the apple from the array, and it updates the player counter
    for (let i = 0; i < arrAppleBoundaries.length; i++) {
        if (x >= arrAppleBoundaries[i][0] && x <= arrAppleBoundaries[i][2]) {
            if (y >= arrAppleBoundaries[i][1] && y <= arrAppleBoundaries[i][3]) {
                control.beginPath();
                arrApplesEaten.push(arrAppleBoundaries[i]);
                control.clearRect(arrAppleBoundaries[i][0], arrAppleBoundaries[i][1], appleSize + 6, appleSize + 6);
                arrAppleBoundaries.splice(i, 1);

                ReadyPlayerOne.removeChild(ReadyPlayerOne.childNodes[0]);
                ReadyPlayerOne.appendChild(document.createTextNode(`${++count}`));

            }
        }
    }

    ReadyPlayerOne.style.top = y + "px";
    ReadyPlayerOne.style.left = x + "px";

}
function generateApple() {
    let r = appleSize / 2;
    let appleX = intRandom(70, 1250);
    let appleY = intRandom(70, 550);
    console.log(`apple (${appleX},${appleY})`);
    control.fillStyle = 'green';
    control.beginPath();
    // circle (x, y, startAngle = 0, endAngle, boolCounterClockWise)
    control.arc(appleX, appleY, r, 0, 2 * Math.PI, false);
    control.fill();
    control.lineWidth = 3;
    control.strokeStyle = 'yellow';
    control.stroke();
    control.fillStyle = "green";
    control.globalAlpha = 0.1;
    let appleRectX1 = appleX - r - 3;
    let appleRectY1 = appleY - r - 3;
    let appleRectX2 = parseInt(appleRectX1) + appleSize + 6;
    let appleRectY2 = parseInt(appleRectY1) + appleSize + 6;
    control.beginPath();
    control.fillRect(appleRectX1 + 3, appleRectY1 + 3, appleSize, appleSize);
    // reset opacity for further drawing..
    control.globalAlpha = 1;
    return [appleRectX1, appleRectY1, appleRectX2, appleRectY2];
}
function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
window.addEventListener('resize', () => {
    viewportWidth = document.documentElement.clientWidth - appleSize - appleSize;
    // viewportWidth = viewportWidth-appleSize;
    viewportHeight = document.documentElement.clientHeight - appleSize - appleSize;
    // viewportHeight = viewportHeight-appleSize;
})
document.body.addEventListener("keydown", function (e) {
    direction = e.key;
    if(!direction==='ArrowRight' || !direction==='ArrowLeft' || !direction==='ArrowUp'|| !direction==='ArrowDown'){
        console.log(direction);
    }
})
// document.body.addEventListener("keyup", (e)=>{
//     direction = e.key;
// })
