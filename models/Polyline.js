import Shape from "./Shape";
import Bresenham from "../algorithms/bresenham.js";

export default class Polyline extends Shape {
    constructor(vertices) {
        this.vertices;
    }

    build() {
        let bresenham = new Bresenham();
    }
}