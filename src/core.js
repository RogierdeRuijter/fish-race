const getTopValue = (fishId) => {
  if (fishId === "fish1") {
    return "28%";
  } else if (fishId === "fish2") {
    return "215%";
  } else if (fishId === "fish3") {
    return "320%";
  } else if (fishId === "fish4") {
    return "460%";
  }
};

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
      let movement = Math.random() > 0.5 ? 6 : 0;

      if (Math.random() > changeToMoveForward) {
        movement *= -1;
      }

      const fishPath = path[fishElement.id];
      let sum = fishPath[fishPath.length - 1]?.left ?? 0;
      sum = sum + movement;

      path[fishElement.id].push({ left: sum });

      if (sum === 420) {
        whoIsTheWinner = fishElement.id;
      }
    });
  }

  let pathInPercentage = { fish1: [], fish2: [], fish3: [], fish4: [] };

  fishes.forEach((fishElement) => {
    const top = getTopValue(fishElement.id);
    pathInPercentage[fishElement.id] = path[fishElement.id].map((item) => ({
      transform: `translateX(${item.left}%) translateY(${top})`,
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
    const duration = Math.floor(Math.random() * (14500 - 9000 + 1) + 9000);

    fishes.forEach((fishElement) => {
      const animateFish = () => {
        const animation = fishElement.animate(
          pathInPercentage[fishElement.id],
          {
            duration,
            fill: "forwards",
          }
        );
        animation.onfinish = endGame;
      };
      if ("requestIdleCallback" in window) {
        requestIdleCallback(animateFish);
      } else {
        requestAnimationFrame(animateFish);
      }
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
    // TODO: use the onfinish method to detmine thwne it is done
    setTimeout(() => {
      introductionTimeline(fish1, "ease");
    }, 2000);

    setTimeout(() => {
      introductionTimeline(fish2, "ease-out");
    }, 2000 + 3200);

    setTimeout(() => {
      introductionTimeline(fish3, "linear");
    }, 2000 + 3200 * 2);

    setTimeout(() => {
      introductionTimeline(fish4, "ease-in-out");
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

  requestAnimationFrame(start);

  const introductionTimeline = (fish, ease) => {
    fish.animate([{ opacity: 1 }], {
      duration: 1000,
      fill: "forwards",
    });

    fish.animate(
      [{ transform: `translateX(0) translateY(${getTopValue(fish.id)})` }],
      {
        duration: 2000,
        delay: 1500,
        easing: ease,
        fill: "forwards",
      }
    );
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
      const top = getTopValue(fishElement.id);
      fishElement.animate([{ transform: `translateX(0) translateY(${top})` }], {
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
