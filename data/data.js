import { generateRamdomId } from '../utils/utils.js';

class AppData {
    constructor() {
        this.shapes = [];
    }

    saveShape(shape) {
        if (this._hasShape(shape.id)) {
            console.log('Shape is already saved');
            return false;
        }
        this.shapes.push(shape);
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
            }
        }
    }

    clear() {
        this.shapes = [];
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

    updateShape(shape) {
        for (let i = 0; i < this.shapes.length; i++) {
            if (shape.id == this.shapes[i].id) {
                this.shapes[i] = shape;
                return true;
            }
        }
        return false;
    }
};

const DATABASE = new AppData();

export default DATABASE;