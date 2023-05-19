import { cosOf, sinOf } from "../utils/utils.js";

function translate(shape, x = 0, y = 0) {
    for (let i = 0; i < shape.vertices.length; i++) {
        shape.vertices[i].x += x;
        shape.vertices[i].y += y;
    }
}

function scale(shape, factorX, factorY) {
    for (let i = 0; i < shape.vertices.length; i++) {
        let x = shape.vertices[i].x;
        let y = shape.vertices[i].y;
        shape.vertices[i].x = Math.round(factorX * x);
        shape.vertices[i].y = Math.round(factorY * y);
    }
}

function rotation(shape, rotation, pivot) {
        for (let i = 0; i < shape.vertices.length; i++) {
        let x = shape.vertices[i].x;
        let y = shape.vertices[i].y;
        
        let nx = x * cosOf(rotation) - y * sinOf(rotation);
        let ny = x * sinOf(rotation) + y * cosOf(rotation);

        shape.vertices[i].x = Math.floor(nx);
        shape.vertices[i].y = Math.floor(ny);
    }
}

export default {
    translate,
    scale,
    rotation,
}

