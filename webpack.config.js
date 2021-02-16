const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) =>{
  let envfile = "stage";
  if (argv.mode === 'development') {
    envfile = 'dev';
  }else if (argv.mode === 'production') {
    envfile = "prod"
  }

  return  {
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    port: 9000
 },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
       {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
          ],
      },
      {
        test: /\.jsx?$/,
        exclude:  /node_modules/,
        loader: 'babel-loader'
    },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "styles.css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/images', to: 'images' },
        { from: 'src/assets/favicon', to: 'favicon' },
      ],
    }),
    new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  }),
  new Dotenv({
    silent: (argv.mode == "production") ? true : false,
    path: `.env.${envfile}` 
  })
  ]
  }
};