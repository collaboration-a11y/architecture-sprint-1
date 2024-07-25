const {
  container: { ModuleFederationPlugin },
} = require("@rspack/core");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const deps = require("./package.json").dependencies;

module.exports = {
  experiments: {
    css: true,
  },
  target: "web",
  entry: "./src/index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      shared: {
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
        react: {
          requiredVersion: deps.react,
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true, // only a single version of the shared module is allowed
        },
      },
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/components/Profile/index.jsx",
      },
      remotes: {
        "lib-app": "lib_app@http://localhost:3000/remoteEntry.js",
      },
    }),
  ],
};
