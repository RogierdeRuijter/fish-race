const core = () => {
  const fish1 = document.getElementById("fish1");
  const fish2 = document.getElementById("fish2");
  const fish3 = document.getElementById("fish3");
  const fish4 = document.getElementById("fish4");

  const startWater = 0;

  const time = 17;
  const changeToMoveForward = 62;
  const maxAmountOfForwardMovement = 2;

  let fishAnimationFrames = {
    fish1: undefined,
    fish2: undefined,
    fish3: undefined,
    fish4: undefined,
  };

  let winner;

  const createFishMovement = (fishElement) => {
    var position = startWater;

    let startTime;

    const move = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      if (elapsed >= time) {
        const movement = Math.floor(Math.random() * maxAmountOfForwardMovement);

        if (Math.floor(Math.random() * 100) < changeToMoveForward) {
          position += movement;
        } else {
          position -= movement;
        }

        if (fishElement.style.left === "85%") {
          winner = fishElement.id;

          const id = "crown-" + winner;

          document.getElementById(id).style.display = "inline-block";
        }
        fishElement.style.left = position.toString() + "%";

        startTime = timestamp;
      }

      fishAnimationFrames[fishElement.id] = requestAnimationFrame(move);
    };

    requestAnimationFrame(move);
  };

  const startRace = () => {
    createFishMovement(fish1);
    createFishMovement(fish2);
    createFishMovement(fish3);
    createFishMovement(fish4);
  };

  // Countdown at visit of the webpage
  const counterElement1 = document.getElementById("count-element1");
  const counterElement2 = document.getElementById("count-element2");
  const counterElement3 = document.getElementById("count-element3");
  const counterGo = document.getElementById("count-go");

  const start = () => {
    let countDownAnimationFrame;
    let startTime;

    /* starts at 0 for the user to look at the water and finish line and grasp what it is */
    let fishIntroStep = 0;

    let countDownStep = 0;

    const countDown = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed >= 1500 && fishIntroStep < 5) {
        switch (fishIntroStep) {
          case 1:
            fish1.style.opacity = 1;
            break;
          case 2:
            fish2.style.opacity = 1;
            break;
          case 3:
            fish3.style.opacity = 1;
            break;
          case 4:
            fish4.style.opacity = 1;
            break;
        }
        fishIntroStep = fishIntroStep + 1;
        startTime = undefined;
      } else if (elapsed >= 1000 && fishIntroStep === 5) {
        switch (countDownStep) {
          case 0:
            counterElement3.style.display = "block";
            break;
          case 1:
            counterElement3.style.display = "none";
            counterElement2.style.display = "block";
            break;
          case 2:
            counterElement2.style.display = "none";
            counterElement1.style.display = "block";
            break;
          case 3:
            counterElement1.style.display = "none";
            counterGo.style.display = "block";
            break;
          case 4:
            counterGo.style.display = "none";
            startRace();
            break;
        }
        countDownStep = countDownStep + 1;
        startTime = undefined;
      }

      countDownAnimationFrame = requestAnimationFrame(countDown);

      if (fishIntroStep === 5 && countDownStep === 5) {
        cancelAnimationFrame(countDownAnimationFrame);
      }
    };

    requestAnimationFrame(countDown);
  };

  start();

  const winnerInterval = setInterval(() => {
    if (winner) {
      cancelAnimationFrame(fishAnimationFrames["fish1"]);
      cancelAnimationFrame(fishAnimationFrames["fish2"]);
      cancelAnimationFrame(fishAnimationFrames["fish3"]);
      cancelAnimationFrame(fishAnimationFrames["fish4"]);
      clearInterval(winnerInterval);
    }
  }, time);
};
