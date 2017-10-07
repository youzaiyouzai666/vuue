const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'./dist/vuue.js'
    },
    devtool: 'inline-source-map',//开始调试
    module: {
        rules: [
            {
                test:/.js$/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    devServer: {
        contentBase: [path.join(__dirname, "dist"),path.join(__dirname, "example")],
        compress: true,
        openPage: 'index.html',
        port: 8080
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//清理 /dist 文件夹
    ]
};