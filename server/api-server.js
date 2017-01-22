const {Server} = require("http");
const express = require("express");
const socketIO = require("socket.io");
const morgan = require("morgan");
const api = require("./api");
const socketController = require("./socket-controller");

module.exports = (port) => {
  const app = express();
  const server = Server(app);
  const io = socketIO(server);

  app.use(morgan("dev"));
  app.use(express.static("dist"));
  app.use("/api", api);
  socketController(io);

  server.listen(port, (error) => {
    if(error) {
      console.error(error);
    } else {
      console.log(`API server listening on port ${port}`);
    }
  });
};
