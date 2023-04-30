export default class OrderedPair {
    constructor(x, y, value = '-', color = 'black') {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.value = value;
        this.color = color;
    }

}

