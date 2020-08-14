const compressionPlugin = require("compression-webpack-plugin"); //引入gzip压缩插件
module.exports = {
  chainWebpack: config => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
  },
  transpileDependencies: [],
  productionSourceMap: true,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    compress: true,
    proxy: null
    // configureWebpack: () => {
    //   return {
    //     plugins: [
    //       new compressionPlugin({
    //         test: /\.js$|\.html$|\.css/,
    //         threshold: 10240,
    //         deleteOriginalAssets: false,
    //         filename: "[path].gz[query]",
    //         algorithm: "gzip"
    //         // test: productionGzipExtensions,
    //         // threshold: 2048,
    //         // minRatio: 0.8
    //       })
    //     ]
    //   };
    // }
  }
};
