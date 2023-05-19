import Shape from "./Shape.js";
import Bresenham from "../algorithms/bresenham.js";

export default class Polyline extends Shape {
    constructor(vertices) {
        super();
        this.vertices = vertices;
    }

    rasterize() {
        let bresenham = new Bresenham();
        let points = [];
        for (let i = 1; i <= this.vertices.length; i++) {
            let line;
            if (i == this.vertices.length) {
                line = bresenham.buildLine(this.vertices[i-1], this.vertices[0]);
            }else {
                line = bresenham.buildLine(this.vertices[i - 1], this.vertices[i]);
            }
            points = points.concat(line);
        }


        return points;
    }
}
