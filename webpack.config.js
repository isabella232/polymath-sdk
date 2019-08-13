const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const browserConfig = {
  entry: './src/index.ts',
  target: 'web',
  output: {
    filename: 'index.browser.js',
    library: 'PolymathNetworkSdk',
    libraryTarget: 'commonjs2',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

const nodeConfig = {
  entry: './src/index.ts',
  // target: 'node',
  output: {
    filename: 'index.js',
    library: 'PolymathNetworkSdk',
    libraryTarget: 'commonjs2',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = [nodeConfig];
