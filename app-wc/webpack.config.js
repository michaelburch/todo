const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function(env, { mode }) {
  const fullyArmedAndOperational = mode === 'production';
  return {
    mode: fullyArmedAndOperational ? 'production' : 'development',
    devtool: fullyArmedAndOperational ? 'source-map' : 'inline-source-map',
    entry: {
      app: ['./src/main.ts']
    },
    output: {
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
      new CleanWebpackPlugin()
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
        }
      ]
    }
  }
}