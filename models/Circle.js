import OrderedPair from "./OrderedPair.js";
import Shape from "./Shape.js"

export default class Circle extends Shape {
    constructor(radius, cx = 0, cy = 0) {
        super([]);
        this.radius = radius;
        this.cx = cx;
        this.cy = cy;
        this.points = [];
    }

    rasterize() {
        let x = 0;
        let y = this.radius;
        let e = -this.radius;
        this.points = [];


        this.points.push(new OrderedPair(x, y))
        this.points.push(new OrderedPair(y, x,))
        this.points.push(new OrderedPair(-y, -x))
        this.points.push(new OrderedPair(-x, -y))
        
        while (x <= y) {
            e += 2 * x + 1;
            x++;

            if (e >= 0) {
                e += 2 - (2 * y)
                y--;
            }

            this.points.push(new OrderedPair(y, x))//1o. oct
            this.points.push(new OrderedPair(x, y))//2o. oct
            this.points.push(new OrderedPair(-x, y))//3o. oct
            this.points.push(new OrderedPair(-y, x))//4o.oct
            this.points.push(new OrderedPair(-y, -x))//5o. oct
            this.points.push(new OrderedPair(-x, -y))//6o. oct
            this.points.push(new OrderedPair(x, -y))//7o. oct
            this.points.push(new OrderedPair(y, -x))//8o. oct
        }

        this.translate(this.cx, this.cy);
        return this.points;
    }

    scale(factor) {
        if (factor > 0) {
            this.radius *= factor;
        }
    }
    
    translate(x, y) {
        super.translate(x,y);
        this.cx = x;
        this.cy = y;
    }

    rotation(angle, pivot) {
        super.rotation(angle, pivot);
        let newCenter = this.getCenter();
        this.cx = newCenter.x;
        this.cy = newCenter.y;
    }

}