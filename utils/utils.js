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

let convertToRadiuns = angle => Number((angle * Math.PI / 180).toFixed(6));

let sinOf = angle => {
    let radiuns = convertToRadiuns(angle);
    let sin = Number(Math.sin(radiuns).toFixed(5));
    return sin;
}
let cosOf = angle => {
    let radiuns = convertToRadiuns(angle);
    let cos = Number(Math.cos(radiuns).toFixed(5));
    return cos;
}



function generateRamdomId() {
    return (Math.random() * 100000).toFixed(0);
}

export {
    createMatrix,
    renderOnTerminal,
    generateRamdomId,
    convertToRadiuns,
    sinOf,
    cosOf,
};