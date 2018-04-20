const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
    {
      test: /\.js?$/,
      use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [['env', { modules: false }], 'stage-0']
        }
      }
      ],
      exclude: /node_modules/
    }
    ]
  },
  plugins: [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  /*new webpack.DefinePlugin({
    'process.env': {
      BUILD_TARGET: JSON.stringify('server'),
      MODE: JSON.stringify('production'),
      BABEL_ENV: JSON.stringify('production'),
      NODE_ENV: JSON.stringify('production')
    }
  }),*/
  new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'server.js',
      publicPath: '/public/'
    }
  };
