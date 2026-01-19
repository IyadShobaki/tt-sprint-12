const express = require("express");
const path = require("path");
const routes = require("./routes");
const { setNoCacheHeaders } = require("./middleware");

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();
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
