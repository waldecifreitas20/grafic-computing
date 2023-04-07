function curve(r) {
	let x = 0;
	let y = r;
	let e = -r;

	let points = [];

	points.push({ x, y })
	points.push({ x: y, y: x })
	points.push({ x: -y, y: -x })
	points.push({ x: -x, y: -y })


	while (x <= y) {
		e += 2 * x + 1;
		x++;

		if (e >= 0) {
			e += 2 - (2 * y)
			y--;
		}


		points.push({ x: -y, y: x })//4o.oct
		points.push({ x: -x, y: -y })//6o. oct
		points.push({ x: x, y: y })//2o. oct
		points.push({ x: -x, y })//3o. oct

		points.push({ x: y, y: x })//1o. oct
		points.push({ x: -y, y: -x })//5o. oct
		points.push({ x: x, y: -y })//7o. oct
		points.push({ x: y, y: -x })//7o. oct
		/* 
		
		
		 */

		/*

		*/
	}
	console.log(points);
	return points;
}

export { curve, }