import OrderedPair from "../models/OrderedPair.js";

const MAX_X = 42;
const MAX_Y = 26;
const PIXEL_SIZE = 20;
let canvas;
buildCanvas();

function buildCanvas() {
    const CANVAS_HEIGHT = 566;
    const CANVAS_WIDTH = 902;

    canvas = document.querySelector('canvas');

    canvas.setAttribute('height', CANVAS_HEIGHT.toString());
    canvas.setAttribute('width', CANVAS_WIDTH.toString());

    for (let y = 0; y <= MAX_Y; y++) {
        for (let x = 0; x <= MAX_X; x++) {
            renderPoint(new OrderedPair(x, y), 'white');
        }
    }

}

function renderPoint(orderedPoint, color = 'black') {
    let x = orderedPoint.x * PIXEL_SIZE * 1.05;
    let y = (MAX_Y - orderedPoint.y) * PIXEL_SIZE * 1.05;
    let brush = canvas.getContext('2d');
    console.log(MAX_X - orderedPoint.x);

    brush.fillStyle = color;
    brush.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
}


function renderLine(points) {
    for (const point of points) {
        renderPoint(point);
    }
}




export {
    renderLine,
    buildCanvas,
    canvas,
}
