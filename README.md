# Projekt ćwiczeniowy — HTML, CSS, JavaScript, React, Spring

Zestaw zadań realizowanych w ramach laboratoriów. Celem projektu jest stopniowe rozwijanie umiejętności tworzenia aplikacji webowych — od podstaw HTML i CSS, przez programowanie w JavaScript, aż po frameworki React i Spring.

## 📌 HTML

- Zadanie 1 (HTML – cz. 1) — `Zad_2_HTML_1`

  - Stworzenie witryny prezentującej wybrane miasto (3–4 podstrony).
  - Zastosowanie nagłówków, akapitów, grafik z tekstem alternatywnym, list, tabel, odnośników i formularzy.
  - Każda strona: kodowanie UTF-8, unikatowy tytuł, metadane (opis, słowa kluczowe).
  - Walidacja w validator.w3.org.

- Zadanie 2 (HTML – cz. 2) — `Zad_3_HTML_2`
  - Rozbudowa poprzedniej witryny.
  - Strona główna: użycie elementów semanticznych: `article`, `section`, `nav`.
  - Formularze z walidacją (email, tel z `pattern`, `autocomplete`, `required`, `autofocus`, `placeholder`).
  - Wykorzystanie elementów: `meter`, `mark`, `details`, `summary`, `aside`, `footer`.

## 🎨 CSS

- Zadanie 1 (CSS – cz. 1) — `Zad_4_CSS_1`
  - Połączenie HTML5 z arkuszem CSS3.
  - Trzy sposoby osadzania reguł CSS: inline, embedded, external.
  - Formatowanie tekstu, tła, box-model, pozycjonowanie, style tabel.
  - Pseudoklasy CSS (`:hover`, `:focus`, `:nth-child()` itd.).
  - Media queries (`@media`) — responsywność.
  - Menu rozwijane 3-poziomowe oparte o CSS.

## ⚡ JavaScript

- Zadanie 1 (JS – cz. 1) — `Zad_6_javascript_1`

  - Minimum 5 własnych funkcji w osobnym pliku `.js`.
  - Użycie: `document.writeln()`, `getElementById()`, `prompt()`, `alert()`, `addEventListener()`, `innerHTML`, `parseInt()`, `Math.random()`.
  - Zaimplementowane mini-gry: zgadywanka liczby/miesiąca, suma liczb podanych przez użytkownika.
  - Walidacja kodu w jslint.com.

- Zadanie 2 (JS – cz. 2) — `Zad_7_javascript_2`
  - Manipulacja DOM: `createElement`, `appendChild`, `replaceChild`, `removeChild`.
  - Kolekcje: `images`, `links`, `forms`, `anchors`.
  - Dynamiczna zmiana stylów CSS (kolor, czcionka).
  - Obsługa zdarzeń myszy i klawiatury (`mousemove`, `mousedown`, `mouseover`, `mouseout`).
  - Obsługa formularzy: `focus`, `blur`, `submit`, `reset`.
  - Włączenie trybu "strict mode".

## ⚛ React

- Zadanie 1 — `Zad_1_REACT`
  - Utworzenie projektu w React przy pomocy Vite.
  - Tworzenie i import kilku komponentów.
  - Zastosowanie fragmentów (`<> </>`).
  - Uruchamianie projektu: `npm run dev` (w katalogu projektu utworzonego przez Vite).

## 🌱 Spring

- Zadanie 1 — `Spring_zad1`

  - Aplikacja CRUD dla produktów (dodawanie, edycja, usuwanie, szczegóły).
  - Atrybuty produktu: nazwa, waga, cena, indeks, kategoria.
  - Widok tabeli produktów z layoutem i menu.

- Zadanie 2 — `Spring_zad2`

  - Rozszerzenie CRUD o relację 1:N (Produkty–Kategorie).
  - Dodawanie, edycja, usuwanie produktów i kategorii.
  - Usunięcie kategorii powoduje usunięcie przypisanych produktów.

- Zadanie 3 — `Spring_zad3`
  - Implementacja koszyka sklepowego z logowaniem użytkownika.
  - Role: Administrator (zarządzanie produktami i kategoriami) oraz Użytkownik (dodawanie produktów do koszyka).
  - Dane koszyka przechowywane w ciasteczkach.
  - Edycja koszyka: zwiększanie/zmniejszanie ilości, usuwanie produktów, podsumowanie wartości zamówienia.

---