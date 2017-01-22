
function connection(socket) {
  console.log("Socket connected");
  socket.emit("log", "greetings");
}

module.exports = function socketController(io) {
  io.on("connection", connection);
};
