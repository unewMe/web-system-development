"use strict";

const demoBox = document.getElementById("demo-box");
const result = document.getElementById("result");

// Funkcja pomocnicza do wyświetlania informacji o zdarzeniu
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

// Zdarzenie `mousemove` - poruszanie myszą nad elementem
demoBox.addEventListener("mousemove", (event) => {
  showEventInfo(event);
  demoBox.style.backgroundColor = "#e0e0ff";
  demoBox.textContent = "Poruszasz myszą!";
});

// Zdarzenie `mousedown` - kliknięcie myszą
demoBox.addEventListener("mousedown", (event) => {
  demoBox.style.backgroundColor = "#ffdddd";
  demoBox.textContent = "Kliknięto myszą!";
  console.log(`Wciśnięty klawisz: ${event.keyCode}`);
});

// Zdarzenie `mouseover` - najazd myszą na element
document.querySelector("h2").addEventListener("mouseover", (event) => {
  demoBox.style.borderColor = "#007bff";
  demoBox.textContent = "Mysz nad elementem!";
});

// Zdarzenie `mouseout` - wyjazd myszą poza element
demoBox.addEventListener("mouseout", (event) => {
  demoBox.style.backgroundColor = "#f0f0f0";
  demoBox.style.borderColor = "#333";
  demoBox.textContent = "Najedź myszką tutaj";
});
