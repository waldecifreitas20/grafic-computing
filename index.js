import Bresenham from "./algorithms/bresenham.js";
import { renderLine, buildCanvas } from "./algorithms/screen.js";
import OrderedPair from "./models/OrderedPair.js";
/* import { renderOnTerminal } from "./utils/utils.js"; */

let brham = new Bresenham(10);
/* 
    MAX X = 15;
    MAX Y = 26;
*/

document.getElementById('build-line-btn').addEventListener('click', () => {
    let x1 = Number.parseInt(document.getElementById('x1-axis-input').value);
    let x2 = Number.parseInt(document.getElementById('x2-axis-input').value);
    let y1 = Number.parseInt(document.getElementById('y1-axis-input').value);
    let y2 = Number.parseInt(document.getElementById('y2-axis-input').value);


    let origin = new OrderedPair(x1, y1);
    let destiny = new OrderedPair(x2, y2);

    let points = brham.buildLine(origin, destiny);

    renderLine(points);
});

document.getElementById('clear-screen-btn').addEventListener('click', () => {
    buildCanvas();
});
