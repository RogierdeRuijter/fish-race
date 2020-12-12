// Set inside the screen-size-listener
let finishLine;

const core = () => {
    const fish1 = document.getElementById("fish1");
    const fish2 = document.getElementById("fish2");
    const fish3 = document.getElementById("fish3");
    const fish4 = document.getElementById("fish4");

    const water = document.getElementById("water");
    const finish = document.getElementById("finish");

    const widthFish = fish1.offsetWidth;

    const startWater = 0;

    const time = 20;
    const changeToMoveForward = 55;
    const maxAmountOfForwardMovement = 10;

    let winner;

    const createFishMovement = (fishElement) => {
        var position = startWater;

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
            });

        }, time);
    }
    let movingFish1;
    let movingFish2;
    let movingFish3;
    let movingFish4;

    const startRace = () => {
        movingFish1 = createFishMovement(fish1);
        movingFish2 = createFishMovement(fish2);
        movingFish3 = createFishMovement(fish3);
        movingFish4 = createFishMovement(fish4);
    }

    // Countdown at visit of the webpage
    var count = 6;
    const counterElement1 = document.getElementById('count-element1');
    const counterElement2 = document.getElementById('count-element2');
    const counterElement3 = document.getElementById('count-element3');
    const counterGo = document.getElementById('count-go');

    const start = () => {
        setInterval(() => {
            if ( count == 5 ) {
                counterElement3.style.display = 'block';
            } else if ( count == 4 ) {
                counterElement3.style.display = 'none';
                counterElement2.style.display = 'block';
            } else if ( count == 3 ) {
                counterElement2.style.display = 'none';
                counterElement1.style.display = 'block';
            } else if ( count == 2 ) {
                counterElement1.style.display = 'none';
                counterGo.style.display = 'block';
            } else if ( count == 1 ) {
                counterGo.style.display = "none"
                startRace()
            }
            count-=1;
        }, 1000);
    }

    start();

    setInterval(() => {
        if (winner) {
            clearInterval(movingFish1);
            clearInterval(movingFish2);
            clearInterval(movingFish3);
            clearInterval(movingFish4);  
        }
    }, time);   
}
