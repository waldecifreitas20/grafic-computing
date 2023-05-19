'use strict';

import { generateRamdomId } from "../utils/utils.js";

export default class Shape {
    constructor(vertices, isCircle = false) {
        this.id = generateRamdomId();
        this.vertices = vertices;
        this.isCircle = isCircle;
    }

    rasterize() {
        throw 'Abstract method must be implement';
    }

    getVertices() {
        throw 'Abstract method must be implement';
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

    isVertex(x, y) {
        for (const point of this.vertices) {
            if (x == point.x && y == point.y) {
                return point.isVertex;
            }
        }
        return false;
    }

    getVertices() {
        let vertices = [];
        for (const point of this.vertices) {
            if (point.isVertex) {
                vertices.push(point);
            }
        }
        return vertices;
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
