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
    // for (let i = 0; i < 4; i++) {
    fishes.forEach((fishElement) => {
      let movement = Math.random() > 0.5 ? 1 : 0;

      if (Math.random() > changeToMoveForward) {
        movement *= -1;
      }
      // path[fishElement.id].push({ left: movement });

      const fishPath = path[fishElement.id];
      let sum = fishPath[fishPath.length - 1]?.left ?? 0;
      sum = sum + movement;

      path[fishElement.id].push({ left: sum });

      if (sum === 85) {
        whoIsTheWinner = fishElement.id;
      }
    });
  }

  let pathInPercentage = { fish1: [], fish2: [], fish3: [], fish4: [] };

  fishes.forEach((fishElement) => {
    pathInPercentage[fishElement.id] = path[fishElement.id].map((item) => ({
      left: `${item.left}%`,
    }));
  });

  return {
    pathInPercentage,
    whoIsTheWinner,
  };
};

const core = () => {
  const fish1 = document.getElementById("fish1");
  const fish2 = document.getElementById("fish2");
  const fish3 = document.getElementById("fish3");
  const fish4 = document.getElementById("fish4");

  const restartButton = document.getElementById("restart");

  const fishes = [fish1, fish2, fish3, fish4];

  let { pathInPercentage, whoIsTheWinner } = calculatePath(fishes);

  const endGame = (el) => {
    if (el.srcElement.effect.target.id === whoIsTheWinner) {
      const winner = whoIsTheWinner;
      const id = "crown-" + winner;
      document.getElementById(id).style.display = "inline-block";
      document.getElementById(id).animate([{ opacity: 1 }], {
        delay: 250,
        duration: 1000,
        fill: "forwards",
      });

      restartButton.style.visibility = "visible";
      restartButton.animate([{ opacity: 1 }], {
        delay: 2000,
        duration: 2000,
        fill: "forwards",
        easing: "ease-out",
      });
    }
  };

  const createFishMovement = () => {
    fishes.forEach((fishElement) => {
      const animation = fishElement.animate(pathInPercentage[fishElement.id], {
        duration: 12500,
        fill: "forwards",
      });
      animation.onfinish = endGame;
    });
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

  restartButton.addEventListener("click", () => {
    const crownElement = document.getElementById(`crown-${whoIsTheWinner}`);
    const animation = restartButton.animate([{ opacity: 0 }], {
      duration: 300,
      easing: "ease-in",
      fill: "forwards",
    });

    animation.onfinish = () => {
      restartButton.style.visibility = "hidden";
      crownElement.style.opacity = 1;
      crownElement.style.display = "none";
    };

    fishes.forEach((fishElement) => {
      fishElement.animate([{ left: "0%" }], {
        duration: 3000,
        fill: "forwards",
      });
    });

    crownElement.animate([{ opacity: 0 }], {
      duration: 500,
      easing: "ease-in",
      fill: "forwards",
    });

    setTimeout(() => {
      restart();
    }, 4000);

    const newPath = calculatePath(fishes);
    pathInPercentage = newPath.pathInPercentage;
    whoIsTheWinner = newPath.whoIsTheWinner;
  });

  const restart = () => {
    startRace();
  };
};
