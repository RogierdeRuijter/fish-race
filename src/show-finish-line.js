/* This method is used to only show the finish line when the water is
 * loaded, if we don't do this the finish line flashes on the screen
 */
const showFinishLine = () => {
  document.getElementById("finish").style.opacity = 1;
};
