const router = require("express").Router();
const { users } = require("./db");
const fsPromises = require("fs").promises;
const path = require("path");
const { getRandomQuote } = require("./utils");
const Film = require("./models/film");

router.get("/films", (req, res) => {
  Film.find({})
    .then((films) => res.send({ data: films }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
});

router.post("/films", (req, res) => {
  const { title, genre } = req.body;

  Film.create({ title, genre })
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
});

router.get("/films/:id", (req, res) => {
  Film.findById(req.params.id)
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
});

router.patch("/films/:id", (req, res) => {
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
});

router.delete("/films/:id", (req, res) => {
  Film.findByIdAndDelete(req.params.id)
    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
});

router.get("/quotes", (req, res) => {
  res.send({ data: getRandomQuote() });
});

router.get("/usersfile", (req, res) => {
  fsPromises.readFile(path.join(__dirname, "usersFile.json")).then((data) => {
    const users = JSON.parse(data);
    res.send(users);
  });
});

router.get("/usersfile/:userId", (req, res) => {
  const { userId } = req.params;

  fsPromises
    .readFile(path.join(__dirname, "usersFile.json"))
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);

      if (user) {
        res.send(user);
        return;
      }

      res.status(404).send({ message: "User not found" });
    })
    .catch(() => {
      res.status(500).send({ message: "An error occurred on the server" });
    });
});

// a middleware is a function takes 3 argumetns
const doesUserExist = (req, res, next) => {
  if (!users[req.params.id]) {
    res.send({ error: "This user doesn't exist" });
    return;
  }
  next();
};

router.get("/users", (req, res) => {
  res.send(users);
});

router.get("/users/:id", doesUserExist, (req, res) => {
  res.send(users[req.params.id]);
});

router.patch("/users/:id", doesUserExist, (req, res) => {
  res.send("updated user");
});

router.delete("/users/:id", doesUserExist, (req, res) => {
  res.send("deleted user");
});

module.exports = router;
