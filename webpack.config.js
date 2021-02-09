const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const isDev = options.mode === "development";

  return {
    mode: options.mode,
    entry: {
      app: ["@babel/polyfill", path.join(__dirname, "src", "index")]
    },
    devtool: isDev ? "source-map" : false,
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".js", ".scss"]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          },
          exclude: /node-modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ["css-loader", "sass-loader"]
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: "file-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({
        filename: "bundle.css"
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: "index.html",
        showErrors: isDev
      })
    ]
  };
};