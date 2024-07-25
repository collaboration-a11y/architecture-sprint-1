const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3000/',
    clean: true,
  },
  module: {},
  cache: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'lib_app',
      filename: 'remoteEntry.js',
      exposes: {
        './PopupWithForm': './src/components/PopupWithForm/index.jsx',
        './styleLoader': './styleLoader',
        './react': 'react',
        './react-dom': 'react-dom',
      },
    }),
  ],
};
