### webSocket 文档

1. npm install vue-socket.io

2. #### 在 main.js 引入 websocket
   import VueSocketIO from 'vue-socket.io'

/_在 main.js 里面进行 配置_/
Vue.use(new VueSocketIO({
debug: true,
connection: 'http://127.0.0.1:7001', //这个地址是服务端地址
}))

3. #### home.vue 这些算是 socket 的钩子函数

   sockets: {
   connect: function () {
   //建立连接后调用的函数
   console.log("socket connected...");
   },
   // message 是服务端返回的信息
   res: function (message) {
   console.log("服务的返回的信息", message);
   },
   // 断开时调用的函数
   disconnect: function () {
   console.log("disconnect!");
   },
   },

4. #### 这个方法是在 点发送信息按钮时调用
   sendSocketMsg() {
   //向服务端发送消息
   this.$socket.emit("server", "这个是向服务端发送的信息");
   }
