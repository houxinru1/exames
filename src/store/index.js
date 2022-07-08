import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoApi } from "../api/api";
// import user from "./modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
  ///存变量的地方
  state: {
    imageUrl:{},  
  },
  ///
  getters: {
  },
  mutations: { 
    imageUrl(state,b){  
      // console.log(b);
      state.imageUrl=b
    },
  },
  actions: {
    getUserInfoApi(){
      return getUserInfoApi()
    }
  },
  modules: {
  }
})
