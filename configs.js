const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, "dev");
const distPath = path.resolve(__dirname, "dist");
const pageDir = path.resolve(srcRoot, "page");
const mockPath = path.resolve(__dirname, "mock");
const indexJS = 'index.js';

/**
 * 获取文件入口
 */
function getEntry() {
    let entryMap = {};
    fs.readdirSync(pageDir).forEach((pathName) => {
        let fullPathName = path.resolve(pageDir, pathName); // 获取绝对路径
        let stat = fs.statSync(fullPathName);  // 判断是否文件
        let isFile = stat.isFile();
        if (isFile && pathName == indexJS) {
            let fileNameJs = path.resolve(pageDir, indexJS); // 存在单口文件index.js，顶级出口
            entryMap[pathName] = fileNameJs;
        }
        let fileName = path.resolve(fullPathName, indexJS); // 存在入口文件index.js
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathName] = fileName;
        }
    });
    console.log("----------------page index加载列表开始--------------------")
    console.log(entryMap);
    console.log("----------------page index加载列表结束--------------------")
    console.log("@entry文件配置完成");
    return entryMap;
}

/**
 * 文件生成出口
 * @param {*} entryMap 
 */
function getHtmlArray(entryMap) {
    let htmlArray = [];
    console.log("----------------page index 生成列表开始--------------------")
    Object.keys(entryMap).forEach((key) => {
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(key == indexJS ? pageDir : fullPathName, (key == indexJS ? key.substring(0, key.indexOf(".")) : key) + ".html");
        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: ((key == indexJS ? key.substring(0, key.indexOf(".")) : key) + ".html"),
                template: fileName,
                chunks: [key],
                showErrors: true,
                minify: { //对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩
                    removeComments: true, // 去除注释
                    collapseWhitespace: true //是否去除空格
                }
            }));
            console.log(fileName);
        }
    });
    console.log("----------------page index 生成列表结束--------------------")
    console.log("@plugins文件配置完成");
    return htmlArray
}

/**
 * 设置webpack-dev-server 服务器加载的文件路径和端口
 */
function getDevServer() {
    const port = 8080;
    console.log(`@server服务器配置完成 -端口号${port}`);
    return {
        contentBase: devPath,
        port,
        hot: true,
        proxy: {
            "/vote-sys-v1": {
                target: "http://122.14.199.232:8090",
                //target: "http://192.168.1.8:8090",
                changeOrigin: true,
                //pathRewrite: { '^/api': '' }
            }
        }
    }
}

/**
 * 设置output
 */
function getOutput() {
    console.log(`@output配置完成`);
    let outpatch = process.env.NODE_ENV == "build" ? distPath : devPath;
    let _fileNamePath = process.env.NODE_ENV == "build" ? 'js/[name]-[hash:5].js' : '[name]-[hash:5].js';
    return {
        filename: _fileNamePath,
        path: outpatch,
        //publicPath: '/'
    }
}

module.exports = { getEntry, getHtmlArray, getDevServer, getOutput, srcRoot, devPath, pageDir, indexJS, path, fs, distPath };