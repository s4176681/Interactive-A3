// this is the dragging promot on load of the site.
// a small and subtle touch that will hint the user in the right direction.

let promptOpacity = 1; // starts on load being fully visible
let promptVisible = true;

function drawDragPrompt(canvas, ctx, sharkState) {
    if (!promptVisible) return; // if 'NOT' prompt is visible.

    // Fade out once the shark had been interacted with by the user.
    if (window.sharkState.dragging) {
        promptOpacity -= 0.05; // Fade speed, lower it is, the slow it is.
    }

    if (promptOpacity <= 0) {
        promptVisible = false;
        return;
    }

    const centerX = window.sharkState.x + window.sharkState.w / 2; // centered on the X axis
    const centerY = window.sharkState.y; // sits above the shark's whereabouts.

    ctx.save();
    ctx.globalAlpha = promptOpacity;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Drag me!", centerX, centerY);
    ctx.restore();
}