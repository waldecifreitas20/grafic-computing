import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/env.js";
import screen from "../algorithms/screen.js"
import DATABASE from "../data/data.js";


function byScan(x, y, alreadyFilled = []) {
    const isNotFilled = !DATABASE.hasPoint(x, y) && !isOnStack(x, y, alreadyFilled);
    const fitWidth = x < SCREEN_WIDTH / 2 && x > -SCREEN_WIDTH / 2;
    const fitHeight = y < SCREEN_HEIGHT / 2 && y > -SCREEN_HEIGHT / 2;

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