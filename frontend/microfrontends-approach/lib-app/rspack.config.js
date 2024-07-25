const {
  container: { ModuleFederationPlugin },
} = require("@rspack/core");

const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "hidden-source-map",
  output: {
    publicPath: "http://localhost:3000/",
    clean: true,
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
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
      name: "lib_app",
      filename: "remoteEntry.js",
      exposes: {
        "./page-styles": "./src/styles/page/page.css",
        "./react": "react",
        "./react-dom": "react-dom",
        "./PopupWithForm": "./src/components/PopupWithForm/index.jsx",
        "./ImagePopup": "./src/components/ImagePopup/index.jsx",
        "./InfoTooltip": "./src/components/InfoTooltip/index.jsx",
      },
    }),
  ],
};
