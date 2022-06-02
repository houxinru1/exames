<template>
  <div class="login flex-center">
    <div class="popup flex-center">
      <div class="logo align-center">
        <div class="text">
          <div class="icon-logo align-center">m</div>
          <div class="inf">
            <span class="desc">MOBIDEN</span>
            <p class="descs">DIGITIZING INDUSTRIAL.SERVICES</p>
          </div>
        </div>
      </div>

      <div class="form">
        <div>
          <div class="label">USERNAME</div>
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </div>
        <div class="mat-15">
          <div class="label">PASSWORD</div>
          <el-input
            v-model="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
        <div class="mat-15 flex-betwenen">
          <el-input
            v-model="captcha"
            class="captcha"
            placeholder="请输入验证码"
          ></el-input>
          <!-- //  : src为变量 -->
          <!-- <img @click="getcaptcha" :src="captchaSrc" alt="" /> -->
          <captcha-a ref="fff"></captcha-a>
        </div>
        <p class="info">
          <span>忘记密码</span>
          <span @click="headleClick('regist')">注册</span>
        </p>
        <el-button class="btn mat-40" @click="submit">LOG I N</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 登录：
// 用户点击input按钮登录
// 校验input框里的值是否有效
// 如果有效，调用服务端接口
// 服务端验证成功后
// 返回一个token
// 如果前端校验不成功，
// 提示用户一个信息
import { getloginApi } from "@/api/api";
import captchaA from "@/components/CaptchaComponents.vue";

import { encrypt } from "../assets/utils";
export default {
  data() {
    return {
      username: "111222333444",
      password: "123456",
      captcha: "",
      captchaSrc: "/api/captcha",
      config: {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      },
    };
  },
  components: {
    captchaA,
  },
  created() {
    ///进入页面，自动添加回车事件
    window.addEventListener("keydown", this.keydown, true);
  },
  destroyed() {
    ////退出登录页面，清除回车事件
    window.removeEventListener("keydown", this.keydown, true);
  },
  methods: {
    ////跳转页面方法
    headleClick(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },
    keydown(event) {
      ////按下的键等于回车键
      if (event.key == "Enter") {
        this.submit(); //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
        event.preventDefault();
      }
    },

    //校验是否有效
    async submit() {
      var isValidate = this.getResult();
      if (!isValidate) return;
      var res = await getloginApi({
        username: this.username,
        password: encrypt(this.password), // rsa加密
        captcha: this.captcha,
      });
      ////登陆成功，跳转到home页面
      if (res.data.status == 1) {
        this.$message({
          message: "登陆成功",
          type: "success",
        });
        this.token = res.data.data;
        sessionStorage.setItem("token", res.data.data);
        this.$router.push({
          name: "chatpage",
        });
        // 登录失败，提示对应信息，刷新验证码
      } else if (res.data.status !== 1) {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
        // this.getcaptcha();
        ///验证码刷新
        console.log("组件中的属性");
        console.log(this.$refs.fff.captchaSrc);
        this.$refs.fff.getCaptcha();
        // console.log(this.$refs.captcha);
      } else if (res.data.status == 401) {
        this.$router.push({
          name: "login",
        });
      }
    },
    getResult() {
      var res = {
        result: true,
      };
      if (this.username == "") {
        res.result = false;
        res.message = { message: "用户名不能为空", type: "warning" };
      } else if (this.username.length < 6 || this.username.length > 15) {
        res.result = false;
        res.message = {
          message: "用户名长度应该在6——15位之间",
          type: "warning",
        };
      } else if (this.password == "") {
        res.result = false;
        res.message = { message: "密码不能为空", type: "warning" };
      } else if (this.password.length < 6 || this.password.length > 15) {
        res.result = false;
        res.message = { message: "密码长度应该在6——15位之间", type: "warning" };
      } else if (this.captcha == "") {
        res.result = false;
        res.message = { message: "验证码不能为空", type: "warning" };
      } else if (this.captcha.length !== 4) {
        res.result = false;
        res.message = { message: "验证码不正确", type: "warning" };
      }

      if (!res.result) this.$message(res.message);
      return res.result;
    },
    ////点击注册 跳转
    // registration() {
    //   // getregisterApi();
    //   this.$router.push({
    //     name: "regist",
    //   });
    // },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 80vh;
  padding: 50px 0;
  & .popup {
    width: 800px;
    display: grid;
    color: #0c80e7;
    grid-template-columns: 2.7fr 3fr;
    border: 14px solid #1e80e1;
    padding: 40px;
    gap: 0 20px;
    & .logo {
      height: 475px;
      background: #1e80e1;
      color: #fff;
      transform: skewX(-10deg) translateX(40px);
      align-content: center;
      z-index: 100;

      & .icon-logo {
        margin-left: 120px;
        width: 50px;
        height: 50px;
        font-size: 60px;
        padding: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .inf {
        margin-top: 20px;
      }
      & .desc {
        margin-left: 95px;
        font-size: 35px;
      }
      .descs {
        font-size: 10px;
        margin-left: 90px;
      }
    }
    & .form {
      padding: 20px;
      padding-left: 65px;
      min-height: 50%;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      .label {
        padding: 10px 0;
      }
      .btn {
        background: rgb(97, 198, 208);
      }
    }
    & .mat-5 {
      margin-top: 5px;
    }
    .captcha {
      min-width: 80px;
    }
    .info {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
