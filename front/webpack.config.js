const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development'
if(process.env.NODE_ENV === 'production'){
  mode = 'production'
}

module.exports = {
    mode: mode,
    output:{
      filename: 'main.[contenthash].js',
      clean: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',      
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
          })
    ],
    module:{
        rules:[
          {
            test: /\.(png|svg|jpg)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                 (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions:{
                        plugins:[
                          [
                            "postcss-preset-env",
                            {
        
                            }
                          ]
        
                        ]
                      }
                    }
                  },
                  "sass-loader",
                ]
              },
              
        ]
    }
}