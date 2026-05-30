//Shark related JS file.
function initShark(canvas, ctx) {
    const shark = new Image();
    shark.src = "img/icons8-shark-64.png";
    // DOM: Document object model, representing the HTML document as a tree structure. But we're not using that here.
    const sharkState = { //one object/entity, all logic depends on state, not DOM
        x: 700,
        y: 300,
        w: 80,
        h: 80,
        dragging: false
    }

    function isInsideShark(mx, my) { //create a hitbox rectangle inside the shark thats invisible.
        return ( 
            mx >= sharkState.x && // '&&' means 'AND', we'll only continue if both are true.
            mx <= sharkState.x + sharkState.w &&  
            my >= sharkState.y && // Conditions 1 and 2: the mouse must be greater than the left side of the shark 'AND' less than the right side of the shark. Vice versa for top and bottom.
            my <= sharkState.y + sharkState.h
        );
    } // Why 'mx' and 'my'? This stands for 'mouse X/Y position'.
    // Referring back to the learning from 19/5, the 0,0 origin point is the top left of the screen. 

    //true drag
    let offsetX = 0;
    let offsetY = 0;

    // EVENT STEP 1
    // This is the clicking phase, by structuring out these sections makes it easier to troubleshoot or adjust later.
    canvas.addEventListener("mousedown", (e) => { 
        const mx = e.clientX; //we need to compare the mouse position to the shark's position.
        const my = e.clientY; //thus, we find the mouse's position first.

        if (isInsideShark(mx, my)) {
            sharkState.dragging = true; //the event listener waits for a click to happen on the shark.
        
            // the difference between the mouse and the shark pos
            offsetX = mx - sharkState.x;
            offsetY = my - sharkState.y;
        }
    });

    // EVENT STEP 2
    canvas.addEventListener("mousemove", (e) => {
        if (!sharkState.dragging) return; //this can only happen when dragging has activated.

        //follow, intended to be smooth
        sharkState.x = e.clientX - offsetX;
        sharkState.y = e.clientY - offsetY;
    });

    //EVENT STEP 3
    // Finishing the event on mouseup.
    window.addEventListener("mouseup", () => {
        sharkState.dragging = false; //switch it back to false once its 
    });
    window.shark = shark;
    window.sharkState = sharkState; // exposing globally so that the functions being called in main.js work.
}


