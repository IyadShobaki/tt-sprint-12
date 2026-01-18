const express = require("express");
const path = require("path");
const routes = require("./routes");

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// app.use(logger) or app.use(userAuth)  // example of middleware running before the call
const logger = (req, res, next) => {
  console.log(`${req.method} request has been logged! - ${new Date()}`);
  next();
};
app.use(logger);
app.use("/", routes);

// app.use(handleError) // example of middleware running after the call

app.listen(PORT, () => {
  console.log("Link to the server:");
  console.log(BASE_PATH);
});
