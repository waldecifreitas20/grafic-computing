import OrderedPair from "../models/OrderedPair.js";
import DATABASE from "../data/data.js";


const MAX_X = 84;
const MAX_Y = 54;
const PIXEL_SIZE = 10;
let canvas;


buildCanvas();
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

        console.log(shape);
        console.log(shape.points);
        renderShape(shape);
    }

}

function clearCanvas() {
    DATABASE.clear();
    _clearCardsList();
    buildCanvas();
}

function renderShape(shape) {
    for (const point of shape.points) {
        _renderPoint(point);
    }
}

function addPointCardList(listId, shape) {
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
}


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


function _clearCardsList() {
    let lists = document.getElementsByClassName('card-item');
    let length = lists.length;
    console.log(length);
    console.log(lists);
    for (let i = length - 1; i >= 0; i--) {

        lists[i].remove();
    }
}

export default {
    renderShape,
    buildCanvas,
    canvas,
    clearCanvas,
    addPointCardList,
    removePointCardList
}
