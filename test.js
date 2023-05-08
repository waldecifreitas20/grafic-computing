const getPoint = () => {
    return {
        x: (Math.random() * 10).toFixed(0),
        y: (Math.random() * 10).toFixed(0),
    }
}

const getShape = pointsQtd => {
    let points = [];
    for (let i = 0; i < pointsQtd; i++) {
        points.push(getPoint());
    }

    return {
        id: (Math.random() * 100000).toFixed(0),
        points,
    }
}

const scaleX = (factor, shape) => {
    let points = [];
    let b = new Bresenham();
    for (let i = 0; i < shape.points.length; i++) {
        let segment = b.buildLine(
            new OrderedPair(shape.points[i].x, shape.points[i].y),
            new OrderedPair(shape.points[i].x, shape.points[i].y),
        );
        points = points.concat(segment)

    }
    return points;
}

class OrderedPair {
    constructor(x, y, value = '-', color = 'black') {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.value = value;
        this.color = color;
    }

}

class Bresenham {
    constructor(matrixLength = 100) {
        this.matrixLength = matrixLength;
        this.matrix = this._createMatrix(matrixLength, '- ');
        this._changeX = false;
        this._changeY = false;
        this._changeXY = false;
        this.DRAWN_POINT = '1  ';
        this.EMPTY_POINT = '-  ';
        this.pointsLocation = [];
        this._reflectedPointsLocation = [];
    }

    buildLine(origin, destiny) {
        let x1 = origin.x;
        let x2 = destiny.x;
        let y1 = origin.y;
        let y2 = destiny.y;
        let axis = this._reflect(x1, x2, y1, y2);
        console.log(axis);

        x1 = axis['x1'];
        x2 = axis['x2'];
        y1 = axis['y1'];
        y2 = axis['y2'];

        let M = (y2 - y1) / (x2 - x1);
        let e = M - 0.5;
        let x = x1;
        let y = y1;

        this._reflectedPointsLocation.push(new OrderedPair(x, y, '0  '));

        while (x < x2) {
            if (e >= 0) {
                y++;
                e--;
            }

            x++;
            e += M;

            this._reflectedPointsLocation.push(new OrderedPair(x, y,));
        }
        console.log(this._reflectedPointsLocation);

       this._disreflectMatrix();

        let points = this.pointsLocation.copyWithin();
        this.pointsLocation = [];

        return points;
    }

    _createMatrix(length, point) {
        let matrix = [];

        for (let l = 0; l < length; l++) {
            matrix.push([]);
            for (let c = 0; c < length; c++) {
                matrix[l].push(point);
            }
        }

        return matrix;
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

function renderOnTerminal(matrix, points) {
    let m = matrix.copyWithin();


    for (const point of points) {
        let y = point.y;
        let x = point.x;
        m[y][x] = '1 ';
    }
    
    /* for (let y = m.length - 1; y >= 0; y--) {
        let line = '';
        for (let x = 0; x < m.length; x++) {
            line += m[y][x];
        }
        console.log(line);
    } */
}


let brsh = new Bresenham(10);

let p1 = new OrderedPair(0, 4);
let p2 = new OrderedPair(5, 2);

let points = brsh.buildLine(p1, p2);

// console.log(points);
renderOnTerminal(brsh.matrix, points);