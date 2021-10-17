const core = () => {
  const fish1 = document.getElementById("fish1");
  const fish2 = document.getElementById("fish2");
  const fish3 = document.getElementById("fish3");
  const fish4 = document.getElementById("fish4");

  const startWater = 0;

  const time = 20;
  const changeToMoveForward = 55;
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

      fishAnimationFrames[fish1.id] = requestAnimationFrame(move);
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
  var count = 6;
  const counterElement1 = document.getElementById("count-element1");
  const counterElement2 = document.getElementById("count-element2");
  const counterElement3 = document.getElementById("count-element3");
  const counterGo = document.getElementById("count-go");

  const start = () => {
    setInterval(() => {
      if (count == 5) {
        counterElement3.style.display = "block";
      } else if (count == 4) {
        counterElement3.style.display = "none";
        counterElement2.style.display = "block";
      } else if (count == 3) {
        counterElement2.style.display = "none";
        counterElement1.style.display = "block";
      } else if (count == 2) {
        counterElement1.style.display = "none";
        counterGo.style.display = "block";
      } else if (count == 1) {
        counterGo.style.display = "none";
        startRace();
      }
      count -= 1;
    }, 1000);
  };

  start();

  setInterval(() => {
    if (winner) {
      cancelAnimationFrame(fishAnimationFrames['fish1']);
      cancelAnimationFrame(fishAnimationFrames['fish2']);
      cancelAnimationFrame(fishAnimationFrames['fish3']);
      cancelAnimationFrame(fishAnimationFrames['fish4']);
    }
  }, time);
};
