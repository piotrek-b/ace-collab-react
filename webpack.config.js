const TerserPlugin = require('terser-webpack-plugin');
const path = require('path')

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.min.js',
    publicPath: '/collab/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // images
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]',
          },
        }],
      },
      //File loader used to load fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
}
