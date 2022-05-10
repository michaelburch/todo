const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
module.exports = function(env, { mode }) {
  
  const fullyArmedAndOperational = mode === 'production';
  return {
    mode: fullyArmedAndOperational ? 'production' : 'development',
    devtool: fullyArmedAndOperational ? 'source-map' : 'inline-source-map',
    entry: {
      app: ['./src/main.ts']
    },
    output: {
      path: path.resolve(process.cwd(), 'out'),
      filename: 'dist/bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules']
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      open: !process.env.CI,
      static: {
        directory: '.',
      },
    },
    plugins: [
      new CleanWebpackPlugin({verbose: true, protectWebpackAssets: false}),
      new CopyPlugin({
        patterns: [
          {
            from: "index.html",
            to: "index.html",
            context: ".",
          },
        ],
      }),
    ],
    
    module: {
      rules: [
        {
          test: /\.ts$/i,
          use: [
            {
              loader: 'ts-loader'
            }
          ],
          exclude: /node_modules/
        },
      ]
    }
  }
}