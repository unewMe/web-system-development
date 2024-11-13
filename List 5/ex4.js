"use strict";

const demoBox = document.getElementById("demo-box");
const result = document.getElementById("result");

function showEventInfo(event) {
  const altPressed = event.altKey ? "Alt: wciśnięty" : "Alt: nie wciśnięty";
  const ctrlPressed = event.ctrlKey ? "Ctrl: wciśnięty" : "Ctrl: nie wciśnięty";
  const shiftPressed = event.shiftKey ? "Shift: wciśnięty" : "Shift: nie wciśnięty";
  const positionClient = `Pozycja klienta: (${event.clientX}, ${event.clientY})`;
  const positionScreen = `Pozycja ekranu: (${event.screenX}, ${event.screenY})`;

  result.innerHTML = `
    <strong>Informacje o zdarzeniu:</strong><br>
    ${altPressed}<br>
    ${ctrlPressed}<br>
    ${shiftPressed}<br>
    ${positionClient}<br>
    ${positionScreen}<br>
  `;
}

demoBox.addEventListener("mousemove", (event) => {
  showEventInfo(event);
  demoBox.style.backgroundColor = "#e0e0ff";
  demoBox.textContent = "Poruszasz myszą!";
});

demoBox.addEventListener("mousedown", (event) => {
  demoBox.style.backgroundColor = "#ffdddd";
  demoBox.textContent = "Kliknięto myszą!";
});

document.querySelector("h2").addEventListener("mouseover", (event) => {
  demoBox.style.borderColor = "#007bff";
  demoBox.textContent = "Mysz nad elementem!";
});

demoBox.addEventListener("mouseout", (event) => {
  demoBox.style.backgroundColor = "#f0f0f0";
  demoBox.style.borderColor = "#333";
  demoBox.textContent = "Najedź myszką tutaj";
});
