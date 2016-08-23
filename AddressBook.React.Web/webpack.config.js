module.exports = {
    /*entry: './index.jsx',*/
    entry: './src/components/main.jsx',
    output: {
        filename: 'browser-bundle.js'
    },
    resolve: {
        extensions: ['', '.Webpack.js', '.web.js', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
          {
              test: /\.jsx/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015', 'react']
              }
          }
        ]
    }
};
