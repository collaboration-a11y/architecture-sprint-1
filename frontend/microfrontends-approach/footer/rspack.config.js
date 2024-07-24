const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require("@rspack/core");
const path = require("path");
module.exports = {
  experiments: {
    css: true,
  },
  entry: "./index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath: "http://localhost:3003/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "footer",
      filename: "remoteEntry.js",
      exposes: {
        "./Footer": "./src/components/Footer/index.jsx",
      },
      remotes: {
        "lib-app": "lib_app@http://localhost:3000/remoteEntry.js",
      },
    }),
  ],
};
