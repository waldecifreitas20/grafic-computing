import { cosOf, sinOf } from "../utils/utils.js";

function translate(shape, x = 0, y = 0) {
    for (let i = 0; i < shape.points.length; i++) {
        shape.points[i].x += x;
        shape.points[i].y += y;
    }
}

function scale(shape, factorX, factorY) {
    for (let i = 0; i < shape.points.length; i++) {
        let x = shape.points[i].x;
        let y = shape.points[i].y;
        shape.points[i].x = Math.round(factorX * x);
        shape.points[i].y = Math.round(factorY * y);
    }
}

function rotation(shape, rotation, pivot) {
        for (let i = 0; i < shape.points.length; i++) {
        let x = shape.points[i].x;
        let y = shape.points[i].y;
        
        let nx = x * cosOf(rotation) - y * sinOf(rotation);
        let ny = x * sinOf(rotation) + y * cosOf(rotation);

        shape.points[i].x = nx;
        shape.points[i].y = ny;
    }
}

export default {
    translate,
    scale,
    rotation,
}

