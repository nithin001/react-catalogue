const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./assets/js/[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Acme tech shop",
      template: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
          },
        },
      },
    ],
  },
};

module.exports = config;