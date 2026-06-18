// Mood/colour overlay system JS file
// This takes the shark's Y position and responds with tunes and hints through subtle changes of colour on the canvas.
// Reads the top and bottom of the screen, high for warmer colours, low for darker colours.

function drawMoodOverlay(canvas, ctx, sharkState) {
    // 0 is the top of the screen, whereas 1 is the bottom
    const depthRatio = window.sharkState.y / canvas.height;

    // defining colours
    const topColour = { r: 255, g: 140, b: 80 }; 
    const bottomColour = { r: 0, g: 10, b: 25 };

    // linear interpolation
    const r = topColour.r + (bottomColour.r - topColour.r) * depthRatio;
    const g = topColour.g + (bottomColour.g - topColour.g) * depthRatio;
    const b = topColour.b + (bottomColour.b - topColour.b) * depthRatio;

    // low opacity, draw
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`; // Change this for opacity
    ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);


    // PART 2
    // Soft glow around the shark whether its higher or lower.
    const glowStrength = depthRatio; // 0 top, 1 is bottom
    const glowRadius = 150;

    const gradient = ctx.createRadialGradient(
        window.sharkState.x + window.sharkState.w / 2, // centre on the X axis
        window.sharkState.y + window.sharkState.h / 2, // centre y
        0, // inner radius glow
        window.sharkState.x + window.sharkState.w / 2,
        window.sharkState.y + window.sharkState.h / 2,
        glowRadius // outer radius
    );

    gradient.addColorStop(0, `rgba(40, 100, 160, ${0.4 * glowStrength})`); // inner glow look
    gradient.addColorStop(1, `rgba(0, 0, 0, 0)`) // transparent fade out

    ctx.fillStyle = gradient;
    ctx.fillRect(
        window.sharkState.x + window.sharkState.w / 2 - glowRadius,
        window.sharkState.y + window.sharkState.h / 2 - glowRadius,
        glowRadius * 2,
        glowRadius * 2
    );

}
