
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    getEntry,
    getHtmlArray,
    getDevServer,
    getOutput,
    srcRoot,
    devPath,
    pageDir,
    indexJS,
    path,
    fs,
    distPath
} = require('./configs');
const webpack = require("webpack");

const entryMap = getEntry();
const serverMap = getDevServer();
const outPutMap = getOutput();
const htmlArray = getHtmlArray(entryMap);

const isMock = process.env.NODE_ENV;

module.exports = {
    mode: "production",

    entry: entryMap,

    output: outPutMap,

    module: {
        rules: [
            { test: /\.jsx$/, use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }], include: srcRoot },
            { test: /\.js$/, use: [{ loader: "babel-loader" }], include: srcRoot },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"], include: [path.resolve(__dirname, "node_modules"), srcRoot] },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'], include: srcRoot },
            { test: /\.(png|jpg|jepg|svg|gif)$/, use: ["url-loader?limit=8192&name=images/[name].[hash].[ext]"], include: srcRoot },
        ]
    },

    resolve: {
        modules: [
            'node_modules',
            srcRoot,
        ],
        extensions: [".js", ".json", ".jsx", ".css", ".less"]
    },

    plugins: [
        new CleanWebpackPlugin(),//清理构建文件夹
        new webpack.DefinePlugin(
            {
                'isMock': JSON.stringify(isMock),
                'fs': fs,
                'basePathUrl': JSON.stringify("http://122.14.199.232:8090/upload/")
            },
        ),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        })
    ].concat(htmlArray),
}