const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require("./config");
const {DefinePlugin, ProvidePlugin} = webpack;
const local = (p) => path.join(__dirname, p);
const truthy = (v) => !!v;

const PROD = config.get("production");
const ifProd = (v, elseV=null) => PROD ? v : elseV;

const extractTextLoaders = [
  {
    loader: "css-loader",
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: "[local]_[hash:base64:5]"
    }
  }
];

module.exports = {
  entry: "./src/app.js",
  resolve: {
    modules: [
      "src",
      "node_modules"
    ]
  },
  output: {
    path: local("dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: "babel-loader"}]
      },
      {
        // load css as modules but bundle them as a single file
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: extractTextLoaders
        })
      },
      {
        // static assets are loaded as file
        test: /\.(html|eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }]
      },
      {
        test: /\.(png|gif|jpeg|mp3|ogg)$/,
        use: [{loader: "file-loader"}]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: "styles.css", allChunks: true}),
    ifProd(new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })),
    new DefinePlugin({
      PRODUCTION: JSON.stringify(PROD)
    }),
    new ProvidePlugin({
      log: PROD ? "util/log-production" : "util/log-development"
    })
  ].filter(truthy),
  devServer: {
    quiet: false,
    proxy: {
      "/api/": `http://localhost:${config.get("proxyPort")}`
    },
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
};
