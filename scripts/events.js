import Bresenham from "../algorithms/bresenham.js";
import Shape from "../models/Shape.js"
import screen from "../algorithms/screen.js";
import { buildCircle } from "../algorithms/curve.js";
import { buildEllipse } from "../algorithms/ellipse.js";
import OrderedPair from "../models/OrderedPair.js";
import DATABASE from '../data/data.js';
import transformation from '../algorithms/transformation.js';
import { generateRamdomId } from "../utils/utils.js";

const _renderOnScreen = (cardListId, shape) => {
    screen.renderShape(shape);
    screen.addCardTo(cardListId, shape);
}

const _setDeleteButton = shapeId => {
    document.getElementById(`btn-${shapeId}`).addEventListener('click', () => {
        screen.removePointCardList(shapeId);
        _refillSelects();
    });
}

const _refillSelects = () => {
    /* 
        AFTER DELETE OR ADD A SHAPE, 
        IT WILL REBUILD THE OPTIONS 
        TO ALL SELECTS
    */
    let selects = document.getElementsByClassName('transformation-select');
    let ids = DATABASE.getShapesId();

    for (const select of selects) {
        select.innerHTML = '';
        for (const id of ids) {
            let selectOption = `<option value="${id}">${id}</option>`;
            select.innerHTML += selectOption;
        }
    }
}

function enableEvents() {
    // BRESENHAM
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

        _renderOnScreen(cardListId, line);
        _setDeleteButton(line.id);
        _refillSelects();
    });

    // ADD POINT INPUT
    document.getElementById('add-edge-btn').addEventListener('click', () => {
        let edgeId = generateRamdomId();
        screen.addEdgeInput(edgeId);

        // REMOVE EDGE INPUT
        document.getElementById(`remove-edge-btn-${edgeId}`).addEventListener('click', () => {
            screen.removeEdgeInput(edgeId);
        });
    });

    // DRAW POLYLINE
    document.getElementById('build-polyline-btn').addEventListener('click', () => {
        const xInputs = document.getElementsByClassName('polyline-x-input');
        const yInputs = document.getElementsByClassName('polyline-y-input');

        let points = [];

        for (let i = 0; i < xInputs.length; i++) {
            const x = Number(xInputs[i].value);
            const y = Number(yInputs[i].value);
            points.push(new OrderedPair(x, y));
        }

        let bresenham = new Bresenham(10);
        let polyline = [];
        for (let i = 1; i < points.length; i++) {
            let pointA = points[i - 1];
            let pointB = points[i];

            polyline = polyline.concat(bresenham.buildLine(pointA, pointB));
        }
        polyline = polyline.concat(bresenham.buildLine(points[points.length - 1], points[0]));
 

        const shape = new Shape(polyline);
        const cardListId = 'list-polylines';

        DATABASE.saveShape(shape);

        _renderOnScreen(cardListId, shape);
        _setDeleteButton(shape.id);
        _refillSelects();

    });

    // CREATE CIRCLE
    document.getElementById('build-circle-btn').addEventListener('click', () => {
        let r = Number.parseInt(document.getElementById('radius-input').value);


        let points = buildCircle(r);
        let circle = new Shape(points);

        DATABASE.saveShape(circle);

        const cardListId = 'list-points-circle';
        _renderOnScreen(cardListId, circle);
        _setDeleteButton(circle.id);
        _refillSelects();
    });

    //CREATE ELLIPSE
    document.getElementById('build-ellipse-btn').addEventListener('click', () => {
        let a = Number.parseInt(document.getElementById('ellipse-a-axis-input').value);
        let b = Number.parseInt(document.getElementById('ellipse-b-axis-input').value);

        const cardListId = 'list-points-ellipse';

        let points = buildEllipse(a, b);
        let ellipse = new Shape(points);

        DATABASE.saveShape(ellipse);
        _renderOnScreen(cardListId, ellipse);
        _setDeleteButton(ellipse.id);
        _refillSelects();
    });

    // CLEAR SCREEN
    document.getElementById('clear-screen-btn').addEventListener('click', () => {
        screen.clearCanvas();
        _refillSelects();
    });

    // APPLY TRANSLATION
    document.getElementById('btn-translation').addEventListener('click', () => {
        let shapeId = document.getElementById('translation-select').value;
        let translateOnX = Number(document.getElementById('translation-x').value);
        let translateOnY = Number(document.getElementById('translation-y').value);

        let shape = DATABASE.getShapeById(shapeId);

        transformation.translate(shape, translateOnX, translateOnY);
        DATABASE.updateShape(shape);
        screen.buildCanvas();

    });
}

export default enableEvents;