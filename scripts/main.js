//This is the set up JS file
window.canvas = document.querySelector("#art-canvas"); //selecting the 'ID' from the styling file.
window.ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("DOMContentLoaded", () => {
    
    // DOM ORDER
    initShark(canvas, ctx); // Calling the Shark JS functions

    spawnParticles();

    animate();
});

function animate() { //creating the animate function for my canvas
    if (!window.sharkState) return; // TELL ME IF INITSHARK FAILS
    requestAnimationFrame(animate);
    
    const w = canvas.width;
    const h = canvas.height;
    //ctx stands for 'context', representing a paintbrush. Everything visually gets drawn through ctx in JS.
    ctx.clearRect(0,0,w,h);

    //ocean bg, 2 different colours for now.
    ctx.fillStyle = "#0b2238";
    ctx.fillRect(0, h*0, w, h*0.3);
    ctx.fillStyle = "#04192d";
    ctx.fillRect(0, h*0.3, w, h*0.4);

    const dx = window.sharkState.x - window.sharkState.prevX;
    const dy = window.sharkState.y - window.sharkState.prevY;

    if (dx !== 0 || dy !== 0) {
        window.sharkState.angle = Math.atan2(dy, dx);
    }

    window.sharkState.prevX = window.sharkState.x;
    window.sharkState.prevY = window.sharkState.y;


    if (window.shark && window.sharkState && window.shark.naturalWidth) { //checking the states and allowing movements, prevents undefined crashes.
        ctx.save(); // remember canvas state

        ctx.translate(
            window.sharkState.x + window.sharkState.w / 2,
            window.sharkState.y + window.sharkState.h / 2
        );

        ctx.rotate(window.sharkState.angle + Math.PI); // flips 180* for the Math.atan, which assumes 0 radians.

        ctx.drawImage(
            window.shark,
            -window.sharkState.w / 2,
            -window.sharkState.h / 2,
            window.sharkState.w,
            window.sharkState.h
        );

        ctx.restore();
        // using the global structure with '.window'.
    }

    // calling particle functions in the other JS file for file structuring purposes.
    animateparts();
    
}