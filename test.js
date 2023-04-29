const getPoint = () => {
    return {
        x: (Math.random() * 100000).toFixed(0),
        y: (Math.random() * 100000).toFixed(0),
    }
}

const getShape = pointsQtd => {
    let points = [];
    for (let i = 0; i < pointsQtd; i++) {
        points.push(getPoint());
    }

    return {
        id: (Math.random() * 100000).toFixed(0),
        points,
    }
}
let a = new Set();

a.add(0);
a.add(0);
a.add(0);
a.add(0);

console.log(a);