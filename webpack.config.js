const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
console.log("ENV:"+process.env.NODE_ENV)
var ENV = process.env.NODE_ENV,
    isProd = ENV === "production" ? true : false,
    BUILD_DIR = path.resolve(__dirname, 'dist'),
    APP_DIR = path.resolve(__dirname, './'),
    ROOT_DIR = path.resolve(__dirname),
    NODE_MODULES = path.resolve(__dirname, 'node_modules'),
    config = {
        entry: (isProd ? APP_DIR + "/libs/js/Editable.jsx" : APP_DIR + "/examples/index.jsx"),
        output: {
            path: (isProd ? BUILD_DIR : ROOT_DIR), //<- This path is use at build time
            filename: "editable.js", //<- This file is created under path which we specified in output.path
            library: 'Editable',
            libraryTarget: 'umd',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Editable',
                template: 'index.ejs',
                filename: ROOT_DIR + '/index.html'
            }), new ExtractTextPlugin({
                // Extracting all css in one file, and file name is based on what you specified in filename
                filename: "editable.css",
                allChunks: true
            }), new webpack.ProvidePlugin({
                "React": "react",
            }),

        ],
        resolve: {
            modules: [
                APP_DIR,
                NODE_MODULES
            ],
            extensions: ['.js', '.jsx', '.json', '.css']
        },
        module: {
            loaders: [{
                test: /\.jsx$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                include: [APP_DIR],
            }, {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            }]
        }
    }

if (!isProd) {
    config['devtool'] = 'inline-source-map';
    config['cache'] = true;
}
module.exports = config;
