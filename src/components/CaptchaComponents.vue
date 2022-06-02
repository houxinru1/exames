<template>
  <div>
    <img :src="captchaSrc" alt="" @click="getCaptcha" />
  </div>
</template>
<script>
import { getCaptchaApi } from "@/api/api";
export default {
  data() {
    return {
      captchaSrc: "",
    };
  },
  methods: {
    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    // getVale() {
    //   console.log("我是captcha组件中的获取方法");
    // },
  },
  created() {
    this.getCaptcha();
  },
};
</script>
