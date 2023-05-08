import Bresenham from "../algorithms/bresenham.js";
import Shape from "../models/Shape.js"
import screen from "../algorithms/screen.js";
import { buildCircle } from "../algorithms/circle.js";
import OrderedPair from "../models/OrderedPair.js";
import DATABASE from '../data/data.js';
import transformation from '../algorithms/transformation.js';
import { generateRamdomId } from "../utils/utils.js";
import buildCurve from "../algorithms/curve.js";

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
    let bresenham = new Bresenham();
    
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
        let circle = new Shape(points);
        transformation.translate(circle, x, y);

        DATABASE.saveShape(circle);

        const cardListId = 'list-points-circle';
        _renderOnScreen(cardListId, circle);
        _setDeleteButton(circle.id);
        _refillSelects();
    });

    // CREATE CURVA
    document.getElementById('build-curve-btn').addEventListener('click', () => {
        const smoothness = Number.parseInt(document.getElementById('curve-smoothness-input').value) +1;


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
      /*   
        let p0 = {x: 0,y:0};
        let pc = {x: 0,y:-10};
        let p1 = {x: 10,y:0}; */

        let interpolations = buildCurve(p0, pc, p1, smoothness);
        
       /*  let l1 = bresenham.buildLine(interpolations[0],interpolations[1]);

        let l2 = bresenham.buildLine(interpolations[1],interpolations[2]);
        let l3 = bresenham.buildLine(interpolations[2],interpolations[3]); 
        let l4 = bresenham.buildLine(interpolations[3],interpolations[4]); */
       
       
    //    console.log(interpolations);
        
        let points = []
        for (let i = 0; i < smoothness; i++) {
            let line = bresenham.buildLine(interpolations[i],interpolations[i+1]);
            points = points.concat(line);
            
            
        }
        // let points = [].concat([...l1, ...l2,...l3,...l4]);

        
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
}

export default enableEvents;