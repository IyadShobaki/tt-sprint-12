const router = require("express").Router();

const {
  getFilms,
  createFilm,
  getFilmById,
  updateFilm,
  deleteFilm,
} = require("../controllers/films");

router.get("/", getFilms);

router.post("/", createFilm);

router.get("/:id", getFilmById);

router.patch("/:id", updateFilm);

router.delete("/:id", deleteFilm);

module.exports = router;
