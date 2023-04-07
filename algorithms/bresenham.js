import { createMatrix } from "../utils/utils.js";
import OrderedPair from "../models/OrderedPair.js";

export default class Bresenham {

    constructor(matrixLength) {
        this.matrixLength = matrixLength;
        this.matrix = createMatrix(matrixLength, '- ');
        this._changeX = false;
        this._changeY = false;
        this._changeXY = false;
        this.DRAWN_POINT = '1  ';
        this.EMPTY_POINT = '-  ';
        this.pointsLocation = [];
        this._reflectedPointsLocation = [];
    }

    _reflect(x1, x2, y1, y2) {
        let m = (y2 - y1) / (x2 - x1);

        if (m > 1 || m < -1) {
            var aux1 = x1;
            x1 = y1;
            y1 = aux1;
            var aux2 = x2;
            x2 = y2;
            y2 = aux2;
            this._changeXY = true;
        }

        if (x1 > x2) {
            var nx1 = this.matrix.length - 1 - x1;
            var nx2 = this.matrix.length - 1 - x2;
            x1 = nx1;
            x2 = nx2;
            this._changeX = true;
        }

        if (y1 > y2) {
            if (y2 < 0) {
                y2 *= -1;
            }
            if (y1 < 0) {
                y1 *= -1;
            }
            y1 = this.matrix.length - 1 - y1;
            y2 = this.matrix.length - 1 - y2;
            this._changeY = true;
        }

        return {
            'x1': x1,
            'x2': x2,
            'y1': y1,
            'y2': y2,
        };
    }

    buildLine(origin, destiny) {
        let x1 = origin.x;
        let x2 = destiny.x;
        let y1 = origin.y;
        let y2 = destiny.y;
        let axis = this._reflect(x1, x2, y1, y2);

        x1 = axis['x1'];
        x2 = axis['x2'];
        y1 = axis['y1'];
        y2 = axis['y2'];

        let M = (y2 - y1) / (x2 - x1);
        let e = M - 0.5;
        let x = x1;
        let y = y1;

        this._reflectedPointsLocation.push(new OrderedPair(x, y,'0  '));

        while (x < x2) {
            if (e >= 0) {
                y++;
                e--;
            }

            x++;
            e += M;

            this._reflectedPointsLocation.push(new OrderedPair(x, y,));
        }
        this._disreflectMatrix();
        
        let points = this.pointsLocation.copyWithin();
        this.pointsLocation = [];

        return points;
    }

   

    _disreflectMatrix() {
        for (var point of this._reflectedPointsLocation) {
            let x = point.x;
            let y = point.y;
            let value = point.value;
            
            if (this._changeY) {
                y = this.matrix.length - 1 - y;
            }
            if (this._changeX) {
                var nx1 = this.matrix.length - 1 - x;
                x = nx1;
            }
            if (this._changeXY) {
                var aux = y;
                y = x;
                x = aux;
            }
            
            
            this.pointsLocation.push(new OrderedPair(x, y));
        }

        // Reset Variables
        this._reflectedPointsLocation = [];
        this._changeY = false;
        this._changeX = false;
        this._changeXY = false;
    }
}