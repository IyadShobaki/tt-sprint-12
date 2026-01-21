const router = require("express").Router();

const {
  getFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
} = require("../controllers/films");

router.get("/", getFilms);

router.get("/:id", getFilmById);

router.post("/", createFilm);

router.patch("/:id", updateFilm);

router.delete("/:id", deleteFilm);

module.exports = router;
