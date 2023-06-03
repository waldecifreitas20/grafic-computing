import Colors from "../utils/colors.js";

export default class OrderedPair {
    constructor(x, y, color = Colors.BORDER, value = '-') {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.value = value;
        this.color = color;
    }
}

