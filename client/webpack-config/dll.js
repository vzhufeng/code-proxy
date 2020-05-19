const webpack = require("webpack");
const { resolve } = require("./utils");

module.exports = {
  entry: {
    vendors: [
      // 自行调整
      "react",
      "react-dom",
      "antd"
    ],
  },
  output: {
    path: resolve(["dll"]),
    filename: "[name].js",
    library: "_dll_[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: resolve(["dll/dll-manifest.json"]),
    }),
  ],
};
