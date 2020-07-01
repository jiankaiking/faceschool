module.exports = {
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    compress: true,
    proxy:null,
    // configureWebpack: {
    //   externals: {
    //     vue: "Vue",
    //     vuex: "Vuex",
    //     "vue-router": "VueRouter",
    //     "element-ui": "ELEMENT"
    //   }
    // }
  }
};
