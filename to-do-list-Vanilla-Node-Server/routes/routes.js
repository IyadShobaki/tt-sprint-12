const { mainPageMarkup, submitSuccessMarkup } = require("../views");

const todos = [];

const getMainPage = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.end(mainPageMarkup);
};

const postForm = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    todos.push(body.split("=")[1]);

    console.log(todos);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(submitSuccessMarkup);
  });
};

module.exports = {
  getMainPage,
  postForm,
};
