import OrderedPair from "../models/OrderedPair.js";
import DATABASE from "../data/data.js";
import Shape from "../models/Shape.js";
import Polyline from "../models/Polyline.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, MAX_X, MAX_Y, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/env.js";
import colors from "../utils/colors.js";


const PIXEL_SIZE = 10;
const THICKNESS = 1.05;
let canvas;

function buildCanvas() {
    canvas = document.querySelector('canvas');

    canvas.setAttribute('height', CANVAS_HEIGHT.toString());
    canvas.setAttribute('width', CANVAS_WIDTH.toString());

    for (let y = 0; y <= MAX_Y; y++) {
        for (let x = 0; x <= MAX_X; x++) {
            _renderBackground(new OrderedPair(x, y), 'white');
        }
    }

    buildScreen();

    for (let shape of DATABASE.shapes) {
        renderShape(shape);
    }

}

function buildScreen() {
    let dimensions = [
        new OrderedPair(-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2),
        new OrderedPair(-SCREEN_WIDTH / 2, -SCREEN_WIDTH / 2),
        new OrderedPair(SCREEN_WIDTH / 2, -SCREEN_WIDTH / 2),
        new OrderedPair(SCREEN_WIDTH / 2, SCREEN_WIDTH / 2),
    ];

    let screen = new Polyline(dimensions, colors.RED);
    let points = screen.rasterize();
    for (const point of points) {
        _renderPoint(point, true);
    }
}

function clearCanvas() {
    DATABASE.clear();
    _clearCardsLists();
    buildCanvas();
}

function renderShape(shape) {
    let points = shape.rasterize();
    for (const point of points) {
        _renderPoint(point);
    }
}

function _renderPoint(orderedPoint, forceRender=false) {
    let x = (MAX_X / 2 + Math.round(orderedPoint.x)) * PIXEL_SIZE * THICKNESS;
    let y = (MAX_Y / 2 - Math.round(orderedPoint.y)) * PIXEL_SIZE * THICKNESS;

    if (isInside(orderedPoint.x, orderedPoint.y) || forceRender) {
        let brush = canvas.getContext('2d');
        brush.fillStyle = orderedPoint.color;
        brush.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
    }
}

function isInside(x, y) {
    let fitsHeight = y < SCREEN_HEIGHT/2 && y > -SCREEN_HEIGHT/2;
    let fitsWidth = x < SCREEN_WIDTH/2 && x > -SCREEN_WIDTH/2;
    
    return fitsHeight && fitsWidth;
}

function addCardTo(listId, shape) {
    let cardList = document.getElementById(listId);

    let card = document.createElement('div');
    card.setAttribute('class', 'card-item');
    card.setAttribute('id', `card-${shape.id}`);

    // Create card content
    let html = '';
    html += `<div class="points-list">`;
    html += `<p class="shape-id"><strong>Id:</strong> ${shape.id}`;
    html += `<button id="btn-${shape.id}">Excluir Desenho</button></p>`;  // delete's button
    html += `<div class="divider"></div>`;

    /* let points = shape.rasterize();
    for (let i = 0; i < shape.points.length; i++) {
        html += `p${i + 1}(${shape.points[i].x}, ${shape.points[i].y}); `;
    } */
    html += '</div>';

    card.innerHTML = html;
    cardList.appendChild(card);
}

function removePointCardList(shapeId) {
    DATABASE.deleteShape(shapeId);
    let card = document.getElementById(`card-${shapeId}`);
    card.remove();
    buildCanvas();
}

function addVertexInput(vertexId) {
    let vertexsBlock = document.getElementById('vertexs-block');
    let inputBlock = document.createElement('div');
    inputBlock.innerHTML = `
            <div id="vertex-${vertexId}" class="polyline-input-block">
                <label>Vértice (x,y)</label>
                <input type="number" value="0" min="0" max="42" class="polyline-x-input">
                <input type="number" value="0" min="0" max="28" class="polyline-y-input">
                <input type="button" value="Remover" id="remove-vertex-btn-${vertexId}">
            </div>
            `;
    vertexsBlock.appendChild(inputBlock)
}

function removeVertexInput(vertexId) {
    document.getElementById(`vertex-${vertexId}`).remove();
}

// PRIVATES

function _setCenterAim(color) {
    DATABASE.saveShape(new Shape([new OrderedPair(0, 0, color)]));
}

function _renderBackground(orderedPoint, color = 'black') {
    let x = orderedPoint.x * PIXEL_SIZE * THICKNESS;
    let y = orderedPoint.y * PIXEL_SIZE * THICKNESS;
    let brush = canvas.getContext('2d');

    brush.fillStyle = color;
    brush.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
}

function _clearCardsLists() {
    let lists = document.getElementsByClassName('card-item');
    let length = lists.length;

    for (let i = length - 1; i >= 0; i--) {
        lists[i].remove();
    }
}

export default {
    renderShape,
    buildCanvas,
    clearCanvas,
    addCardTo,
    removePointCardList,
    addVertexInput,
    removeVertexInput,
}
