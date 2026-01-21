// models/articles.js

const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 8,
    maxLength: 40,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "invalid url",
    },
  },
});

module.exports = mongoose.model("article", articleSchema);

/* The validator package needs to be installed.

Correct. It can be a bit confusing,
 but in the line validator: (v) => validator.isURL(v), 
 the first instance of the word validator 
 is simply a property of the built-in mongoose schema property, 
 validate. But the second instance refers to the validator module, 
 which has access to the isUrl method (among others). */

// ABOVE CODE (VALIDATOR) IS NOT RIGHT
// Next example is an example of the right code

const userSchema = new mongoose.Schema({
  name: {
    // every user has a name field, the requirements for which are described below:
    type: String, // the name type is a string
    required: true, // every user has a name, so it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
  },
  pronouns: {
    type: String, // the pronouns are a string
    enum: ["they/them", "she/her", "he/him", "other pronouns"], // every user can choose their pronouns
  },
  age: {
    // every user has an age field
    type: Number, // the age type is a number
    required: true, // the user has to specify their age
    validate: {
      // describe the validate feature
      validator(v) {
        // validator is a data validation feature. v is the age value
        return v >= 18; // if the age is less than 18, it will return false
      },
      message: "Sorry. You have to be at least 18 years old", // when the validator returns false, this message will be displayed
    },
  },
  about: String, // type: String
});
