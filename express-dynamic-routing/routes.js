const router = require("express").Router();
const { users } = require("./db");
const fsPromises = require("fs").promises;
const path = require("path");

// a middleware is a function takes 3 argumetns
router.get("/usersfile", (req, res) => {
  fsPromises.readFile(path.join(__dirname, "usersFile.json")).then((data) => {
    const users = JSON.parse(data);
    res.send(users);
  });
});

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
