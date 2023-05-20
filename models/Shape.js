import { cosOf, generateRamdomId, sinOf } from "../utils/utils.js";

export default class Shape {
    constructor(points) {
        this.id = generateRamdomId();
        this.points = points;
    }

    rasterize() {
        throw 'Abstract method must be implement';
    }


    translate(x = 0, y = 0) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].x += x;
            this.points[i].y += y;
        }
    }

    scale(factorX, factorY) {
        let center = this.getCenter();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.points.length; i++) {
            let x = this.points[i].x;
            let y = this.points[i].y;
            this.points[i].x = Math.round(factorX * x);
            this.points[i].y = Math.round(factorY * y);
        }
        this.translate(center.x, center.y);
    }

    rotation(rotation, pivot) {
        this.translate(-pivot.x, -pivot.y);
        for (let i = 0; i < this.points.length; i++) {
            let x = this.points[i].x;
            let y = this.points[i].y;

            let nx = x * cosOf(rotation) - y * sinOf(rotation);
            let ny = x * sinOf(rotation) + y * cosOf(rotation);

            this.points[i].x = nx;
            this.points[i].y = ny;
        }
        this.translate(pivot.x, pivot.y);
    }

    getCenter() {
        let averageY = (this._max_Y() + this._min_Y()) / 2;
        let averageX = (this._max_X() + this._min_X()) / 2;

        return { x: averageX, y: averageY };
    }
    getWidth() {
        let width = this._max_X() - this._min_X();
        return width < 0 ? -width : width;
    }

    getHeight() {
        let height = this._max_Y() - this._min_Y();
        return height < 0 ? -height : height;
    }

    hasPoint(x, y) {
        for (const point of this.points) {
            if (x == point.x && y == point.y) {
                return true;
            }
        }
        return false;
    }

    // PRIVATES
    _max_Y = () => {
        let major = this.points[0].y;
        for (const point of this.points) {
            if (point.y > major) {
                major = point.y;
            }
        }
        return major == 0 ? 1 : major;
    }

    _min_Y = () => {
        let minimal = this.points[0].y;
        for (const point of this.points) {
            if (point.y < minimal) {
                minimal = point.y;
            }
        }
        return minimal == 0 ? 1 : minimal;
    }

    _max_X = () => {
        let major = this.points[0].x;
        for (const point of this.points) {
            if (point.x > major) {
                major = point.x;
            }
        }
        return major;
    }

    _min_X = () => {
        let minimal = this.points[0].x;
        for (const point of this.points) {
            if (point.x < minimal) {
                minimal = point.x;
            }
        }
        return minimal;
    }

}
