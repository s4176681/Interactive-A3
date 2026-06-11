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

    const dx = window.sharkState.targetX - window.sharkState.x;
    const dy = window.sharkState.targetY - window.sharkState.y;

    //Physics BLOCK
    // 'spring feel type force'
    window.sharkState.vx += dx * 0.12; 
    window.sharkState.vy += dy * 0.12;

    // removing the jitter, overshoot, stuttering.
    window.sharkState.vx *= 0.35;//adjust this value to change the amount of bounce.
    window.sharkState.vy *= 0.35;//the higher the value, the more bounce and jitter, all the way up to 1 for absolutely no inertia. 

    window.sharkState.x += window.sharkState.vx;
    window.sharkState.y += window.sharkState.vy;

    const vx = window.sharkState.vx; // changed the dx/dy to v 'velocity' instead to correct the jittery movements from the angle following.
    const vy = window.sharkState.vy;

    if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) {  // only one angle assignment should exist.      
        // storing the facing direction separately, don't encode it into angle aspect of the code.
        if (Math.abs(vx) > 0.01) {
            window.sharkState.facingRight = vx > 0;
        }
    }

    if (window.shark && window.sharkState && window.shark.naturalWidth) { //checking the states and allowing movements, prevents undefined crashes.
        ctx.save(); // remember canvas state

        ctx.translate(
            window.sharkState.x + window.sharkState.w / 2,
            window.sharkState.y + window.sharkState.h / 2
        );

        const facingRight = window.sharkState.facingRight;

        //build the full angle from scratch each time the interaction happens
        const travelAngle = Math.atan2(vy, vx);

        // Flip horizontally if facing right, first step.
        //const flipX = window.sharkState.facingRight ? 1 : -1;// these two 1 values make sure the shark is facing which way when being dragged.
        //ctx.scale(flipX, 1);
        // scale and rotate ARE ALWAYS IN CONFLICT WITH EACH OTHER!
        // rotation next step
        // Offset Math.PI
        //const angleOffset = window.sharkState.facingRight ? 0 : Math.PI;
        // Math.PI fixes left facing sprite. 
        ctx.rotate(travelAngle + Math.PI); // Math.PI flips 180* for the Math.atan, which assumes 0 radians.
        //We're not doing 360 rotations anymore, only 180, but thats only if we're doing horizontal flips.

        if (facingRight) {
            ctx.scale(1, -1);
        }

        // draw centred shark next step
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