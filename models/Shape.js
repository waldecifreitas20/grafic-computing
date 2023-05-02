import { generateRamdomId } from "../utils/utils.js";

export default class Shape {
    constructor(points) {
        this.id = generateRamdomId();
        this.points = points;
    }
        
}
