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
    setTimeout(() => {
      introductionTimeline(fish1, "3%", "ease");
    }, 2000);

    setTimeout(() => {
      introductionTimeline(fish2, "29%", "ease-out");
    }, 2000 + 3200);

    setTimeout(() => {
      introductionTimeline(fish3, "54%", "ease-in-out");
    }, 2000 + 3200 * 2);

    setTimeout(() => {
      introductionTimeline(fish4, "78%", "linear");
    }, 2000 + 3200 * 3);

    setTimeout(() => {
      counterElement3.style.display = "block";
    }, 2000 + 3200 * 4 + 1000);

    setTimeout(() => {
      counterElement3.style.display = "none";
      counterElement2.style.display = "block";
    }, 2000 + 3200 * 4 + 1000 * 2);

    setTimeout(() => {
      counterElement2.style.display = "none";
      counterElement1.style.display = "block";
    }, 2000 + 3200 * 4 + 1000 * 3);

    setTimeout(() => {
      counterElement1.style.display = "none";
      counterGo.style.display = "block";
    }, 2000 + 3200 * 4 + 1000 * 4);

    setTimeout(() => {
      counterGo.style.display = "none";
      document.getElementById("count-container").remove();
      startRace();
    }, 2000 + 3200 * 4 + 1000 * 5);
  };

  start();

  const introductionTimeline = (fishId, topValue, ease) => {
    fishId.animate([{ opacity: 1 }], {
      duration: 1000,
      fill: "forwards",
    });

    fishId.animate([{ top: topValue, transform: "translate(-50%, 0%)" }], {
      duration: 1000,
      delay: 1000,
      fill: "forwards",
    });

    fishId.animate([{ left: "0%", transform: "translate(0%, 0%)" }], {
      duration: 2000,
      delay: 2000,
      easing: ease,
      fill: "forwards",
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
