
function connection(socket) {
  socket.emit("log", "greetings");
}

module.exports = function socketController(io) {
  io.on("connection", connection);
};
