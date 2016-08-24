const express = require("express");
const morgan = require("morgan");

module.exports = (port) => {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.static("build"));

  app.get("/api/foo", (req, res) => {
    res.end("bar");
  });

  app.listen(port, (error) => {
    if(error) {
      console.error(error);
    } else {
      console.log(`API server listening on port ${port}`);
    }
  });
};
