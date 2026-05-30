//Create a particle array. List out different elements

const particles = [];

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 0.3, // vx = velocity x
        vy: (Math.random() - 0.5) * 0.3, // vy = veloctiy y, as their movement speed

        size: Math.random() * 3+1
    });
}

function animateparts() {
    particles.forEach(p => {

        //movements from the particles
        p.x += p.vx;
        p.y += p.vy;

        // shark is interacting
        const dx = p.x - sharkState.x;
        const dy = p.y - sharkState.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {

            p.vx += dx * 0.002;
            p.vy += dy * 0.002;
        }

        // drawing the particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();
    });
}

animateparts();
