const path = require('path');
const merge = require('../lib/merge');
const utils = require('base-css-image-loader/src/utils');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base');
const config = global.kubevueConfig;

const webpackConfig = merge(baseConfig, {
    output: {
        path: path.join(process.cwd(), 'public'),
        // Use relative public path by default
        publicPath: '',
        filename: '[name].js',
        chunkFilename: 'chunk.[name].[chunkhash:16].js',
    },
});

if (config.entry && config.entry.pages) {
    const entry = {};
    if (config.entry.pages === 'index') {
        entry.bundle = path.resolve(config.srcPath, 'views/index.js');
    } else if (Array.isArray(config.entry.pages)) {
        config.entry.pages.forEach((page) => entry[page] = path.resolve(config.srcPath, 'views', page, 'index.js'));
    }

    if (config.entry.prepend && config.entry.prepend.length)
        utils.prependToEntry(config.entry.prepend, entry);
    if (config.entry.append && config.entry.append.length)
        utils.appendToEntry(config.entry.append, entry);

    webpackConfig.entry = entry;

    Object.keys(entry).forEach((key) => {
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: key + '.html',
            hash: true,
            chunks: config.entry.commons ? ['commons', key] : [key],
            template: config.entry.template || path.resolve(__dirname, 'template.html'),
        }));
    });

    if (config.entry.commons) {
        webpackConfig.plugins.push(
            // Pack the common code of multiple entry chunks into a common chunk
            new webpack.optimize.CommonsChunkPlugin({
                name: 'commons',
                minChunks: 3,
            }),
            // Pack the common code of the child chunk into the parent chunk
            new webpack.optimize.CommonsChunkPlugin({
                children: true,
                minChunks: 3,
            }),
        );
    }
}

module.exports = webpackConfig;
