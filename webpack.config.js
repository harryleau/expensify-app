const path = require('path');
const ExtractTextPlugin= require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
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
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 3000,
      historyApiFallback: true,
      publicPath: '/dist/'
    },
    performance: {
      hints: false
    }
  };
};

// source-map takes long time to build but it's much lighter => use for production.
// cheap-module-eval-source-map doesn't work well with css => use inline-source-map
// by default, css-loader and sass-loader sourceMap prop is false => switch it to true => easy to track css error.