import Bresenham from "./algorithms/bresenham.js";
import Shape from "./models/Shape.js"
import screen from "./algorithms/screen.js";
import { buildCircle } from "./algorithms/curve.js";
import { buildEllipse } from "./algorithms/ellipse.js";
import OrderedPair from "./models/OrderedPair.js";
import DATABASE from './data/data.js';

// BUILD THE GRID ON START APLICATION
screen.buildCanvas();


const renderOnScreen = (cardListId, shape) => {
    screen.renderShape(shape);
    screen.addCardTo(cardListId, shape);
}

const setDeleteButton = shapeId => {
    document.getElementById(`btn-${shapeId}`).addEventListener('click', () => {
        screen.removePointCardList(shapeId);
    });
}

document.getElementById('build-line-btn').addEventListener('click', () => {
    // INPUTS
    const x1 = Number.parseInt(document.getElementById('x1-axis-input').value);
    const x2 = Number.parseInt(document.getElementById('x2-axis-input').value);
    const y1 = Number.parseInt(document.getElementById('y1-axis-input').value);
    const y2 = Number.parseInt(document.getElementById('y2-axis-input').value);

    const cardListId = 'list-points-bresenham';

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
});

document.getElementById('build-circle-btn').addEventListener('click', () => {
    let r = Number.parseInt(document.getElementById('radius-input').value);

    
    let points = buildCircle(r);
    let circle = new Shape(points);
    
    DATABASE.saveShape(circle);
    
    const cardListId = 'list-points-circle';
    renderOnScreen(cardListId, circle);
    setDeleteButton(circle.id);
});


document.getElementById('build-ellipse-btn').addEventListener('click', () => {
    let a = Number.parseInt(document.getElementById('ellipse-a-axis-input').value);
    let b = Number.parseInt(document.getElementById('ellipse-b-axis-input').value);

    const cardListId = 'list-points-ellipse';

    let points = buildEllipse(a, b);
    let ellipse = new Shape(points);
    
    DATABASE.saveShape(ellipse);
    renderOnScreen(cardListId, ellipse);
    setDeleteButton(ellipse.id);
});

document.getElementById('clear-screen-btn').addEventListener('click', () => {
    screen.clearCanvas();
});

