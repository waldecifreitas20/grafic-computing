import Bresenham from "../algorithms/bresenham.js";
import Shape from "./Shape.js";

export default class Line extends Shape {
    constructor(origin, destiny) {
        super([origin, destiny]);
        this.origin = origin;
        this.destiny = destiny;
        
    }

    rasterize() {
        let bresenham = new Bresenham();
        return bresenham.buildLine(this.origin, this.destiny);
    }

   

}