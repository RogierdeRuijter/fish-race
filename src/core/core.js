const time = 20;
const changeToMoveForward = 55;
const maxAmountOfForwardMovement = 10;
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

const createFishMovement = (element, obj) => {
    var position = startWater;

    const move = () => {
        let number = Math.floor(Math.random() * 100);
        const movement = Math.floor(Math.random() * maxAmountOfForwardMovement);
    
        if (number < changeToMoveForward) {
            position += movement;
        } else {
            position -= movement;
        }

        var nose = getOffset( element ).left + widthFish;  
        
        if (nose > finishLine) {
            winner = element.id;

            const winnerElement = document.getElementById(winner);
            winnerElement.src = './assets/' + winner + '/winner.png';
        }

        element.style.left = position.toString() + 'px';
        obj.id = requestAnimationFrame(move);
        };
        requestAnimationFrame(move);
    }

let movingFish1 = {id: null};
let movingFish2 = {id: null};
let movingFish3 = {id: null};
let movingFish4 = {id: null};

const startElement = document.getElementById('start-button')

const startHover = () => startElement.src ="./assets/startbutton/start_button_hover.png"

const stopHover = () => startElement.src ="./assets/startbutton/start_button_null.png"

startElement.addEventListener("mouseenter", startHover, false)
startElement.addEventListener("mouseleave", stopHover, false)

const clickStart = () => {
    startElement.style.display = "none"
    createFishMovement(fish1, movingFish1);
    createFishMovement(fish2, movingFish2);
    createFishMovement(fish3, movingFish3);
    createFishMovement(fish4, movingFish4);
}

startElement.addEventListener("click", clickStart, false)

// Countdown at visit of the webpage
var count = 5;

setInterval(() => {
    if ( count == 5 ) {
        
    } else if ( count == 4 ){

    } else if ( count == 3 ){

    } else if ( count == 2 ){

    } else if ( count == 1 ){
        clickStart()
    }
    count-=1;    
}, 1000)

setInterval(() => {
    if (winner) {
        cancelAnimationFrame(movingFish1.id);
        cancelAnimationFrame(movingFish2.id);
        cancelAnimationFrame(movingFish3.id);
        cancelAnimationFrame(movingFish4.id);  
    }
}, time);
