import OrderedPair from "../models/OrderedPair.js";

const MAX_X = 84;
const MAX_Y = 54;
const PIXEL_SIZE = 10;
let canvas;
buildCanvas();

function buildCanvas() {
    const CANVAS_HEIGHT = 577;
    const CANVAS_WIDTH = 892;

    canvas = document.querySelector('canvas');

    canvas.setAttribute('height', CANVAS_HEIGHT.toString());
    canvas.setAttribute('width', CANVAS_WIDTH.toString());

    for (let y = 0; y <= MAX_Y; y++) {
        for (let x = 0; x <= MAX_X; x++) {
            renderBackground(new OrderedPair(x, y), 'white');
        }
    }

}

function renderPoint(orderedPoint, color = 'black') {
    let x = (MAX_X / 2 + orderedPoint.x) * PIXEL_SIZE * 1.05;
    let y = (MAX_Y / 2 - orderedPoint.y) * PIXEL_SIZE * 1.05;
    let brush = canvas.getContext('2d');

    brush.fillStyle = color;
    brush.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
}


function renderBackground(orderedPoint, color = 'black') {
    let x = orderedPoint.x * PIXEL_SIZE * 1.05;
    let y = orderedPoint.y * PIXEL_SIZE * 1.05;
    let brush = canvas.getContext('2d');

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
