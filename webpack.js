const path = require('path')
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const project = require('./webpack.embed.js')

module.exports = merge.merge(
  project.webpackConfig('./src', './src/index.hbs', 'index.html', './src/piece.hbs', './'),
  {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: { 
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    devServer: {
      contentBase: './public'
    },
    resolve: {
      alias: {
        liquidxBase: path.resolve(__dirname, 'node_modules/liquidx-base/')
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false 
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
        },   
        {
          test:  /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },      
        {
          test: /\.[s]?css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader'},
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  includePaths: ['node_modules/liquidx-base']
                }
              }
            }
          ]
        }
      ]
    },
  }
)
