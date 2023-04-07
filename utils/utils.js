function createMatrix(length, point) {
    let matrix = [];

    for (let l = 0; l < length; l++) {
        matrix.push([]);
        for (let c = 0; c < length; c++) {
            matrix[l].push(point);
        }
    }
    
    return matrix;
}

function renderOnTerminal(matrix, points) {
    let m = matrix.copyWithin();

     console.log(m);
    for (const point of points) {
        let y = point.y;
        let x = point.x;
        m[y][x] = '1  ';
    }
    for (let y = matrix.length-1; y >= 0; y--) {
        console.log(m[y]);
    }
}


export {
    createMatrix,
    renderOnTerminal,
};