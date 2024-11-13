"use strict";

document.getElementById("bg-color-picker").addEventListener("input", (e) => {
  document.body.style.backgroundColor = e.target.value;
});

document.getElementById("text-color-picker").addEventListener("input", (e) => {
  document.body.style.color = e.target.value;
});

document.getElementById("font-style").addEventListener("input", (e) => {
  document.body.style.fontFamily = e.target.value;
});
