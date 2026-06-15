// School of fish system JS file
// The overall approach of this file is to set up a moving base for a group of fish to respond and scatter according to the shark's position.
// This was done with the use of velocity changes and 'f' which represents anything to do with fish thats being iterated.

//setting up the fish png
const fish = new Image();
fish.src = "img/icons8-fish-24.png"

const fishSchool = []; //array
let schoolCenter = { x: 0, y: 0 };
let schoolVX = 0.4; // base velocity, or 'drift' speed through the current of the ocean.

function spawnFish(canvas) {
    schoolCenter.x = canvas.width * 0.3;
    schoolCenter.y = canvas.height * 0.5;

    for (let i = 0; i < 90; i++) { // the number of fish in the school
        fishSchool.push({
            offsetX: (Math.random() - 0.5) * 400, // using offset to spread them individually around the centre.
            offsetY: (Math.random() - 0.5) * 350, // change this value to adjust how the school looks, clustered, wide spread, etc.
            x: 0, // the actualy draw position
            y: 0,
            vx: 0,
            vy: 0,
            scatterVX: 0,
            scatterVY: 0,
            size: 12 + Math.random() * 6,
            facingRight: true
        });
    }
}

function animateFish(canvas, ctx, sharkState) { //the elements the 'fish' has to involve it with in order to behave correctly.
    // moving the school centre with the current of the environment.
    schoolCenter.x += schoolVX;

    fishSchool.forEach(f => {
        //targetting the positiong equals to the school center plus individual offset.
        const targetX = schoolCenter.x + f.offsetX;
        const targetY = schoolCenter.y + f.offsetY;

        // was snapping back, but adjusting this so that the fish feel like they're swimming instead if bouncing back into their og position.
        const ease = 0.02;
        const maxReturnSpeed = 0.3; // lower, the slower the return
        let pullX = (targetX - f.x) * ease;
        let pullY = (targetY - f.y) * ease;
        // clamp the pull, so they don't get yanked back into the school
        pullX = Math.max(-maxReturnSpeed, Math.min(maxReturnSpeed, pullX));
        pullY = Math.max(-maxReturnSpeed, Math.min(maxReturnSpeed, pullY));

        f.vx += pullX;
        f.vy += pullY;

        f.vx *= 0.9; // stop ORBITING
        f.vy *= 0.9;

        //shark disruption, dispersion effect.
        const dx = f.x - window.sharkState.x;
        const dy = f.y - window.sharkState.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < 150 * 150) { // controls fish's response.
            const dist = Math.sqrt(distanceSq) || 1;
            const force = (150 - dist) / 150; // stronger the push, the closer the shark is.
            
            // only scatter if the shark is actually moving.
            const sharkSpeed = Math.sqrt(window.sharkState.vx * window.sharkState.vx + window.sharkState.vy * window.sharkState.vy);
            const movementFactor = Math.min(sharkSpeed / 2, 1); // 0 if still, up till 1 if moving fast, or dragging fast in this case.

            f.scatterVX += (dx / dist) * force * movementFactor; // scatter distance, response from the fish.
            f.scatterVY += (dy / dist) * force * movementFactor; // normalise direction, scaled pushing.
        }

        //swim around the shark's body
        const bodyRadius = 50;
        if (distanceSq < bodyRadius * bodyRadius) {
            const dist = Math.sqrt(distanceSq) || 5;
            const pushForce = (bodyRadius - dist) / bodyRadius;
            f.vx += (dx / dist) * pushForce * 10; //SWIM AROUND THE SHARK!!!
            f.vy += (dy / dist) * pushForce * 10; // push away fish when too close to the shark on both axis'
        }

        // MAX SPEED CAP
        const maxSpeed = 6; // change this accordingly to match desired 'response'.
        const totalVX = f.vx + f.scatterVX;
        const totalVY = f.vy + f.scatterVY;
        const speed = Math.sqrt(totalVX * totalVX + totalVY * totalVY);

        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            f.vx *= scale;
            f.vy *= scale;
            f.scatterVX *= scale;
            f.scatterVY *= scale;
        }

        // combining the school movement with scatter
        f.x += f.vx + f.scatterVX;
        f.y += f.vy + f.scatterVY;

        // individual wrap around instead of wrapping the whole school
        if (f.x > canvas.width + f.size) {
            f.x = -f.size;
            f.offsetX -= (canvas.width + f.size * 2);
        }
        if (f.x < -f.size) {
            f.x = canvas.width + f.size;
            f.offsetX += (canvas.width + f.size * 2);
        }

        // friction on scatter movement, so that fish gather back up after disruption.
        f.scatterVX *= 0.99; // change these values, this is the fish's return to the group speed.
        f.scatterVY *= 0.99;

        // facing direction based on the combined velocity, directional knowledge.
        if (Math.abs(totalVX) > 0.05) {
            f.facingRight = totalVX > 0;
        }

        // initialise x or y on the first frame
        if (f.x === 0 && f.y === 0) {
            f.x = targetX;
            f.y = targetY;
        }

        // draw 
        ctx.save();
        ctx.translate(f.x, f.y);
        const flip = f.facingRight ? 1 : -1;
        ctx.scale(flip, 1);

        ctx.drawImage(fish, -f.size, -f.size / 2, f.size * 2, f.size); // drawing the fish here

        ctx.restore();
    })
}

