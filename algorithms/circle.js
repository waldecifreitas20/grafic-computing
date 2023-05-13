import OrderedPair from "../models/OrderedPair.js";

function buildCircle(r) {
	let x = 0;
	let y = r;
	let e = -r;
	let points = [];
	points.push(new OrderedPair(x, y))
	points.push(new OrderedPair(y, x,))
	points.push(new OrderedPair(-y, -x))
	points.push(new OrderedPair(-x, -y))

	while (x <= y) {
		e += 2 * x + 1;
		x++;

		if (e >= 0) {
			e += 2 - (2 * y)
			y--;
		}

		points.push(new OrderedPair(x, y))//2o. oct
		points.push(new OrderedPair(y, x))//1o. oct
		points.push(new OrderedPair(-x, y))//3o. oct
		points.push(new OrderedPair(-y, x))//4o.oct

		points.push(new OrderedPair(-y, -x))//5o. oct
		points.push(new OrderedPair(-x, -y))//6o. oct
		points.push(new OrderedPair(x, -y))//7o. oct
		points.push(new OrderedPair(y, -x))//8o. oct
		/* 
		*/
	}

	return points;
}


export { buildCircle }