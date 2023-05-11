function translate(shape, x=0, y=0) {
    for (let i = 0; i < shape.points.length; i++) {
        shape.points[i].x += x;
        shape.points[i].y += y;
    }   
}

function scale(shape, factorX, factorY) {
    for (let i = 0; i < shape.points.length; i++) {
        let x = shape.points[i].x;
        let y = shape.points[i].y;
        shape.points[i].x = Math.round(factorX*x);
        shape.points[i].y = Math.round(factorY*y);
    }
}


export default {
    translate,
    scale,
}

 