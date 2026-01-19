const { quotes } = require("./quotes");

module.exports.getRandomQuote = () =>
  quotes[Math.floor(Math.random() * quotes.length)];
