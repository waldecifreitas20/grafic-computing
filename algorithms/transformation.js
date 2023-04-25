export default class Transformation {
    constructor(points) {
        this.points = points;
    }

    translate(x, y) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].x += x;
            this.points[i].y += y;
        }
    }
}

