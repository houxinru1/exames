const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.0.121:7001", ////服务端域名地址
        // target: "http://192.168.0.123:7001", // 线上 服务端域名地址
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
