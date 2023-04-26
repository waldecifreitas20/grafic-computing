class AppData {
    constructor() {
        this.shapes = [];
    }

    saveShape(shape) {
        this.shapes.push(shape);
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