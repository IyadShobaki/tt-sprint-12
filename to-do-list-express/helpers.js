const { mainPageMarkup, submitSuccessMarkup } = require("./views");

const todos = [];

const postForm = (req, res) => {
  const { item } = req.body;
  todos.push(item);
  console.log(todos);

  res.send(submitSuccessMarkup);
};
/* const postForm = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    todos.push(body.split("=")[1]);
    console.log(todos);

    res.send(submitSuccessMarkup);
  });
}; */

const getMainPage = (req, res) => {
  res.send(mainPageMarkup);
};

module.exports = {
  postForm,
  getMainPage,
};
