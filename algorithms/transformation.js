function translate(shape, x=0, y=0) {
    for (let i = 0; i < shape.points.length; i++) {
        shape.points[i].x += x;
        shape.points[i].y += y;
    }   
}

export default {
    translate,

}

 