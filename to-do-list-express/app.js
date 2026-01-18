const express = require("express");
const path = require("path");
const routes = require("./routes");

const { PORT = 3000, BASE_PATH = "test" } = process.env;

const app = express();
// Allowing the user to have access to public folder/files
app.use(express.static(path.join(__dirname, "public")));

// add methods for working with packets here - global middleware function
app.use(express.json());
/* express.json() allows an Express application to understand
 and interpret data sent from clients in a JSON format. */
app.use(express.urlencoded({ extended: true }));
/* The express.urlencoded({ extended: true }); middleware is necessary for 
processing data sent in different formats */
/* The { extended: true } option allows the middleware 
to handle more complex types of data. */

/*  // adding a middleware to specific paths examples
app.use('/users/:id', checkRequest);
router.get('/users/:id', doesUserExist);*/
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Link to the server:");
  console.log(BASE_PATH);
});
