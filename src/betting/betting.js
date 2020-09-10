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

// setInterval(() => {
//     if (winner) {
//         fish1.removeEventListener(func);
//         fish2.removeEventListener(func);
//         fish3.removeEventListener(func);
//         fish4.removeEventListener(func);
//     }
// }, time);
