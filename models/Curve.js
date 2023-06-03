import Bresenham from "../algorithms/bresenham.js";
import { cosOf, sinOf } from "../utils/utils.js";
import OrderedPair from "./OrderedPair.js";
import Shape from "./Shape.js"

export default class Curve extends Shape {
    constructor(p0, p1, p2, smoothness) {
        super([]);
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
        return this.conectInterpolations(this.points);
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

    conectInterpolations = segments => {
        let bresenham = new Bresenham();
        let points = [];
        for (let i = 1; i < segments.length; i++) {
            let line = bresenham.buildLine(segments[i - 1], segments[i]);
            points = points.concat(line);
        }

        return points;
    }

    translate(x, y) {
        this.p0.x += x;
        this.p0.y += y;

        this.p1.x += x;
        this.p1.y += y;

        this.p2.x += x;
        this.p2.y += y;
    }

    scale(xFactor, yFactor) {
        let center = this.getCenter();

        this.translate(-center.x, -center.y);

        this.p0.x *= xFactor;
        this.p0.y *= yFactor;

        this.p1.x *= xFactor;
        this.p1.y *= yFactor;

        this.p2.x *= xFactor;
        this.p2.y *= yFactor;

        this.translate(center.x, center.y);
    }

    rotation(angle, pivot) {
        this.translate(-pivot.x, -pivot.y);

        this.p0.x = Math.round(this.p0.x * cosOf(angle) - this.p0.y * sinOf(angle));
        this.p0.y = Math.round(this.p0.x * sinOf(angle) + this.p0.y * cosOf(angle));
        this.p1.x = Math.round(this.p1.x * cosOf(angle) - this.p1.y * sinOf(angle));
        this.p1.y = Math.round(this.p1.x * sinOf(angle) + this.p1.y * cosOf(angle));
         
        this.p2.x = Math.round(this.p2.x * cosOf(angle) - this.p2.y * sinOf(angle));
        this.p2.y = Math.round(this.p2.x * sinOf(angle) + this.p2.y * cosOf(angle));

        this.translate(pivot.x, pivot.y);
    }

}