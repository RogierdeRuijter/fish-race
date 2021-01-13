const setScreenSizeListener = () => {
    const contentContainer = document.getElementById("content-container");
    const finishElement = document.getElementById("finish");
    
    const widthContentContainer = 925;
    const heightContentContainer = 745;

    const finishLineWidth = 25;

    const resizeContentContainer = () => {
        const screenWidth = Math.min(window.innerWidth, window.outerWidth);
        const screenHeight = Math.min(window.innerHeight, window.outerHeight);

        scale = Math.min(
            screenWidth / widthContentContainer,    
            screenHeight / heightContentContainer
        ) * 0.95;

        let translateScale = 10/scale;
        console.log(translateScale);
        if (translateScale < 12) {
            translateScale = 0;
        }
        
        contentContainer.style.transform = "translate(0%, -" + translateScale + "%) " +"scale(" + scale + ")";
    }

    resizeContentContainer();

    const calculateFinishLinePosition = () => {
        finishLine = getOffset(finishElement).left + finishLineWidth + 5;
    }

    window.addEventListener('resize', () => {
        resizeContentContainer();
        calculateFinishLinePosition();
    }, true);

    calculateFinishLinePosition();
}
