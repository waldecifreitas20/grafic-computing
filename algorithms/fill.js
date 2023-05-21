import DATABASE from "../data/data.js";
import { MAX_X, MAX_Y } from "../utils/env.js";


/* 
    THIS FUNCTION NEEDS TO KNOW WHERE ARE ALL THE POINTS
    WHICH ARE BEING RENDERED. A TIP IS CREATE A MATRIX IN
    SCREEN.JS, AND MAKE THIS FUNCIOTN ACCESS IT.
*/
function byScan(x, y, alreadyFilled = []) {
    const isNotFilled = !DATABASE.hasPoint(x, y) && !isOnStack(x, y, alreadyFilled);
    const fitWidth = x <= MAX_X / 2 && x >= -MAX_X / 2;
    const fitHeight = y <= MAX_Y / 2 && y >= -MAX_Y / 2;

    if (isNotFilled && fitHeight && fitWidth) {
        alreadyFilled.push({ x, y });
        
        alreadyFilled = byScan(x - 1, y, alreadyFilled);
        alreadyFilled = byScan(x + 1, y, alreadyFilled);
        alreadyFilled = byScan(x, y + 1, alreadyFilled);
        alreadyFilled = byScan(x, y - 1, alreadyFilled);

    }
    return alreadyFilled;

}


function isOnStack(x, y, list) {
    for (const point of list) {
        if (point.x == x && point.y == y) {
            return true;
        }
    }
    return false;
}

export default {
    byScan
}