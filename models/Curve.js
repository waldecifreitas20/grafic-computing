import OrderedPair from "./OrderedPair.js";
import Shape from "./Shape.js"

export default class Curve extends Shape {
    constructor(p0, p1, p2, smoothness) {
        super();
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.smoothness = smoothness;
    }

    rasterize() {
        this.points = [];
        let n = this.smoothness;
        for (let i = 0; i <= n; i++) {
            let t = i / n;
            let int = this.interpolations(this.p0, this.p1, this.p2, t);

            let p = this.linearInterpolation(int.p01, int.p12, t);
            this.points.push(p);
        }
        return this.points;
    }

    linearInterpolation(p1, p2, t) {
        let x = p1.x * (1 - t) + p2.x * t;
        let y = p1.y * (1 - t) + p2.y * t;

        return new OrderedPair(x, y);
    }

    interpolations(p0, p1, p2, t) {
        return {
            p01: this.linearInterpolation(p0, p1, t),
            p12: this.linearInterpolation(p1, p2, t),
        }
    }


}