import Shape from "./Shape.js";
import Bresenham from "../algorithms/bresenham.js";

export default class Polyline extends Shape {
    constructor(vertices) {
        super(vertices);
    }

    rasterize() {
        let bresenham = new Bresenham();
        let points = [];
        for (let i = 1; i <= this.vertices.length; i++) {
            let line;
            if (i == this.vertices.length) {
                line = bresenham.buildLine(this.vertices[i-1], this.vertices[0]);
                points = points.concat(line);
            }else if(this.vertices.length > 2){
                line = bresenham.buildLine(this.vertices[i - 1], this.vertices[i]);
                points = points.concat(line);
            }
        }

        return points;
    }
}
