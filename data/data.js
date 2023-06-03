class AppData {
    constructor() {
        this.shapes = [];
        this.points = [];
    }

    saveShape(shape) {
        if (this._hasShape(shape.id)) {
            console.log('Shape is already saved');
            return false;
        }
        this.shapes.push(shape);
        this.points.push(...shape.rasterize());
    }

    updatePoints() {
        let points = [];
        for (const shape of this.shapes) {
            points.push(...shape.rasterize());
        }
        this.points = points;
    }

    hasPoint(x, y) {
        for (const point of this.points) {
            if (point.x == x && point.y == y) {
                return true;
            }
        }
        return false;
    }

    _hasShape(shapeId) {
        for (const shape of this.shapes) {
            if (shape.id == shapeId) {
                return true;
            }
        }
        return false;
    }


    deleteShape(shapeId) {
        for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].id == shapeId) {
                this.shapes.splice(i, 1);
                this.updatePoints();
            }
        }
    }

    clear() {
        this.shapes = [];
        this.points = [];
    }

    getShapesId() {
        let ids = [];
        for (const shape of this.shapes) {
            ids.push(shape.id);
        }
        return ids;
    }

    getShapeById(id) {
        for (const shape of this.shapes) {
            if (id == shape.id) {
                return shape;
            }
        }
        return false;
    }

    updateShape(shape) 
        for (let i = 0; i < this.shapes.length; i++) {
            if (shape.id == this.shapes[i].id) {
                this.shapes[i] = shape;
                this.updatePoints();
                return true;
            }
        }
        return false;
    }
};

const DATABASE = new AppData();

export default DATABASE;