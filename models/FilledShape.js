import OrderedPair from "./OrderedPair.js";
import Shape from "./Shape.js";

export default class FilledShape extends Shape {
    constructor(points, color='green') {
        super();
        this.points = points;
        console.log(points);
        this.color = color;
        this._convertToOrderedPair();
    }
    _convertToOrderedPair() {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i] = new OrderedPair(this.points[i].x, this.points[i].y, this.color);            
        }
    }
    rasterize() {
        
        return this.points;
    }
}