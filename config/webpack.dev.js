const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    hot: true,
    open: true,
    port: 8080,
  },
});
