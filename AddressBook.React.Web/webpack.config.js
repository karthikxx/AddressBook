module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'browser-bundle.js'
    },
    resolve: {
        extensions: ['', '.Webpack.js', '.web.js', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
          {
              test: /\.jsx/,
              loader: 'babel-loader',
              query: {
                  presets: ['es2015', 'react']
              }
          },
        ]
    }
};
