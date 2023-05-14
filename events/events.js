import Bresenham from "../algorithms/bresenham.js";
import Shape from "../models/Shape.js"
import screen from "../algorithms/screen.js";
import { buildCircle } from "../algorithms/circle.js";
import OrderedPair from "../models/OrderedPair.js";
import DATABASE from '../data/data.js';
import transformation from '../algorithms/transformation.js';
import { generateRamdomId } from "../utils/utils.js";
import buildCurve from "../algorithms/curve.js";

function enableEvents() {
    let bresenham = new Bresenham();
    let isfilling = false;

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
        let points = bresenham.buildLine(origin, destiny);

        let line = new Shape(points);

        DATABASE.saveShape(line);

        _renderOnScreen(cardListId, line);
        _setDeleteButton(line.id);
        _refillSelects();
    });

    // ADD VERTEX INPUT
    document.getElementById('add-vertex-btn').addEventListener('click', () => {
        let vertexId = generateRamdomId();
        screen.addVertexInput(vertexId);

        // REMOVE VERTEX INPUT
        document.getElementById(`remove-vertex-btn-${vertexId}`).addEventListener('click', () => {
            screen.removeVertexInput(vertexId);
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
        const radius = Number.parseInt(document.getElementById('radius-input').value);
        const y = Number(document.getElementById('circle-y-axis-input').value);
        const x = Number(document.getElementById('circle-x-axis-input').value);

        let points = buildCircle(radius);
        let circle = new Shape(points, true);
        transformation.translate(circle, x, y);

        DATABASE.saveShape(circle);

        const cardListId = 'list-points-circle';
        _renderOnScreen(cardListId, circle);
        _setDeleteButton(circle.id);
        _refillSelects();
    });

    // CREATE CURVE
    document.getElementById('build-curve-btn').addEventListener('click', () => {
        const smoothness = Number.parseInt(document.getElementById('curve-smoothness-input').value) + 1;

        let p0 = {
            x: Number(document.getElementById('curve-ox-axis-input').value),
            y: Number(document.getElementById('curve-oy-axis-input').value),
        };
        let pc = {
            x: Number(document.getElementById('curve-c1x-axis-input').value),
            y: Number(document.getElementById('curve-c1y-axis-input').value),

        };
        let p1 = {
            x: Number(document.getElementById('curve-fx-axis-input').value),
            y: Number(document.getElementById('curve-fy-axis-input').value),

        };

        let interpolations = buildCurve(p0, pc, p1, smoothness);

        let points = _multipleBresenham(interpolations);

        let curve = new Shape(points);
        DATABASE.saveShape(curve);

        const cardListId = 'list-points-curve';
        _renderOnScreen(cardListId, curve);
        _setDeleteButton(curve.id);
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

    // APPLY SCALE
    document.getElementById('btn-scale').addEventListener('click', () => {
        let shapeId = document.getElementById('scale-select').value;
        let scaleXFactor = Number(document.getElementById('scale-factor-x').value);
        let scaleYFactor = Number(document.getElementById('scale-factor-y').value);

        let shape = DATABASE.getShapeById(shapeId);

        // SHAPE CENTER
        let center = shape.getCenter();
        // SET SHAPE TO CENTER
        transformation.translate(shape, -center.x, -center.y);
        // APPLY SCALE

        if (!shape.isCircle) {
            transformation.scale(shape, scaleXFactor, scaleYFactor);
            shape.points = _multipleBresenham(shape.points);
        } else {
            let radius = (shape.getWidth() / 2) * scaleXFactor;
            shape.points = buildCircle(radius);
        }
        // let l1 = bresenham.buildLine(shape.points[0], shape.points[1]);
        //  shape.points = l1.concat(shape.points);
        // SET SHAPE TO ORIGINAL POSITION
        transformation.translate(shape, center.x, center.y);

        DATABASE.updateShape(shape);
        screen.buildCanvas();

    });

    // APPLY ROTATION
    document.getElementById('btn-rotation').addEventListener('click', () => {
        let shapeId = document.getElementById('rotation-select').value;
        let angle = Number(document.getElementById('rotation-angle').value);
        let type = document.getElementById('rotation-pivot-select').value;

        let shape = DATABASE.getShapeById(shapeId);

        let pivot;
        if (type == 'center') {
            pivot = shape.getCenter();
        } else if (type == 'origin') {
            pivot = { x: 0, y: 0 };
        } else {
            let x = Number(document.getElementById('rotation-x').value);
            let y = Number(document.getElementById('rotation-y').value);
            pivot = { x, y };
        }
        console.log(pivot);
        transformation.translate(shape, -pivot.x, -pivot.y);
        transformation.rotation(shape, angle);
        transformation.translate(shape, pivot.x, pivot.y);
        DATABASE.updateShape(shape);
        screen.buildCanvas();

    });

    // SHOW ARBITRARIE PIVOT INPUT
    document.getElementById('rotation-pivot-select').addEventListener('change', () => {
        let type = document.getElementById('rotation-pivot-select').value;
        let inputBlock = document.getElementById('arbitrarie-pivot-inputs');
        if (type == 'random') {
            inputBlock.setAttribute('class', 'showed');
        } else {
            inputBlock.setAttribute('class', 'hidden');
        }
    });

    // FILL
    document.getElementById("screen").addEventListener('click', evt => {
        const MAX_X = 84;
        const MAX_Y = 54;
        const ERR_X = 1.0111;
        const ERR_Y = 1.0161;

        const canvas = document.querySelector('canvas');

        const width = canvas.getAttribute('width');
        const PIXEL_X = width / MAX_X;
        const positionX = evt.offsetX;
        const x = positionX * ERR_X / PIXEL_X;

        const height = canvas.getAttribute('height');
        const PIXEL_Y = height / MAX_Y;
        const positionY = evt.offsetY;

        const y = positionY * ERR_Y / PIXEL_Y;

        /* const shapeId = document.getElementById('fill-select').value;
        let shape = DATABASE.getShapeById(shapeId); */

        let startPoint = new OrderedPair(x - MAX_X / 2, MAX_Y / 2 - y);

        

       /*  screen.renderShape(shape);
        DATABASE.saveShape(shape); */
        let fillInfo = document.getElementById('fill-info');
        fillInfo.setAttribute('class', 'hidden');
    });

    // ENABLE FILLING
    for (let i = 0; i < 2; i++) {
        document.getElementsByClassName('btn-fill')[i]
            .addEventListener('click', () => {

                let fillInfo = document.getElementById('fill-info');
                fillInfo.setAttribute('class', 'showed');
            });
    }
}

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
    let selects = document.getElementsByClassName('shape-control-select');
    let ids = DATABASE.getShapesId();

    for (const select of selects) {
        select.innerHTML = '';
        for (const id of ids) {
            let selectOption = `<option value="${id}">${id}</option>`;
            select.innerHTML += selectOption;
        }
    }
}

const _multipleBresenham = segments => {
    let bresenham = new Bresenham();
    let points = [];
    for (let i = 1; i < segments.length; i++) {
        let line = bresenham.buildLine(segments[i - 1], segments[i]);
        points = points.concat(line);
    }

    return points;
}


export default enableEvents;