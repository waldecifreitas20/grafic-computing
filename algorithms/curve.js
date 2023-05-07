function linearInterpolation(p1, p2, t) {

    let x = p1.x * (1 - t) + p2.x * t;
    let y = p1.y * (1 - t) + p2.y * t;

    return { x, y };
    // return { x: Math.round(x), y: Math.round(y) };
}

function interpolations(p0, p1, p2, t) {
    return {
        p01: linearInterpolation(p0, p1, t),
        p12: linearInterpolation(p1, p2, t),
    }
}

function buildCurve(p0, p1, p2, n=10) {
    let points = [];
    for (let i = 0; i <= n; i++) {
        let t = i / n;
        let int = interpolations(p0, p1, p2, t);
    
        let p = linearInterpolation(int.p01, int.p12, t);
        points.push(p);
    }
    return points;
}

export default buildCurve;