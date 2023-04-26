import Bresenham from "./algorithms/bresenham.js";
import Shape from "./models/Shape.js"
import screen from "./algorithms/screen.js";
import { buildCircle } from "./algorithms/curve.js";
import { buildEllipse } from "./algorithms/ellipse.js";
import OrderedPair from "./models/OrderedPair.js";
import DATABASE from './data/data.js';

const renderOnScreen = (cardListId, shape) => {
    screen.renderShape(shape);
    screen.addPointCardList(cardListId, shape);
}

const setDeleteButton = shapeId => {
    document.getElementById(`btn-${shapeId}`).addEventListener('click', () => {
        screen.removePointCardList(shapeId);
    });
}

document.getElementById('build-line-btn').addEventListener('click', () => {
    // INPUTS
    let x1 = Number.parseInt(document.getElementById('x1-axis-input').value);
    let x2 = Number.parseInt(document.getElementById('x2-axis-input').value);
    let y1 = Number.parseInt(document.getElementById('y1-axis-input').value);
    let y2 = Number.parseInt(document.getElementById('y2-axis-input').value);

    let cardListId = 'list-points-bresenham';

    // ORDEREDS PAIRS
    let origin = new OrderedPair(x1, y1);
    let destiny = new OrderedPair(x2, y2);

    //GET LINE POINTS 
    let bresenham = new Bresenham(10);
    let points = bresenham.buildLine(origin, destiny);

    let line = new Shape(points);

    DATABASE.saveShape(line);

    renderOnScreen(cardListId, line);
    setDeleteButton(line.id);
    /* // RENDERS THE LINE ON SCREEN
    screen.renderShape(line);
    screen.addPointCardList(cardListId, line);
 
    // DELETE LINE ON CLICK
    document.getElementById(`btn-${line.id}`).addEventListener('click', () => {
        screen.removePointCardList(line.id);
    }); */
});

document.getElementById('build-circle-btn').addEventListener('click', () => {
    let r = Number.parseInt(document.getElementById('radius-input').value);

    let points = buildCircle(r);

    let line = new Shape(points);
    DATABASE.saveShape(line);

    screen.renderShape(line);
});


document.getElementById('build-ellipse-btn').addEventListener('click', () => {
    let a = Number.parseInt(document.getElementById('ellipse-a-axis-input').value);
    let b = Number.parseInt(document.getElementById('ellipse-b-axis-input').value);


    let points = buildEllipse(a, b);

    screen.renderShape(points);
});

document.getElementById('clear-screen-btn').addEventListener('click', () => {
    screen.clearCanvas();
});

