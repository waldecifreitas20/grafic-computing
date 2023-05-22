import enableEvents from "./events/events.js";
import screen from "./algorithms/screen.js";
import Colors from "./utils/colors.js";

enableEvents();
// BUILD THE GRID ON START APLICATION
screen.buildCanvas();

let fillSelect = document.getElementById('fill-select');

fillSelect.innerHTML = '';
for (const color of Colors.ALL) {
    fillSelect.innerHTML += `
    <option value="${color}">${color}</option>
    `;
}




