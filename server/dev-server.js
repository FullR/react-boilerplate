const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../webpack.config");

module.exports = (port) => {
  const server = new WebpackDevServer(webpack(webpackConfig));

  server.listen(port, (error) => {
    if(error) {
      console.error(error);
    } else {
      console.log(`Dev server listening on port ${port}`);
    }
  });
};
