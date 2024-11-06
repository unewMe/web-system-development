let jokes = [];

async function loadJokes() {
  try {
    const response = await fetch("./scripts/jokes.json");
    jokes = await response.json();
  } catch (error) {
    console.error("Błąd podczas ładowania żartów:", error);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const exclude_tags_default = ["racist", "dirty", "sex"];

function getRandomJoke(options = { exclude_tags: exclude_tags_default }) {
  const min = 0;
  const max = jokes.length - 1;
  const exclude_tags = options.exclude_tags;

  while (true) {
    const idx = getRandomInt(min, max);
    let joke = jokes[idx];
    let flagged = 0;

    for (let i = 0; i < exclude_tags.length; i++) {
      if (joke.tags.indexOf(exclude_tags[i]) > -1) {
        flagged = 1;
        break;
      }
    }

    if (flagged === 0) {
      return joke;
    }
  }
  return null;
}


