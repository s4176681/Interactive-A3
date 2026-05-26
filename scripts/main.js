const canvas = document.querySelector("#game-canvas"); //selecting the 'ID' from the styling file.
const ctx = canvas.getContext("2d");

const shark = new Image();
shark.src = "img/icons8-shark-64.png"

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function animate() { //creating the animate function for my canvas
    requestAnimationFrame(animate);

    const w = canvas.width;
    const h = canvas.height;
    //ctx stands for 'context', representing a paintbrush. Everything visually gets drawn through ctx in JS.
    ctx.clearRect(0,0,w,h);

    //moon placeholder
    ctx.beginPath();
    ctx.arc(w/2, h/3, 40, 0, Math.PI * 2) //change this later to adjust rotational arc
    ctx.fillStyle = "#ffe27a";
    ctx.fill();

    //ocean placeholder
    ctx.fillStyle = "#0b2238";
    ctx.fillRect(0, h*0.8, w, h*0.2);

    if (shark.complete) {
        ctx.drawImage(shark, w/2, h/2, 80, 80);
    }
}


animate();
