const apiServer = require("./api-server");
const devServer = require("./dev-server");
const config = require("../config");

const PORT = config.get("port");
const PROXY_PORT = config.get("proxyPort");
const PROD = process.env.NODE_ENV === "production";

if(PROD) {
  apiServer(PORT);
} else {
  apiServer(PROXY_PORT);
  devServer(PORT);
}
