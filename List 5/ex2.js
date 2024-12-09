"use strict";
const resultDiv = document.querySelector("#results");

const images = document.images;
const links = document.links;
const forms = document.forms;
const anchors = document.anchors;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

button1.addEventListener("click", () => {
  const imagesContent = Array.from(images)
    .map((image) => image.outerHTML)
    .join("\n");
  resultDiv.innerHTML = imagesContent;
});

button2.addEventListener("click", () => {
  links.namedItem("link-1").innerHTML = "Hello, tutaj zmieniony link";
  const linksContent = Array.from(links)
    .map((link) => link.outerHTML)
    .join("\n");
  resultDiv.innerHTML = linksContent;
});

button3.addEventListener("click", () => {
  forms.item(0).innerHTML = "Hello, tutaj zmieniony item z listy formularzy";
  const formsContent = Array.from(forms)
    .map((form) => form.outerHTML)
    .join("\n");
  resultDiv.innerHTML = formsContent;
});

button4.addEventListener("click", () => {
  const anchorsContent = Array.from(anchors)
    .map((anchor) => anchor.outerHTML)
    .join("\n");
  resultDiv.innerHTML = anchorsContent;
});
