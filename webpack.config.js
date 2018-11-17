const path = require('path');

module.exports = [
    {
        entry: './src/harness/index.js',
        output: {
            path: path.resolve('dist/js'),
            filename: 'main.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js$|jsx$)/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        externals: {
            react: "react",
            "react-dom": "ReactDOM"
        },
        devServer: {
            contentBase: "./dist",
            hot: true
        }
    }
]