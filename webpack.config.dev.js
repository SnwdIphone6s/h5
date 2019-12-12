
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    fs
} = require('./configs');
const webpack = require("webpack");

const entryMap = getEntry();
const serverMap = getDevServer();
const outPutMap = getOutput();
const htmlArray = getHtmlArray(entryMap);

const isMock = process.env.NODE_ENV;

module.exports = {
    mode: "development",

    entry: entryMap,

    devServer: serverMap,

    output: outPutMap,

    module: {
        rules: [
            { test: /\.jsx$/, use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }], include: srcRoot },
            { test: /\.js$/, use: [{ loader: "babel-loader" }], include: srcRoot },
            { test: /\.css$/, use: ["style-loader", "css-loader"], include: [path.resolve(__dirname, "node_modules"), srcRoot] },
            { test: /\.scss$/, use: ["style-loader", "css-loader", 'sass-loader'], include: srcRoot },
            { test: /\.(png|jpg|jepg|svg|gif)$/, use: ["url-loader?limit=8192&name=images/[name].[hash].[ext]"], include: srcRoot },
            { test: /\.less$/, use: ["style-loader", 'css-loader', "postcss-loader", "less-loader"], include: [path.resolve(__dirname, "node_modules"), srcRoot] },
        ]
    },

    resolve: {
        modules: [
            'node_modules',
            srcRoot,
        ],
        extensions: [".js", ".json", ".jsx", ".css", ".less"]
    },

    devtool: 'inline-source-map',

    plugins: [
        new CleanWebpackPlugin(),//清理构建文件夹
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(
            {
                'isMock': JSON.stringify(isMock),
                'fs': fs,
                'basePathUrl': JSON.stringify("http://122.14.199.232:8090/upload/")
                //'basePathUrl': JSON.stringify("http://192.168.1.8:8090/upload/")
            },
        )
    ].concat(htmlArray),
}