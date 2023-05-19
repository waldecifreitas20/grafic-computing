'use strict';

import { generateRamdomId } from "../utils/utils.js";

export default class Shape {
    constructor(vertices) {
        this.id = generateRamdomId();
        this.vertices = vertices;

    }

    rasterize() {
        throw 'Abstract method must be implement';
    }


    translate(x = 0, y = 0) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].x += x;
            this.vertices[i].y += y;
        }
    }

    scale(factorX, factorY) {
        let center = this.getCenter();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.vertices.length; i++) {
            let x = this.vertices[i].x;
            let y = this.vertices[i].y;
            this.vertices[i].x = Math.round(factorX * x);
            this.vertices[i].y = Math.round(factorY * y);
        }
        this.translate(center.x, center.y);
    }

    rotation(rotation, pivot) {
        for (let i = 0; i < this.vertices.length; i++) {
            let x = this.vertices[i].x;
            let y = this.vertices[i].y;

            let nx = x * cosOf(rotation) - y * sinOf(rotation);
            let ny = x * sinOf(rotation) + y * cosOf(rotation);

            this.vertices[i].x = Math.floor(nx);
            this.vertices[i].y = Math.floor(ny);
        }
    }



    getCenter() {
        let averageY = (this._getHeighestY() + this._getLowestY()) / 2;
        let averageX = (this._getHeighestX() + this._getLowestX()) / 2;

        return { x: Math.round(averageX), y: Math.round(averageY) };
    }
    getWidth() {
        let width = this._getHeighestX() - this._getLowestX();
        return width < 0 ? -width : width;
    }

    getHeight() {
        let height = this._getHeighestY() - this._getLowestY();
        return height < 0 ? -height : height;
    }

    hasPoint(x, y) {
        for (const point of this.vertices) {
            if (x == point.x && y == point.y) {
                return true;
            }
        }
        return false;
    }

    _getHeighestY() {
        let major = this.vertices[0].y;
        for (const point of this.vertices) {
            if (point.y > major) {
                major = point.y;
            }
        }
        return major == 0 ? 1 : major;
    }

    _getLowestY() {
        let minimal = this.vertices[0].y;
        for (const point of this.vertices) {
            if (point.y < minimal) {
                minimal = point.y;
            }
        }
        return minimal == 0 ? 1 : minimal;
    }

    _getHeighestX() {
        let major = this.vertices[0].x;
        for (const point of this.vertices) {
            if (point.x > major) {
                major = point.x;
            }
        }
        return major;
    }

    _getLowestX() {
        let minimal = this.vertices[0].x;
        for (const point of this.vertices) {
            if (point.x < minimal) {
                minimal = point.x;
            }
        }
        return minimal;
    }

}
