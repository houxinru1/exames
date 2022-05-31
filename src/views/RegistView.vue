<template>
  <div class="regist flex-center">
    <div class="popup shadow">
      <el-container class="container">
        <el-header class="align-center">注册</el-header>
        <el-main class="main shadow">
          <el-steps class="styles" :active="step" align-center>
            <el-step title="正在注册"></el-step>
            <el-step title="已完成"></el-step>
          </el-steps>
          <div>
            <div v-if="isok">
              <!-- 这里是一个变量  true  或者false -->
              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <el-input
                  class="mat-15"
                  v-model="username"
                  placeholder="请输入账号"
                ></el-input>
              </div>
              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <el-input
                  class="mat-15"
                  v-model="name"
                  placeholder="请输入真实姓名"
                ></el-input>
              </div>
              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <el-input
                  class="mat-15"
                  v-model="password"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </div>

              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <el-input
                  class="mat-15"
                  v-model="passwords"
                  show-password
                  placeholder="请再次输入密码"
                ></el-input>
              </div>
              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <el-input
                  class="mat-15"
                  v-model="email"
                  placeholder="请输入邮箱"
                ></el-input>
              </div>
              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <el-input
                  class="mat-15"
                  v-model="phone"
                  placeholder="请输入电话"
                ></el-input>
              </div>
              <div class="flex-center">
                <span class="cor-red mr-10">*</span>
                <div class="flex-center flex-betwenen">
                  <el-input
                    class="captcha mat-15"
                    v-model="captcha"
                    placeholder="请输入验证码"
                  ></el-input>
                  <img @click="getcaptcha" :src="captchaSrc" />
                </div>
              </div>
              <el-button
                type="primary"
                class="registered mat-15"
                @click="clicksub"
                >注册</el-button
              >
            </div>

            <div v-else class="successful flex-column mat-80">
              <img src="" class="el-icon-circle-check" />
              <p>恭喜您,注册成功,页面将在{{ val }}秒后跳转</p>
              <el-button type="primary" @click="determine">确定</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
// 注册概要设计：
// 1.用户打开页面，输入信息，点击注册按钮
// 2.校验input框里的信息是否正确
//  2.1账号、密码.二次密码、邮箱、手机号、验证码不能为空，
// 2.2.二次输入密码须和第一次密码一致
// 2.3账号、密码须在6-15位，否则提示
// 2.4手机号须为11位数，否则提示
// 3.点击注册，调用注册接口，若注册成功
// 3.1.服务端接口返回成功，步骤条选中第二部分，显示倒计时，跳转home页面
// 3.2.如果服务端返回不成功，提示对应错误
// 4.若直接点击登录，调用登录接口，把token传到sessionStorage后在跳转到home页面
// 5.如果注册失败，提示对应信息

import { encrypt } from "../assets/utils";
import { getloginApi, getregisterApi, getCaptchaApi } from "@/api/api";

export default {
  data() {
    return {
      isok: true, // 这歌 是上边v-if和v-elsed需要的开关
      username: "",
      name: "",
      password: "",
      passwords: "",
      email: "",
      phone: "",
      captcha: "",
      captchaSrc: "/api/captcha",
      val: 3, // 这个是倒计时的秒数  总共3秒倒计时
      step: 1, //  这个是控制 步骤条  第几步的开关  这个  值设置成几  步骤条就是第几部
      timer: null, // 这个就是控制倒计时停止的开关
    };
  },
  methods: {
    ////调用登录接口
    settoken() {
      getloginApi({
        username: this.username,
        password: encrypt(this.password), // rsa加密
        captcha: this.captcha,
      }).then((res) => {
        this.token = res.data.data;
        sessionStorage.setItem("token", res.data.data);
      });
    },

    ///点击注册
    async clicksub() {
      //校验是否有效
      var isEffective = this.getResults();
      if (!isEffective) return;
      var res = await getregisterApi({
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        captcha: this.captcha,
        name: this.name,
      });
      ///注册成功
      if (res.data.status == 1) {
        this.$message({
          message: "注册成功",
          type: "success",
        });
        this.isok = false;
        // 步骤条改成第二步
        this.step = 2;
        // 调用 登录方法  达成登录当前注册的账号的效果
        this.settoken();
        // 倒计时
        this.timer = setInterval(() => {
          this.val--;
          if (this.val == 0) {
            clearInterval(this.timer); //倒计时到0的时候 停止倒计时
            this.$router.push({
              name: "home",
            });
          }
        }, 1000);
        ////注册失败
      }
    },

    getResults() {
      var res = {
        result: true,
      };
      if (
        this.username == "" ||
        this.password == "" ||
        this.passwords == "" ||
        this.email == "" ||
        this.phone == "" ||
        this.captcha == ""
      ) {
        res.result = false;
        res.message = { message: "注册信息不能为空", type: "warning" };
      } else if (this.username.length < 6 || this.username.length > 15) {
        res.result = false;
        res.message = { message: "账号长度应该在6——15位之间", type: "warning" };
      } else if (this.password.length < 6 || this.password.length > 15) {
        res.result = false;
        res.message = { message: "密码长度应该在6——15位之间", type: "warning" };
      } else if (this.passwords !== this.password) {
        res.result = false;
        res.message = { message: "两次密码不一致", type: "warning" };
      } else if (this.phone.length !== 11) {
        res.result = false;
        res.message = { message: "手机号应为11位", type: "warning" };
      } else if (this.captcha.length !== 4) {
        res.result = false;
        res.message = { message: "验证码不正确", type: "warning" };
      }

      if (!res.result) this.$message(res.message);
      return res.result;
    },
    ///点击倒计时页面确定
    determine() {
      this.settoken();
      this.$router.push({
        name: "home",
      });
    },
    ///刷新验证码
    getcaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
  },
};
</script>

<style scoped lang="scss">
.regist {
  height: 100vh;
  background-color: #fefefe;
  & .popup {
    background-color: rgb(248, 248, 250);
    width: 800px;
    // height: 96%;
    border: 2px solid rgb(140, 137, 137);
    padding: 15px 60px;
    .container {
      // height: 600px;
      padding-bottom: 60px;
    }
    & .main {
      background: #fefefe;
      padding: 15px 25%;
      // height: 85%;
      box-sizing: border-box;
    }
    .styles {
      width: 100%;
    }
    .captcha {
      min-width: 80px;
    }
    .cor-red {
      color: #ff4400;
    }
    .registered {
      width: 100%;
    }
    .el-icon-circle-check {
      font-size: 50px;
    }
  }
}
</style>
