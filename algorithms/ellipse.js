function buildEllipse(a, b) {
    const XC = 40;
    let a_sq = a ** 2;
    let b_sq = b ** 2;

    let x = 0;
    let y = b;

    let dx = 2 * b_sq * x;
    let dy = 2 * a_sq * y;

    let e = - b * a_sq + a_sq * 0.25;

    let points = [];
   
    points.push({ x: x, y: y })
    points.push({ x: x, y: -y })
   

    while (dx < dy) {
        x++
        e += dx + b_sq;
        dx = 2 * b_sq;

        if (e > 0) {
            y--;
            e += a_sq - dy;
            dy -= 2 * a_sq;
        }
        // points.push({ x: x, y });
        points.push({ x: x , y: y })//2o. oct
        points.push({ x: -x , y: y })//3o. oct
        points.push({ x: -x , y: -y })//6o. oct
        points.push({ x: x , y: -y })//7o. oct
        /*  
        points.push({ x: y, y: x })//1o. oct
        points.push({ x: -y, y: -x  })//5o. oct
        points.push({ x: -y, y: x  })//4o.oct
  
         points.push({ x: y, y: -x  })//8o. oct */
    }

    return points;
}

export { buildEllipse };