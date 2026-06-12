// School of fish system JS file
//setting up the fish png
const fish = new Image();
fish.src = "img/icons8-fish-24.png"

const fishSchool = []; //array
let schoolCenter = { x: 0, y: 0 };
let schoolVX = 0.4; // base velocity, or 'drift' speed through the current of the ocean.

function spawnFish(canvas) {
    schoolCenter.x = canvas.width * 0.3;
    schoolCenter.y = canvas.height * 0.5;

    for (let i = 0; i < 15; i++) { // the number of fish in the school
        fishSchool.push({
            offsetX: (Math.random() - 0.5) * 150, // using offset to spread them individually around the centre.
            offsetY: (Math.random() - 0.5) * 80,
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

    //wrap around for the entire school
    if (schoolCenter.x > canvas.width + 100) {
        schoolCenter.x = -100;
    }
    if (schoolCenter.x < -100) {
        schoolCenter.x = canvas.width + 100;
    }

    fishSchool.forEach(f => {
        //targetting the positiong equals to the school center plus individual offset.
        const targetX = schoolCenter.x + f.offsetX;
        const targetY = schoolCenter.y + f.offsetY;

        // ease back
        f.vx += (targetX - f.x) * 0.02;
        f.vy += (targetY - f.y) * 0.02;

        //shark disruption, dispersion effect.
        const dx = f.x - window.sharkState.x;
        const dy = f.y - window.sharkState.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < 150 * 150) {
            f.scatterVX += dx * 0.01; // scatter distance, response from the fish.
            f.scatterVY += dy * 0.01;
        }

        // combining the school movement with scatter
        f.x += f.vx + f.scatterVX;
        f.y += f.vy + f.scatterVY;

        // friction on scatter movement, so that fish gather back up after disruption.
        f.scatterVX *= 0.9;
        f.scatterVY *= 0.9;

        // facing direction based on the combined velocity, directional knowledge.
        const totalVX = f.vx + f.scatterVX;
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

