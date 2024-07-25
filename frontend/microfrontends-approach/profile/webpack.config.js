const { ModuleFederationPlugin } = require('@module-federation/enhanced');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3006/',
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png', '.svg'],
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'profile',
      shared: {
        // 'react-router-dom': {
        //     singleton: true
        // },
        'react': {
            singleton: deps.react,
        },
        'react-dom': {
            singleton: deps['react-dom']
        }
    },
      filename: "remoteEntry.js",
      exposes: {
        './Profile': './src/components/Profile/index.jsx'
      },
      remotes: {
        'lib-app': 'lib_app@http://localhost:3000/remoteEntry.js',
      },
    }),
  ],
};
