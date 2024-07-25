const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require('@rspack/core');
const deps = require('./package.json').dependencies;
module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
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
        'react-router-dom': {
            singleton: true,
            requiredVersion: deps['react-router-dom']
        },
        'react': {
          requiredVersion: deps.react,
          import: 'react', // the "react" package will be used a provided and fallback module
          shareKey: 'react', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed

        },
        'react-dom': {
          requiredVersion: deps['react-dom'],
          singleton: true, // only a single version of the shared module is allowed
        }
    },
      name: 'main_app',
      remotes: {
        // 'profile': 'profile@http://localhost:3006/remoteEntry.js',
        'auth': 'auth@http://localhost:3004/remoteEntry.js',
        'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
        'footer': 'footer@http://localhost:3003/remoteEntry.js',
        'header': 'header@http://localhost:3005/remoteEntry.js'
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};
