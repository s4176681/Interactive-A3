//This is the set up JS file

const canvas = document.querySelector("#game-canvas"); //selecting the 'ID' from the styling file.
const ctx = canvas.getContext("2d");


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

