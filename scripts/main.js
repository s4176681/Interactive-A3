const canvas = document.querySelector("#game-canvas"); //selecting the 'ID' from the styling file.
const ctx = canvas.getContext("2d");

const shark = new Image();
shark.src = "img/icons8-shark-64.png";

const sharkState = {
    x: 200,
    y: 200,
    w: 80,
    h: 80,
    dragging: false
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function isInsideShark(mx, my) { //create a hitbox rectangle inside the shark thats invisible.
    return (
        mx >= sharkState.x &&
        mx <= sharkState.x + sharkState.w &&
        my >= sharkState.y &&
        my <= sharkState.y + sharkState.h
    );
}

canvas.addEventListener("mousedown", (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    if (isInsideShark(mx, my)) {
        sharkState.dragging = true; //the event listener waits for a click to happen on the shark.
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (!sharkState.dragging) return; //this can only happen when the first event listener above has occured.

    //follow, intended to be smooth
    const targetX = e.clientX - sharkState.w /2;
    const targetY = e.clientY - sharkState.h /2;

    sharkState.x += (targetX - sharkState.x) * 0.2;
    sharkState.y += (targetY - sharkState.y) * 0.2;
});

window.addEventListener("mouseup", () => {
    sharkState.dragging = false; //switch it back to false once its 
})

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

    if (shark.complete) { //checking the states and allowing movements.
        ctx.drawImage(shark, sharkState.x, sharkState.y, sharkState.w, sharkState.h);
    }
}

animate();

