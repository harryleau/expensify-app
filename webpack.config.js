const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';
  
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    mode: 'development',
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 3000,
      historyApiFallback: true
    },
    performance: {
      hints: false
    }
  };
};

// source-map takes long time to build but it's much lighter => use for production.