"use strict";

const root = document.getElementById("root");

const list = document.createElement("ul");

const createLiItem = (number) => {
  const li = document.createElement("li");

  const liText = document.createTextNode(`element ${number}`);

  const liButtonDelete = document.createElement("button");
  const liButtonDeleteText = document.createTextNode("Usuń");
  liButtonDelete.appendChild(liButtonDeleteText);
  liButtonDelete.addEventListener("click", () => {
    list.removeChild(li);
  });

  const liButtonInsertBefore = document.createElement("button");
  const liButtonInsertBeforeText = document.createTextNode("Dodaj element przed");
  liButtonInsertBefore.appendChild(liButtonInsertBeforeText);
  liButtonInsertBefore.addEventListener("click", () => {
    const newLi = createLiItem(li.parentNode.children.length + 1);
    list.insertBefore(newLi, li);
  });

  const liButtonReplace = document.createElement("button");
  const liButtonReplaceText = document.createTextNode("Zamień");
  liButtonReplace.appendChild(liButtonReplaceText);
  liButtonReplace.addEventListener("click", () => {
    const newLi = createLiItem(number + 1);
    list.replaceChild(newLi, li);
  });

  const liButtonInsertToParentNode = document.createElement("button");
  const liButtonInsertToParentNodeText = document.createTextNode("Dodaj element do rodzica");
  liButtonInsertToParentNode.appendChild(liButtonInsertToParentNodeText);
  liButtonInsertToParentNode.addEventListener("click", () => {
    const newLi = createLiItem(li.parentNode.children.length + 1);
    li.parentNode.appendChild(newLi);
  });

  list.setAttribute("id", `list-item-${number}`);
  li.appendChild(liText);
  li.appendChild(liButtonDelete);
  li.appendChild(liButtonInsertBefore);
  li.appendChild(liButtonReplace);
  li.appendChild(liButtonInsertToParentNode);

  return li;
};

const button = document.createElement("button");
const buttonText = document.createTextNode("Dodaj element");
button.appendChild(buttonText);
button.addEventListener("click", () => {
  const li = createLiItem(list.children.length + 1);
  list.appendChild(li);
});
root.appendChild(list);
root.appendChild(button);
