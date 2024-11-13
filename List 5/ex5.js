"use strict";

const form = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameHelp = document.getElementById("usernameHelp");
const emailHelp = document.getElementById("emailHelp");
const passwordHelp = document.getElementById("passwordHelp");

usernameInput.addEventListener("focus", () => {
  usernameHelp.textContent = "Wprowadź nazwę użytkownika (min. 5 znaków).";
});

usernameInput.addEventListener("blur", () => {
  usernameHelp.textContent = "";
});

emailInput.addEventListener("focus", () => {
  emailHelp.textContent = "Podaj poprawny adres email (np. user@example.com).";
});

emailInput.addEventListener("blur", () => {
  emailHelp.textContent = "";
});

passwordInput.addEventListener("focus", () => {
  passwordHelp.textContent = "Hasło powinno zawierać co najmniej 8 znaków, w tym litery i cyfry.";
});

passwordInput.addEventListener("blur", () => {
  passwordHelp.textContent = "";
});

form.addEventListener("submit", (event) => {
  const confirmSubmit = confirm("Czy na pewno chcesz wysłać formularz?");
  if (!confirmSubmit) {
    event.preventDefault();
  }
});

form.addEventListener("reset", (event) => {
  const confirmReset = confirm("Czy na pewno chcesz zresetować formularz?");
  if (!confirmReset) {
    event.preventDefault();
  }
});
