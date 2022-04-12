const calculatePath = (fishes) => {
  const changeToMoveForward = 0.62;

  const path = {
    fish1: [],
    fish2: [],
    fish3: [],
    fish4: [],
  };

  let whoIsTheWinner = "";

  while (!whoIsTheWinner) {
    fishes.forEach((fishElement) => {
      let movement = Math.random() > 0.5 ? 1 : 0;

      if (Math.random() > changeToMoveForward) {
        movement *= -1;
      }

      path[fishElement.id].push(movement);

      let sum = path[fishElement.id].reduce(function (a, b) {
        return a + b;
      }, 0);

      if (sum === 85) {
        whoIsTheWinner = fishElement.id;
      }
    });
  }

  const amountOfSteps = path["fish1"].length - 1;

  return {
    path,
    whoIsTheWinner,
    amountOfSteps,
  };
};

const core = () => {
  const fishIds = ["fish1", "fish2", "fish3", "fish4"];

  const fish1 = document.getElementById("fish1");
  const fish2 = document.getElementById("fish2");
  const fish3 = document.getElementById("fish3");
  const fish4 = document.getElementById("fish4");

  const fishes = [fish1, fish2, fish3, fish4];

  const time = 15;

  let fishAnimationFrame;

  let winner;

  let amountOfTimesRafRan = 0;

  const { path, whoIsTheWinner, amountOfSteps } = calculatePath(fishes);

  const positions = {
    fish1: 0,
    fish2: 0,
    fish3: 0,
    fish4: 0,
  };

  let pathIndex = 0;

  const createFishMovement = () => {
    let startTime;

    const move = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      let elapsed = timestamp - startTime;

      if (elapsed >= time) {
        fishes.forEach((fishElement) => {
          positions[fishElement.id] += path[fishElement.id][pathIndex];
          fishElement.style.left = `${positions[fishElement.id]}%`;

          if (amountOfSteps === pathIndex) {
            winner = whoIsTheWinner;

            const id = "crown-" + winner;
            document.getElementById(id).style.display = "inline-block";

            gsap.to(`#${id}`, {
              ease: "power1.out",
              opacity: 1,
              duration: 2,
            });

            document.getElementById("restart").style.visibility = "visible";
            gsap.to("#restart", {
              delay: 3,
              ease: "power4.out",
              opacity: 1,
              duration: 3,
            });

            cancelAnimationFrame(fishAnimationFrame);
          }
        });
        startTime = timestamp;
        pathIndex += 1;
      }
      if (!winner) {
        fishAnimationFrame = requestAnimationFrame(move);
      }
    };

    requestAnimationFrame(move);
  };

  const startRace = () => {
    createFishMovement();
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
    let elapseTime = 2000;
    const countDown = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed >= elapseTime && fishIntroStep < 5) {
        switch (fishIntroStep) {
          case 1:
            introductionTimeline("#fish1", "3%", "slow(0.7, 0.7, false)");
            elapseTime = 4200;
            break;
          case 2:
            introductionTimeline("#fish2", "29%", "expo.out");
            break;
          case 3:
            introductionTimeline("#fish3", "54%", "back.inOut(1)");
            break;
          case 4:
            introductionTimeline("#fish4", "78%", "sine.out");
            elapseTime = 4200 + 1000;
            break;
        }
        fishIntroStep = fishIntroStep + 1;
        startTime = undefined;
      } else if (elapsed >= elapseTime && fishIntroStep === 5) {
        switch (countDownStep) {
          case 0:
            counterElement3.style.display = "block";
            elapseTime = 1000;
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
            document.getElementById("count-container").remove();
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

  const introductionTimeline = (fishId, topValue, ease) => {
    gsap
      .timeline()
      .to(fishId, {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      })
      .to(fishId, {
        top: topValue,
        transform: "translate(-50%, 0%)",
        ease: "power2.out",
        duration: 1,
      })
      .to(fishId, {
        left: "0%",
        transform: "translate(0%, 0%)",
        ease: ease,
        duration: 2,
      });
  };

  document.getElementById("restart").addEventListener("click", () => {
    gsap.to("#restart", {
      opacity: 0,
      ease: "power2.in",
      duration: 0.3,
    });
    fishIds.forEach((fishId) => {
      gsap.to(`#${fishId}`, { left: "0%", duration: 3, ease: "none" });
    });

    gsap.to(`#crown-${winner}`, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
    });
    setTimeout(() => {
      document.getElementById("restart").style.visibility = "hidden";
      document.getElementById("restart").style.opacity = 0;

      document.getElementById(`crown-${winner}`).style.opacity = 1;
      document.getElementById(`crown-${winner}`).style.display = "none";
    }, 300);

    setTimeout(() => {
      restart();
    }, 4000);
  });

  const restart = () => {
    fishIds.forEach((fishId) => {
      positions[fishId] = 0;
    });

    winner = "";

    startRace();
  };
};
