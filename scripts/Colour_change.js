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
}