var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env_prod = process.env.NODE_ENV === 'production';

var output_options = {
    path: __dirname + '/assets/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets/'
};
var plugins_options = [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new ExtractTextPlugin('[name].css', {allChunks: true})
];
if(!env_prod){
    plugins_options.push(new webpack.SourceMapDevToolPlugin({
        test:      /\.(js|css)($|\?)/i,
        filename: 'maps/[file].map'
    }));
}
if(env_prod){
    plugins_options.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));

    plugins_options.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));
}

var postLoaders_options = [];
if(env_prod) {
    postLoaders_options = [{
        loader: 'transform?envify'
    }];
}

module.exports = {
    entry: {
        main: __dirname + '/src/js/main.jsx',
        vendor: [
        'react',
        'react/addons',
        'react-router',
        'react-bootstrap',
        'keymirror',
        'flux',
        'lodash',
        'immutable',
        'events',
        'react-classset',
        'jwt-decode',
        'inherits',
        'reqwest',
        'when']
    },
    output: output_options,
    plugins: plugins_options,
    debug: !env_prod,
    cache: !env_prod,
    watch: !env_prod,
    module: {
        postLoaders: postLoaders_options,
        loaders: [{
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony!strict'
        }, {
            test: /\.js$/,
            loader: 'strict'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!autoprefixer-loader")
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!autoprefixer-loader!less-loader")
        }, {
            test: /\/fonts\/.*\.(woff|woff2|ttf|eot|svg)$/,
            loader: "url-loader"
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192'
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};