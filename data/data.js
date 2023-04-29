import {generateRamdomId} from '../utils/utils.js';

class AppData {
    constructor() {
        this.shapes = [];
    }

    saveShape(shape) {
        while (this._hasShape(shape.id)) {
            shape.id = generateRamdomId();
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


};

const DATABASE = new AppData();

export default DATABASE;