//Shark related JS file.
function initShark(canvas, ctx) { //defines data and inpit logic
    const shark = new Image();
    shark.src = "img/icons8-shark2-64.png"
    // DOM: Document object model, representing the HTML document as a tree structure. But we're not using that here.
    const sharkState = { //one object/entity, all logic depends on state, not DOM.
        x: 700,
        y: 400,
        prevX: 700,
        prevY: 400,
        vx: 0,
        vy: 0,
        targetX: 700,
        targetY: 400,
        w: 80,
        h: 80,
        dragging: false,
        angle: 0,
        facingRight: true // setting up shark facing a direction
    };

    let offsetX = 0;
    let offsetY = 0;

    function isInsideShark(mx, my) { //create a hitbox rectangle inside the shark thats invisible.
        return ( 
            mx >= sharkState.x && // '&&' means 'AND', we'll only continue if both are true.
            mx <= sharkState.x + sharkState.w &&  
            my >= sharkState.y && // Conditions 1 and 2: the mouse must be greater than the left side of the shark 'AND' less than the right side of the shark. Vice versa for top and bottom.
            my <= sharkState.y + sharkState.h
        );
    } // Why 'mx' and 'my'? This stands for 'mouse X/Y position'.
    // Referring back to the learning from 19/5, the 0,0 origin point is the top left of the screen. 

    // EVENT STEP 1
    // This is the clicking phase, by structuring out these sections makes it easier to troubleshoot or adjust later.
    canvas.addEventListener("mousedown", (e) => { 
        const mx = e.clientX; //we need to compare the mouse position to the shark's position.
        const my = e.clientY; //thus, we find the mouse's position first.

        if (isInsideShark(mx, my)) {
            sharkState.dragging = true; //the event listener waits for a click to happen on the shark.
        
            // the difference between the mouse and the shark pos
            offsetX = mx - (sharkState.x); // 0 ffset setting for now.
            offsetY = my - (sharkState.y);
        }
    });

    // EVENT STEP 2
    canvas.addEventListener("mousemove", (e) => {
        if (!sharkState.dragging) return; //this can only happen when dragging has activated.
        
        //const dx = e.movementX || 0; // dx/dy means 'new position minus old position'.
        //const dy = e.movementY || 0; // stabilise movements.
        
        //if (dx !== 0 || dy !== 0) { //e.movement means how many pixels did the mouse move since the previous move move event??
            //sharkState.angle = Math.atan2(dy, dx); // this line stores the values of what the angle of the shark should be pointing at.
        //}

        // mouse move purpose now is to only set a target.

        sharkState.targetX = e.clientX - offsetX;
        sharkState.targetY = e.clientY - offsetY;
    });

    //EVENT STEP 3
    // Finishing the event on mouseup.
    window.addEventListener("mouseup", () => {
        sharkState.dragging = false; //switch it back to false once its 
    });

    window.shark = shark;
    window.sharkState = sharkState;

}

