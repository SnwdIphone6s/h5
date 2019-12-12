const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.dev.js');
// @ts-ignore
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
}));

app.listen(3300, function () {
    console.log("@启动express项目成功");
});
