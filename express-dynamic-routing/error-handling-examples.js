// Error handling in synchronous code - use try...catch
// ----------------

// Error handling in asynchronous code: async/await

// Moved the code returning the promise with an error to an external function
function returnPromiseError1() {
  return Promise.reject(new Error("Something went wrong..."));
}

(async function testAsyncAwaitError() {
  try {
    console.log("Function execution started");
    await returnPromiseError1(); // wait till returnPromiseError() is executed
  } catch (err) {
    console.error(
      `${err.name} with the message ${err.message} has occured, but we've handled it`,
    );
  }
  console.log("Function execution completed successfully");
})();
// ----------------

// Error handling in promises: the .catch handler
function returnPromiseError2() {
  return Promise.reject(new Error("Error. Something went wrong..."));
}

(function testPromiseRejectHandler() {
  returnPromiseError2().catch((err) => {
    console.error(
      `Error ${err.name} with the message ${err.message} has occurred while executing the code, but we've handled it`,
    );
  });
})();
/* Note that when handling a sequence of promise calls, 
there may be multiple .catch handlers in the chain. In this case, 
the error will be caught by the first block that matches the error. 
Therefore, you should list your catch blocks with the most specific 
errors first and less specific errors towards the end. */
// ----------------

// Error handling in callbacks
const fs = require("fs");
function writeTextToFile(filename, text) {
  fs.writeFile(filename, text, function (err, res) {
    /* The problem with callback functions is that 
    missed errors inside them don't cause application crashes and often go unnoticed. */
    // check that the error object is not empty
    if (err) {
      console.error(
        `An error has occurred while writing the file: ${err.message}`,
      );
      // end the function execution if an error occurs
      return;
    }
    console.log(`fs.writeFile has ended with the following result: ${res}`);
  });
}

writeTextToFile("", "sometext"); // An error has occurred while writing the file: ENOENT: no such file or directory, open ''
// ----------------

// Error handling and Mongoose: the orFail() helper
Card.find({ title: "nonexistant card" })
  //.orFail() // throws a DocumentNotFoundError  //the orFail method, which fires whenever Mongoose returns an empty object
  .orFail(() => {
    const error = new Error("No card found with that id");
    error.statusCode = 404;
    throw error; // Remember to throw an error so .catch handles it instead of .then
  })
  .then((cardData) => {
    // we can instead of using orFail to check if cardData is null and throw an error
    res.send(cardData); // skipped, because an error was thrown
  })
  .catch((error) => {
    // now this does run, so we can handle the error and return an appropriate message
  });

// ----------------

/* If Schema.findById(id) doesn't find a document with the given id,
 it returns an empty object, not an error! You will often want to manually
  throw an error in these cases. We will look at this in more detail in the next question */

const findUser1 = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      // similar to use onFail
      if (!user.name) {
        const error = new Error("user not found");
        err.statusCode = 404;
        throw error;
      }
      res.status(200).send({ data: `${user.name} is a ${user.about}` });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid user id" });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "internal server error" });
      }
    });
};

const findUser2 = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error("user not found");
      err.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: `${user.name} is a ${user.about}` });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid user id" });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "internal server error" });
      }
    });
};
