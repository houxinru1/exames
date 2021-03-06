const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // target: "http://192.168.0.127:7001", ////服务端域名地址
        target: "http://192.168.0.112:7001", // 线上 服务端域名地址
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
