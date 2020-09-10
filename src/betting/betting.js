let totalAmount = 10;

const countAmount = document.getElementById("count-amount");

countAmount.innerHTML = totalAmount;

const betFunction = (fishBet) => {
    if (totalAmount > 0) {
        const newBet = Number(fishBet.innerHTML) + 1;
        fishBet.innerHTML = newBet;

        totalAmount -= 1;
        countAmount.innerHTML = totalAmount;
    }
};

const betFunctionFish1 = () => betFunction(document.getElementById("fish1-bet"));
const betFunctionFish2 = () => betFunction(document.getElementById("fish2-bet"));
const betFunctionFish3 = () => betFunction(document.getElementById("fish3-bet"));
const betFunctionFish4 = () => betFunction(document.getElementById("fish4-bet"));

fish1.addEventListener('click', betFunctionFish1);
fish2.addEventListener('click', betFunctionFish2);
fish3.addEventListener('click', betFunctionFish3);
fish4.addEventListener('click', betFunctionFish4);

setInterval(() => {
    if (winner) {
        fish1.removeEventListener(betFunctionFish1);
        fish2.removeEventListener(betFunctionFish2);
        fish3.removeEventListener(betFunctionFish3);
        fish4.removeEventListener(betFunctionFish4);
    }
}, time);
