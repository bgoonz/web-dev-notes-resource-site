// Copyright 2019 Google LLC



// Use `npm run webpack` to produce Webpack bundle for this library.

const path = require('path');

module.exports = {
  entry: './index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    library: 'Oauth2',
    filename: 'oauth2.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    crypto: 'empty',
    http2: 'empty',
  },
  module: {
    rules: [
      {
        test: /node_modules[\\/]google-auth-library[\\/]src[\\/]crypto[\\/]node[\\/]crypto/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]https-proxy-agent[\\/]/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]gcp-metadata[\\/]/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]gtoken[\\/]/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]pkginfo[\\/]/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]semver[\\/]/,
        use: 'null-loader',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  plugins: [],
};
