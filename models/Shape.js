import { generateRamdomId } from "../utils/utils.js";

export default class Shape {
    constructor(points, isCircle = false) {
        this.id = generateRamdomId();
        this.points = points;
        this.isCircle = isCircle;
    }

    getCenter() {
        let averageY = (this._getHeighestY() + this._getLowestY()) / 2;
        let averageX = (this._getHeighestX() + this._getLowestX()) / 2;
        console.log({
            hy: this._getHeighestY(),
            ly: this._getLowestY(),
            hx: this._getHeighestX(),
            ly: this._getLowestX(),
        });
        return { x: averageX, y: averageY };
    }
    getWidth() {
        let width = this._getHeighestX() - this._getLowestX();
        return width < 0 ? -width : width;
    }
    getHeight() {
        let height = this._getHeighestY() - this._getLowestY();
        return height < 0 ? -height : height;
    }

    _getHeighestY() {
        let major = this.points[0].y;
        for (const point of this.points) {
            if (point.y > major) {
                major = point.y;
            }
        }
        return major == 0 ? 1 : major;
    }

    _getLowestY() {
        let minimal = this.points[0].y;
        for (const point of this.points) {
            if (point.y < minimal) {
                minimal = point.y;
            }
        }
        return minimal == 0 ? 1 : minimal;
    }

    _getHeighestX() {
        let major = this.points[0].x;
        for (const point of this.points) {
            if (point.x > major) {
                major = point.x;
            }
        }
        return major;
    }

    _getLowestX() {
        let minimal = this.points[0].x;
        for (const point of this.points) {
            if (point.x < minimal) {
                minimal = point.x;
            }
        }
        return minimal;
    }

}
