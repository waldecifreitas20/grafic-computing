import OrderedPair from "../models/OrderedPair.js";
import DATABASE from "../data/data.js";

const MAX_X = 84; // MAX QUANTITY OF PIXELS ALONG AXYS X
const MAX_Y = 54; // MAX QUANTITY OF PIXELS ALONG AXYS X
const PIXEL_SIZE = 10;
let canvas;

function buildCanvas() {
    const CANVAS_HEIGHT = 577;
    const CANVAS_WIDTH = 892;

    canvas = document.querySelector('canvas');

    canvas.setAttribute('height', CANVAS_HEIGHT.toString());
    canvas.setAttribute('width', CANVAS_WIDTH.toString());

    for (let y = 0; y <= MAX_Y; y++) {
        for (let x = 0; x <= MAX_X; x++) {
            _renderBackground(new OrderedPair(x, y), 'white');
        }
    }

    for (let shape of DATABASE.shapes) {
        renderShape(shape);
    }

}

function clearCanvas() {
    DATABASE.clear();
    _clearCardsLists();
    buildCanvas();
}

function renderShape(shape) {
    for (const point of shape.points) {
        _renderPoint(point);
    }
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

    for (let i = 0; i < shape.points.length; i++) {
        html += `p${i + 1}(${shape.points[i].x}, ${shape.points[i].y}); `;
    }
    html += '</div>';

    card.innerHTML = html;
    cardList.appendChild(card);
}

function removePointCardList(shapeId) {
    DATABASE.deleteShape(shapeId);
    let card = document.getElementById(`card-${shapeId}`);
    card.remove();
    buildCanvas();
    console.log(DATABASE.getShapesId());
}

function addEdgeInput(edgeId) {
    let edgesBlock = document.getElementById('edges-block');
    let inputBlock = document.createElement('div');
    inputBlock.innerHTML = `
            <div id="edge-${edgeId}" class="polyline-input-block">
                <label>Aresta (x,y)</label>
                <input type="number" value="0" min="0" max="42" class="polyline-x-input">
                <input type="number" value="0" min="0" max="28" class="polyline-y-input">
                <input type="button" value="Remover" id="remove-edge-btn-${edgeId}">
            </div>
            `;
    edgesBlock.appendChild(inputBlock)
}

function removeEdgeInput(edgeId) {
    document.getElementById(`edge-${edgeId}`).remove();
}

// PRIVATES
function _renderPoint(orderedPoint, color = 'black') {
    let x = (MAX_X / 2 + orderedPoint.x) * PIXEL_SIZE * 1.05;
    let y = (MAX_Y / 2 - orderedPoint.y) * PIXEL_SIZE * 1.05;
    let brush = canvas.getContext('2d');

    brush.fillStyle = color;
    brush.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
}

function _renderBackground(orderedPoint, color = 'black') {
    let x = orderedPoint.x * PIXEL_SIZE * 1.05;
    let y = orderedPoint.y * PIXEL_SIZE * 1.05;
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
    addEdgeInput,
    removeEdgeInput,
}
