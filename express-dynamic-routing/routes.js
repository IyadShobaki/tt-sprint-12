const router = require("express").Router();
const { users } = require("./db");

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
