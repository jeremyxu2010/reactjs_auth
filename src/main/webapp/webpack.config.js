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

var preLoaders_options = [];
if(!env_prod){
    preLoaders_options.push({
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
    });
}

var postLoaders_options = [];
if(env_prod) {
    postLoaders_options.push({
        loader: 'transform?envify'
    });
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
        preLoaders: preLoaders_options,
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
    jshint: {
        // This option prohibits the use of explicitly undeclared variables. This option is very useful for spotting leaking and mistyped variables.
        undef: true,

        // This option defines globals exposed by modern browsers: all the way from good old document and navigator to the HTML5 FileReader and other new developments in the browser world.
        browser: true,

        // This option defines globals that are usually used for logging poor-man's debugging: console, alert, etc. It is usually a good idea to not ship them in production because, for example, console.log breaks in legacy versions of Internet Explorer.
        devel: false,

        // This option warns when you define and never use your variables. It is very useful for general code cleanup, especially when used in addition to undef.
        unused: true,

        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: true,

        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};