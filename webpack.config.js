const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const local = (p) => path.join(__dirname, p);
const truthy = (v) => !!v;

const PROD = process.env.NODE_ENV === "production";
const ifProd = (v, elseV=null) => PROD ? v : elseV;

module.exports = {
  entry: "./src/app.js",
  resolve: {
    root: [
      path.resolve("./src")
    ]
  },
  output: {
    path: local("dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.global\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]")
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.(html|eot|svg|ttf|woff|woff2)$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.(png|gif|jpeg|mp3|ogg)$/,
        loader: "file"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css", {allChunks: true}),
    ifProd(new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }))
  ].filter(truthy)
};
