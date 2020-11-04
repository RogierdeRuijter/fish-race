

const finishLineWidth = 25;

var contentContainer = document.getElementById("content-container");

var fish1 = document.getElementById("fish1");
var fish2 = document.getElementById("fish2");
var fish3 = document.getElementById("fish3");
var fish4 = document.getElementById("fish4");

var water = document.getElementById("water");
var finish = document.getElementById("finish");

const widthContentContainer = 825;
const heightContentContainer = 645;

const resizeContentContainer = () => {
    const screenWidth = Math.min(window.innerWidth, window.outerWidth);
    const screenHeight = Math.min(window.innerHeight, window.outerHeight);

    if (screenWidth < widthContentContainer) {
    scale = Math.min(
        screenWidth / widthContentContainer,    
        screenHeight / heightContentContainer
    ) * 0.8;

    contentContainer.style.transform = "translate(0%, -" + 10/scale + "%) " + "scale(" + scale + ")";
    } else {
    contentContainer.style.transform = null;
    }
}

resizeContentContainer();

const widthFish = fish1.offsetWidth;

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
var finishLine = 0;

const calculateFinishLinePosition = () => {
    finishLine = getOffset(document.getElementById("finish")).left + finishLineWidth + 5;
}

window.addEventListener('resize', () => {
    resizeContentContainer();
    calculateFinishLinePosition();
}, true);

calculateFinishLinePosition();

const startWater = 0;

var winner;

const time = 20;
const changeToMoveForward = 55;
const maxAmountOfForwardMovement = 10;
const animateThreshold = 30;

const createFishMovement = (fishElement) => {
    var position = startWater;
    let animate = 0;
    let currentRotation = 5;

     return setInterval(() => {
        requestAnimationFrame(() => {
            let number = Math.floor(Math.random() * 100);
            const movement = Math.floor(Math.random() * maxAmountOfForwardMovement);
        
            if (number < changeToMoveForward) {
                position += movement;
            } else {
                position -= movement;
            }

            var nose = getOffset(fishElement).left + widthFish;  

            if (nose > finishLine) {
                winner = fishElement.id;

                const id = 'crown-' + winner;

                const winnerElement = document.getElementById(id);
                
                winnerElement.style.display = 'inline-block';
            }
            fishElement.style.left = position.toString() + 'px';
            if (animate >= animateThreshold) {
                currentRotation *= -1;
                fishElement.style.transform = 'rotate(' + currentRotation + 'deg)';
                animate = 0;
            }
            animate += 1;
        });

    }, time);
}

const startElement = document.getElementById('start-button')

const startHover = () => startElement.src = "./assets/startbutton/start_button_hover.png"

const stopHover = () => startElement.src ="./assets/startbutton/start_button_null.png"

startElement.addEventListener("mouseenter", startHover, false)
startElement.addEventListener("mouseleave", stopHover, false)

let movingFish1;
let movingFish2;
let movingFish3;
let movingFish4;

const clickStart = () => {
    startElement.style.display = "none"
    movingFish1 = createFishMovement(fish1);
    movingFish2 = createFishMovement(fish2);
    movingFish3 = createFishMovement(fish3);
    movingFish4 = createFishMovement(fish4);
}

startElement.addEventListener("click", clickStart, false)

// Countdown at visit of the webpage
var count = 8;
const counterElement = document.getElementById('counter')

// choosemsg
const msgElement = document.getElementById('choosemsg')

setInterval(() => {
    if ( count == 9 ) {
        
    } else if ( count == 8 ) {
        msgElement.style.display="block"
    } else if ( count == 7 ) {
        msgElement.style.display="none"
    } else if ( count == 6 ) {
        msgElement.style.display="block"
    } else if ( count == 5 ) {
        counterElement.src="./assets/countfish/fish3.png"
    } else if ( count == 4 ) {
        counterElement.src="./assets/countfish/fish2.png"
    } else if ( count == 3 ) {
        counterElement.src="./assets/countfish/fish1.png"
    } else if ( count == 2 ) {
        counterElement.src="./assets/countfish/fish0.png"
    } else if ( count == 1 ) {
        counterElement.style.display="none"
        clickStart()
    }
    count-=1;
}, 1000)

setInterval(() => {
    if (winner) {
        clearInterval(movingFish1);
        clearInterval(movingFish2);
        clearInterval(movingFish3);
        clearInterval(movingFish4);  
    }
}, time);
