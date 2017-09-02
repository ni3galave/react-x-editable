const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var ENV = process.env.NODE_ENV,
    isProd = ENV === "production" ? true : false,
    BUILD_DIR = path.resolve(__dirname, 'public'),
    APP_DIR = path.resolve(__dirname, 'app'),
    ROOT_DIR = path.resolve(__dirname),
    NODE_MODULES = path.resolve(__dirname, 'node_modules'),
    config = {
        entry: APP_DIR + "/index.jsx",
        output: {
            path: (isProd ? BUILD_DIR : ROOT_DIR), //<- This path is use at build time
            filename: "bundle.js", //<- This file is created under path which we specified in output.path
            // publicPath: "/static/" //<- This path is for dev server. you cant see this folder
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Editable',
                template: 'index.ejs',
                filename: ROOT_DIR + '/index.html'
            }), new ExtractTextPlugin({
                // Extracting all css in one file, and file name is based on what you specified in filename
                filename: "style.css",
                allChunks: true
            }), new webpack.ProvidePlugin({
                "React": "react",
            })
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
                exclude: [/node_modules/, /app\/container/,/app\/component/,/app\/libs/,/app\/stores/,/app\/Helpers/,/app\/auth/],
                loader: "babel-loader",
                include: [APP_DIR]
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
