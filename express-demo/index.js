// Setting an entry point
const express = require("express");
const app = express();

const { PORT = 3000 } = process.env;
const animals = [
  {
    kind: "dog",
    breed: "chihuahua",
  },
  {
    kind: "dog",
    breed: "bloodhound",
  },
  {
    kind: "dog",
    breed: "german shepherd",
  },
  {
    kind: "cat",
    breed: "abyssinian",
  },
  {
    kind: "cat",
    breed: "dwelf",
  },
  {
    kind: "cat",
    breed: "highlander",
  },
];

app.get("/animals", (req, res) => {
  let result = animals;
  if (req.query.kind) {
    result = result.filter((animal) => animal.kind === req.query.kind);
  }

  if (req.query.breed) {
    result = result.filter((animal) => animal.breed === req.query.breed);
  }

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
