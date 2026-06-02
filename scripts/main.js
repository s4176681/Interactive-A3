//This is the set up JS file
const canvas = document.querySelector("#art-canvas"); //selecting the 'ID' from the styling file.
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();

    initShark(canvas, ctx); // Calling the Shark JS functions

    spawnParticles();

    animate();
});

function animate() { //creating the animate function for my canvas
    requestAnimationFrame(animate);
    
    const w = canvas.width;
    const h = canvas.height;
    //ctx stands for 'context', representing a paintbrush. Everything visually gets drawn through ctx in JS.
    ctx.clearRect(0,0,w,h);

    //ocean placeholder
    ctx.fillStyle = "#0b2238";
    ctx.fillRect(0, h*0.4, w, h*0.6);

    if (window.shark && shark.naturalWidth) { //checking the states and allowing movements.
        ctx.drawImage(
            window.shark, 
            window.sharkState.x, 
            window.sharkState.y, 
            window.sharkState.w, 
            window.sharkState.h); // using the global structure with '.window'.
    }

    // calling particle functions in the other JS file for file structuring purposes.
    animateparts();
    
}