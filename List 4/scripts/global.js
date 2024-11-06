// Load global variables from localStorage or initialize them
let globalInt = parseInt(localStorage.getItem("globalInt")) || 0;
let globalString = localStorage.getItem("globalString") || "";

// Function to save global variables to localStorage
function saveGlobals() {
  localStorage.setItem("globalInt", globalInt);
  localStorage.setItem("globalString", globalString);
}

// Function to update the display elements
function updateIntDisplay(intElementId, stringElementId) {
  document.getElementById(intElementId).innerHTML =
    "Ilość 'a' w stringu: " + globalInt;
  document.getElementById(stringElementId).innerHTML =
    "String: " + globalString;
}
