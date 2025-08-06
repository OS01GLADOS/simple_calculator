const path = require('path')

const HtmlWebpackPlugin = require ('html-webpack-plugin')
const { Template } = require('webpack')

module.exports ={
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin(
           { template:'./src/templates/index.html',}
        )
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
    },

    mode: 'development',
}