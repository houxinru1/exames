import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../src/common.css";
import VueSocketIO from "vue-socket.io";
import TitleComponents from '@/components/TitleComponents';

Vue.use(ElementUI);
///全局标题
Vue.component('m-title',TitleComponents)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: "http://192.168.0.121:7001", //这个地址是服务端地址
    // connection: "http://192.168.0.123:7001", // 线上 服务端域名地址
  })
);
