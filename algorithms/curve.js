function buildCircle(r) {
	let x = 0;
	let y = r;
	let e = -r;
	let points = [];

	points.push({ x: x , y: y })
	points.push({ x: y, y: x  })
	points.push({ x: -y, y: -x  })
	points.push({ x: -x , y: -y })

	while (x <= y) {
		e += 2 * x + 1;
		x++;

		if (e >= 0) {
			e += 2 - (2 * y)
			y--;
		}

		points.push({ x: y, y: x  })//1o. oct
		points.push({ x: x , y: y })//2o. oct
		points.push({ x: -x , y: y })//3o. oct
		points.push({ x: -y, y: x  })//4o.oct

		points.push({ x: -y, y: -x  })//5o. oct
		points.push({ x: -x , y: -y })//6o. oct
		points.push({ x: x , y: -y })//7o. oct
		points.push({ x: y, y: -x  })//8o. oct

	}
	console.log(points);
	return points;
}

function buildCurve(r, octant = 2) {
	let x = 0;
	let y = r;
	let e = -r;

	let points = [];

	if (octant == 1 || octant == 8) {
		points.push({ x: y, y: x })//x
	}
	else if (octant == 2 || octant == 3) {
		points.push({ x, y })//y
	}
	else if (octant == 4 || octant == 5) {
		points.push({ x: -y, y: -x })// -x
	}
	else if (octant == 6 || octant == 7) {
		points.push({ x: -x, y: -y }) // -y
	}

	while (x <= y) {
		e += 2 * x + 1;
		x++;

		if (e >= 0) {
			e += 2 - (2 * y)
			y--;
		}

		switch (octant) {
			case 1:
				points.push({ x: y, y: x })//1o. oct
				break;
			case 2:
				points.push({ x: x, y: y })//2o. oct
				break;
			case 3:
				points.push({ x: -x, y })//3o. oct
				break;
			case 4:
				points.push({ x: -y, y: x })//4o.oct
				break;
			case 5:
				points.push({ x: -y, y: -x })//5o. oct
				break;
			case 6:
				points.push({ x: -x, y: -y })//6o. oct
				break;
			case 7:
				points.push({ x: x, y: -y })//7o. oct
				break;
			case 8:
				points.push({ x: y, y: -x })//8o. oct
				break;
			default:
				break;
		}
	}
	console.log(points);
	return points;
}

export { buildCircle, buildCurve }