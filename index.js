import Bresenham from "./algorithms/bresenham.js";
import Transformation from "./algorithms/transformation.js";
import screen from "./algorithms/screen.js";
import { buildCircle, buildCurve } from "./algorithms/curve.js";
import { buildEllipse } from "./algorithms/ellipse.js";
import OrderedPair from "./models/OrderedPair.js";


let brham = new Bresenham(10);

document.getElementById('build-line-btn').addEventListener('click', () => {
    // INPUTS
    let x1 = Number.parseInt(document.getElementById('x1-axis-input').value);
    let x2 = Number.parseInt(document.getElementById('x2-axis-input').value);
    let y1 = Number.parseInt(document.getElementById('y1-axis-input').value);
    let y2 = Number.parseInt(document.getElementById('y2-axis-input').value);

    // ORDEREDS PAIRS
    let origin = new OrderedPair(x1, y1);
    let destiny = new OrderedPair(x2, y2);

    //LINE POINTS 
    let points = brham.buildLine(origin, destiny);
    
    //let t = new Transformation(points);
    
    // RENDERS THE LINE ON SCREEN
    screen.renderShape(points);
    screen.addPointCardList(points);
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
    buildCanvas();
});


