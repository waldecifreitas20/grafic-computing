import Bresenham from "./algorithms/bresenham.js";
import Shape from "./models/Shape.js";
import screen from "./algorithms/screen.js";
import { buildCircle } from "./algorithms/curve.js";
import { buildEllipse } from "./algorithms/ellipse.js";
import OrderedPair from "./models/OrderedPair.js";
import DATABASE from './data/data.js';



let brham = new Bresenham(10);

document.getElementById('build-line-btn').addEventListener('click', () => {
    // INPUTS
    let x1 = Number.parseInt(document.getElementById('x1-axis-input').value);
    let x2 = Number.parseInt(document.getElementById('x2-axis-input').value);
    let y1 = Number.parseInt(document.getElementById('y1-axis-input').value);
    let y2 = Number.parseInt(document.getElementById('y2-axis-input').value);

    // CARDS LIST ID
    let displayId = 'list-points-bresenham';

    // ORDEREDS PAIRS
    let origin = new OrderedPair(x1, y1);
    let destiny = new OrderedPair(x2, y2);

    //LINE POINTS 
    let points = brham.buildLine(origin, destiny);

    // Shape object
    let line = new Shape(points);

    // Save line in app data
    DATABASE.saveShape(line);

    // RENDERS THE LINE ON SCREEN
    screen.renderShape(line);
    screen.addPointCardList(displayId, line);

    // DELETE SHAPE ON CLICK
    document.getElementById(`btn-${line.id}`).addEventListener('click', () => {
        screen.removePointCardList(line.id);
    });
});

document.getElementById('build-circle-btn').addEventListener('click', () => {
    let r = Number.parseInt(document.getElementById('radius-input').value);

    let points = buildCircle(r);

    screen.renderShape(points);
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

