export default class OrderedPair {
    constructor(x, y, color = 'black', value = '-') {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.value = value;
        this.color = color;
        this.isVertex = false
    }

    setAsVertex() {
        this.isVertex = true;
    }

    static buildVertex(x, y, color = 'black') {
        let vertex = new OrderedPair(x, y, color, '-');
        vertex.setAsVertex();
        return vertex;
    }
}

