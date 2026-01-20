const Film = require("../models/film");

module.exports.getFilms = (req, res) => {
  Film.find({})
    .then((films) => res.send({ data: films }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.getFilmById = (req, res) => {
  Film.findById(req.params.id)
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.createFilm = (req, res) => {
  const { title, genre } = req.body;

  Film.create({ title, genre })
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.updateFilm = (req, res) => {
  const { title, genre } = req.body;
  Film.findByIdAndUpdate(
    req.params.id,
    { title, genre },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: true, // if the film entry wasn't found, it will be created
    },
  )
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.deleteFilm = (req, res) => {
  Film.findByIdAndDelete(req.params.id)
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};
