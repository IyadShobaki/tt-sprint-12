const http = require("http");

const { router } = require("./routes/index.js");

const { PORT = 3000 } = process.env;

const server = http.createServer(router);

server.listen(PORT);
