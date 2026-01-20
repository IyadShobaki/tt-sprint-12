const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const { setNoCacheHeaders } = require("./middleware");
const cors = require("cors");

const { PORT = 3000, BASE_PATH } = process.env;
// (1) Declare an array of origins to allow access to.
const allowedOrigins = [
  "https://my-website.com",
  "http://my-webiste.com",
  "http://localhost:3000", // Use the port your frontend is served on
];

const app = express();

// add methods for working with packets here - global middleware function
app.use(express.json());
/* express.json() allows an Express application to understand
 and interpret data sent from clients in a JSON format. */
app.use(express.urlencoded({ extended: true }));
/* The express.urlencoded({ extended: true }); middleware is necessary for 
processing data sent in different formats */
/* The { extended: true } option allows the middleware 
to handle more complex types of data. */

// connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/mydb");

app.use(cors()); // enable CORS for all origin
/* // (2) Pass a configuration object to the middleware.
app.use(cors({ origin: allowedOrigins })); */

//app.set("etag", false);
app.use(express.static(path.join(__dirname, "public")));

app.use(setNoCacheHeaders);
// app.use(logger) or app.use(userAuth)  // example of middleware running before the call
const logger = (req, res, next) => {
  console.log(`${req.method} request has been logged! - ${new Date()}`);
  next();
};
app.use(logger);
app.use("/", routes);
app.use("/films", require("./routes/films"));
// app.use(handleError) // example of middleware running after the call

app.listen(PORT, () => {
  console.log("Link to the server:");
  console.log(BASE_PATH);
});

/*

By default, express works as follows:

- Creates an ETag response header that is sent in every server response.
 Thus, every response is cached.

 - The browser remembers the value of the header and at the next GET 
request it sends the ETag inside another header — If-None-Match. 
(I added it to postman request and worked as well)

-If the value of the If-None-Match header matches some cache on the server,
 the response will be under the 304 Not Modified status code. As a result,
  the browser will take the response value from its cache. 
  
  */
