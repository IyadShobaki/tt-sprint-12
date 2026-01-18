const express = require("express");
const path = require("path");
const routes = require("./routes");

const { PORT = 3000, BASE_PATH = "test" } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// add methods for working with packets here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, () => {
  console.log("Link to the server:");
  console.log(BASE_PATH);
});
