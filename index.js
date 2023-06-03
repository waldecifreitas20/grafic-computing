import enableEvents from "./events/events.js";
import screen from "./algorithms/screen.js";
import Colors from "./utils/colors.js";

enableEvents();
// BUILD THE GRID ON START APLICATION
screen.buildCanvas();


let fillSelect = document.getElementById('fill-select');
// FILL SELECT WITH OPTIONS OF COLOR
fillSelect.innerHTML = '';
for (const color of Colors.ALL) {
    fillSelect.innerHTML += `<option value="${color}">${color}</option>`;
}




