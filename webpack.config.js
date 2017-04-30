/**
 * Created by Julian on 2016/8/9.
 */
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname,'./src/main')
    ],
    debug: true,
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].js'
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    module: {
        preLoaders: [
            { test: /\.vue$/, loader: 'eslint', exclude: /node_modules/ },
            { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
        ],
        loaders: [
            // { test: /\.css$/, loader: extractTextPlugin.extract('style-loader','css-loader?sourceMap')},
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
            },
            {
                test: /\.(jpeg|png|jpg|woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }
        ]
    },
    plugins: [
        new extractTextPlugin('style.css'),
        new htmlWebpackPlugin({
            title: '中国水鸟调查',
            favicon: './src/assets/img/favicon.png',
            filename: './index.html',
            template: './index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

