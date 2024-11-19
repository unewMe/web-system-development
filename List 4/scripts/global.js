let globalInt = parseInt(localStorage.getItem("globalInt")) || 0;
let globalString = localStorage.getItem("globalString") || "";

function saveGlobals() {
  localStorage.setItem("globalInt", globalInt);
  localStorage.setItem("globalString", globalString);
}

function updateIntDisplay(intElementId, stringElementId) {
  document.getElementById(intElementId).innerHTML =
    "Ilość 'a' w stringu: " + globalInt;
  document.getElementById(stringElementId).innerHTML =
    "String: " + globalString;
}
