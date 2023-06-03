import Shape from "./Shape.js";
import Bresenham from "../algorithms/bresenham.js";

export default class Polyline extends Shape {
    constructor(points, color) {
        super(points);
        this.color = color;
    }

    rasterize() {
        let bresenham = new Bresenham(1000, this.color);
        let lineBody = [];
 
        for (let i = 1; i <= this.points.length; i++) {
            let line;
            if (i == this.points.length) {
                line = bresenham.buildLine(this.points[i - 1], this.points[0]);
                lineBody = lineBody.concat(line);
            } else if (this.points.length > 2) {
                line = bresenham.buildLine(this.points[i - 1], this.points[i]);
                lineBody = lineBody.concat(line);
            }
        }
   
        return lineBody;
    }
}
