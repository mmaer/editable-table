const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: [
        './src/main/index',
    ],
    output: {
        path: resolve(__dirname, 'dist', 'www', 'static'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                IS_WEBPACK: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production'),
                RUN_MODE: JSON.stringify('es'),
            },
        }),
        new CleanWebpackPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    optimization: {
        runtimeChunk: 'multiple',
        splitChunks: {
            chunks: 'all',
        },
        moduleIds: 'hashed',
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    mangle: true,
                    compress: {
                        warnings: true,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: resolve(__dirname),
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        fs: '{}',
        'https-proxy-agent': '{}',
        module: '{}',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};