//Create a particle array. List out different elements

const particles = [];

function spawnParticles() { // we have the load the correct functions in a certain given order corresponding to the other file.
    for (let i = 0; i < 50; i++) { // This number is the particle counter.
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3, // vx = velocity x
            vy: (Math.random() - 0.5) * 0.3, // vy = veloctiy y, as their movement speed
            size: Math.random() * 3+1
        });
    }
}

function animateparts() { //handles all the particle effects
    particles.forEach(p => {

        //movements from the particles, never stops moving, continuous momentum.
        p.x += p.vx;
        p.y += p.vy;

        //friction on the particles, with a visible slow down.
        p.vx *= 0.95;
        p.vy *= 0.95;

        // constrained to the screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // shark is interacting
        const dx = p.x - sharkState.x;
        const dy = p.y - sharkState.y;
        //const distance = Math.sqrt(dx * dx + dy * dy);
        // this makes it so that every frame for every particle is displayed.
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < 120 * 120) {
            p.vx += dx * 0.002;
            p.vy += dy * 0.002;
        }
        
        // occasional drifting 
        if (Math.random() < 0.01) {
            p.vx += (Math.random() - 0.5) * 0.2;
            p.vy += (Math.random() - 0.5) * 0.2;
        }

        // drawing the particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();
    });
}