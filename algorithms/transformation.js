function translate(shape, x, y) {
    for (let i = 0; i < shape.points.length; i++) {
        shape.points[i].x += x;
        shape.points[i].y += y;
    }
}

export default {
    translate,
}