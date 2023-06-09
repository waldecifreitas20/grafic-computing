import screen from "../algorithms/screen.js";
import OrderedPair from "../models/OrderedPair.js";
import DATABASE from '../data/data.js';
import { generateRamdomId } from "../utils/utils.js";
import { MAX_X, MAX_Y, CANVAS_HEIGHT, CANVAS_WIDTH } from "../utils/env.js";
import Polyline from "../models/Polyline.js";
import Line from "../models/Line.js";
import Circle from "../models/Circle.js";
import Curve from "../models/Curve.js";
import fill from "../algorithms/fill.js";
import FilledShape from "../models/FilledShape.js";

function enableEvents() {
    // BUILD LINE
    document.getElementById('build-line-btn').addEventListener('click', () => {
        // INPUTS
        const x1 = Number.parseInt(document.getElementById('x1-axis-input').value);
        const x2 = Number.parseInt(document.getElementById('x2-axis-input').value);
        const y1 = Number.parseInt(document.getElementById('y1-axis-input').value);
        const y2 = Number.parseInt(document.getElementById('y2-axis-input').value);

        // ORDEREDS PAIRS
        let origin = new OrderedPair(x1, y1);
        let destiny = new OrderedPair(x2, y2,);
        let line = new Line(origin, destiny);

        DATABASE.saveShape(line);

        const cardListId = 'list-points-bresenham';

        screen.renderShape(line);
        screen.addCardTo(cardListId, line);
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

        const polyline = new Polyline(points);

        DATABASE.saveShape(polyline);

        const cardListId = 'list-polylines';
        screen.renderShape(polyline);
        screen.addCardTo(cardListId, polyline);
        _setDeleteButton(polyline.id);
        _refillSelects();

    });

    // CREATE CIRCLE
    document.getElementById('build-circle-btn').addEventListener('click', () => {
        const radius = Number.parseInt(document.getElementById('radius-input').value);
        const y = Number(document.getElementById('circle-y-axis-input').value);
        const x = Number(document.getElementById('circle-x-axis-input').value);

        let circle = new Circle(radius, x, y);

        DATABASE.saveShape(circle);

        const cardListId = 'list-points-circle';

        screen.renderShape(circle);
        screen.addCardTo(cardListId, circle);
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

        let curve = new Curve(p0, pc, p1, smoothness);
        DATABASE.saveShape(curve);

        const cardListId = 'list-points-curve';
        screen.renderShape(curve);
        screen.addCardTo(cardListId, curve);
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

        shape.translate(translateOnX, translateOnY);
        DATABASE.updateShape(shape);
        screen.buildCanvas();
    });

    // APPLY SCALE
    document.getElementById('btn-scale').addEventListener('click', () => {
        let shapeId = document.getElementById('scale-select').value;
        let scaleX = Number(document.getElementById('scale-factor-x').value);
        let scaleY = Number(document.getElementById('scale-factor-y').value);

        let shape = DATABASE.getShapeById(shapeId);

        if (!(shape instanceof Circle)) {
            shape.scale(scaleX, scaleY);
        } else {
            if (scaleX != 1) {
                shape.scale(scaleX);
            } else {
                shape.scale(scaleY);
            }
        }

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

        shape.rotation(angle, pivot);

        DATABASE.updateShape(shape);

        screen.buildCanvas();

    });

    // SHOW ARBITRARIE PIVOT INPUT
    document.getElementById('rotation-pivot-select').addEventListener('change', () => {
        let type = document.getElementById('rotation-pivot-select').value;
        const tagId = 'arbitrarie-pivot-inputs';

        _toggleHtmlHiding(() => type != 'random', tagId);
    });

    let enableFill = false;
    // FILL
    document.getElementById("screen").addEventListener('click', evt => {
        if (enableFill) {
            const ERR_X = 1.0111; // ERROR RATE AT X AXIS
            const ERR_Y = 1.0161; // ERROR RATE AT Y AXIS

            // CALCULE VIRTUAL POSITION ON CANVAS
            const PIXEL_WIDTH = CANVAS_WIDTH / MAX_X;
            const canvasPositionAtX = evt.offsetX;
            const x = canvasPositionAtX * ERR_X / PIXEL_WIDTH;

            const PIXEL_HEIGHT = CANVAS_HEIGHT / MAX_Y;
            const canvasPositionAtY = evt.offsetY;
            const y = canvasPositionAtY * ERR_Y / PIXEL_HEIGHT;

            let startPoint = new OrderedPair(x - MAX_X / 2, MAX_Y / 2 - y);

            let points = fill.byScan(startPoint.x, startPoint.y);
            let shapeColor = document.getElementById('fill-select').value
            let shape = new FilledShape(points, shapeColor);

            screen.renderShape(shape);
            DATABASE.saveShape(shape);

            const cardListId = 'list-points-fill';
            screen.addCardTo(cardListId, shape);
            _setDeleteButton(shape.id);
            _refillSelects();

            enableFill = false;
            _toggleHtmlHiding(() => true, 'fill-info');

        }
    });

    // ENABLE FILLING
    document.getElementById('btn-fill').addEventListener('click', () => {
        enableFill = true;
        _toggleHtmlHiding(() => false, 'fill-info');
    });

}

// CREATES A DELETE BUTTON FOR A JUST CREATED LIST OF CARDS
const _setDeleteButton = shapeId => {
    document.getElementById(`btn-${shapeId}`).addEventListener('click', () => {
        screen.removePointCardList(shapeId);

        _refillSelects();
    });
}

// FILL THE SELECTS OF SHAPES CONTROLLERS 
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

const _toggleHtmlHiding = (ishiding, tagId) => {
    const htmlTag = document.getElementById(tagId);
    if (ishiding()) {
        htmlTag.hidden = true;
    } else {
        htmlTag.hidden = false;
    }
}

export default enableEvents;