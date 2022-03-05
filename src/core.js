const core = () => {
  const fish1 = document.getElementById("fish1");
  const fish2 = document.getElementById("fish2");
  const fish3 = document.getElementById("fish3");
  const fish4 = document.getElementById("fish4");

  const fishes = [fish1, fish2, fish3, fish4];

  const time = 15;
  const changeToMoveForward = 0.62;

  let fishAnimationFrame;

  let winner;

  const positions = {
    fish1: 0,
    fish2: 0,
    fish3: 0,
    fish4: 0,
  };

  const createFishMovement = () => {
    let startTime;

    const move = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      let elapsed = timestamp - startTime;

      if (elapsed >= time) {
        fishes.forEach((fishElement) => {
          const movement = Math.random() > 0.5 ? 1 : 0;

          if (Math.random() < changeToMoveForward) {
            positions[fishElement.id] += movement;
          } else {
            positions[fishElement.id] -= movement;
          }

          fishElement.style.left = `${positions[fishElement.id]}%`;

          if (fishElement.style.left === "85%") {
            winner = fishElement.id;

            const id = "crown-" + winner;

            cancelAnimationFrame(fishAnimationFrame);

            document.getElementById(id).style.display = "inline-block";
          }
        });
        startTime = timestamp;
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
            gsap
              .timeline()
              .to("#fish1", {
                opacity: 1,
                duration: 1,
                ease: "power1.out",
              })
              .to("#fish1", {
                top: "3%",
                transform: "translate(-50%, 0%)",
                ease: "power2.out",
                duration: 1,
              })
              .to("#fish1", {
                left: "52%",
                duration: 0.2,
                ease: "expo.out",
              })
              .to("#fish1", {
                left: "0%",
                transform: "translate(0%, 0%)",
                ease: "bounce.out",
                duration: 2,
              });
            elapseTime = 4200;
            break;
          case 2:
            gsap
              .timeline()
              .to("#fish2", {
                opacity: 1,
                duration: 1,
                ease: "power1.out",
              })
              .to("#fish2", {
                top: "29%",
                transform: "translate(-50%, 0%)",

                ease: "power2.out",
                duration: 1,
              })
              .to("#fish2", {
                left: "52%",
                duration: 0.2,
                ease: "expo.out",
              })
              .to("#fish2", {
                left: "0%",
                transform: "translate(0%, 0%)",
                ease: "bounce.out",
                duration: 2,
              });
            elapseTime = 4200;
            break;
          case 3:
            gsap
              .timeline()
              .to("#fish3", {
                opacity: 1,
                duration: 1,
                ease: "power1.out",
              })
              .to("#fish3", {
                top: "54%",
                transform: "translate(-50%, 0%)",

                ease: "power2.out",
                duration: 1,
              })
              .to("#fish3", {
                left: "52%",
                duration: 0.2,
                ease: "expo.out",
              })
              .to("#fish3", {
                left: "0%",
                transform: "translate(0%, 0%)",
                ease: "bounce.out",
                duration: 2,
              });
            elapseTime = 4200;

            break;
          case 4:
            gsap
              .timeline()
              .to("#fish4", {
                opacity: 1,
                duration: 1,
                ease: "power1.out",
              })
              .to("#fish4", {
                top: "78%",
                transform: "translate(-50%, 0%)",
                ease: "power2.out",
                duration: 1,
              })
              .to("#fish4", {
                left: "52%",
                duration: 0.2,
                ease: "expo.out",
              })
              .to("#fish4", {
                left: "0%",
                transform: "translate(0%, 0%)",
                ease: "bounce.out",
                duration: 2,
              });
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
};
