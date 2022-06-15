<template>
  <div class="home">
    <el-header class="header">
      <div class="logo align-center">
        <img src="../assets/logo.png" alt="" class="icon-logo ver-al" />
        <span class="exam">考试系统</span>
      </div>
      <div class="Information">
        <span class="">
          山西省 2022-5-1 15:00 周日 21~22℃ 晴 风力:1-2级 风向 无持续风向
        </span>

        <span class="mar-15">
          <img
            src="../assets/icon_avatar.png"
            alt=""
            class="icon-user ver-al"
          />
          <span>{{ data.username || data.phone }} </span>
        </span>
        <span class="mar-15">
          <img src="../assets/power.png" alt="" class="icon-power ver-al" />
          <span @click="retreat">退出</span>
        </span>
      </div>
    </el-header>

    <el-container class="container">
      <el-aside width="200px" class="aside">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#0b1b34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- <el-menu-item index="2" @click="headleClick('regist')">
              <i class="el-icon-menu"></i>
              <span slot="title">注册</span>
            </el-menu-item> -->

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="headleClick('questionbank')"
                  >题库管理</el-menu-item
                >
                <el-menu-item index="1-2">Html题库</el-menu-item>
                <el-menu-item index="1-3" @click="headleClick('jsquestion')"
                  >Js题库</el-menu-item
                >
                <el-menu-item index="1-4">Vue题库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="4" @click="headleClick()">
              <i class="el-icon-document"></i>
              <span slot="title">报名系统</span>
            </el-menu-item>
            <el-menu-item index="5" @click="headleClick('')">
              <i class="el-icon-setting"></i>
              <span slot="title">刷题系统</span>
            </el-menu-item>
            <el-menu-item index="6" @click="headleClick('')">
              <i class="el-icon-setting"></i>
              <span slot="title">匹配比赛</span>
            </el-menu-item>

            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="headleClick('personaldata')"
                  >个人资料</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>我的任务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="headleClick('createtask')"
                  >创建任务</el-menu-item
                >
                <el-menu-item index="1-2" @click="headleClick('tasklist')"
                  >任务列表</el-menu-item
                >
                <el-menu-item index="1-3" @click="headleClick('taskdetails')"
                  >任务详情</el-menu-item
                >

                <el-menu-item index="1-4" @click="headleClick('chatpage')"
                  >聊天页面</el-menu-item
                >
                <el-menu-item index="1-5" @click="headleClick('userlist')"
                  >用户列表</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>角色管理</span>
              </template>
              <el-menu-item index="1-1" @click="headleClick('rolepermissions')"
                >新增角色权限</el-menu-item
              >
              <el-menu-item index="1-2" @click="headleClick('rolemanagement')"
                >权限管理</el-menu-item
              >
              
                <el-menu-item index="1-3" @click="headleClick('permissionconfiguration')"
                >权限配置</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getretreatApi, getUserInfoApi, getloginApi } from "@/api/api";
export default {
  name: "HomeView",
  data() {
    return {
      data: "",
    };
  },
  methods: {
    headleClick(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name: name,
      });
    },
    ///点击退出调退出接口，getretreatApi
    retreat() {
      getretreatApi().then((res) => {
        if (res.data.status == 1) {
          sessionStorage.setItem("token", null);
          this.$router.push({
            name: "login",
          });
        }
      });
    },
  },
  created() {
    ////调用用户信息接口
    getUserInfoApi().then((res) => {
      ////调用成功
      if (res.data.status == 1) {
        ///显示res下面data 的phone值赋值给username
        this.data = res.data.data;
      }
    });
    getloginApi().then((res) => {
      if (res.data.status == 401) {
        this.$router.push({
          name: "login",
        });
      }
    });
  },
};
</script>

<style scoped lang="scss">
.el-main {
  padding: 0 !important;
}
.home {
  min-width: 940px;
  & .header {
    background-color: rgb(48, 121, 236);
    color: #fff;
  }
  & .icon-logo {
    width: 25px;
    padding: 0 5px;
  }
  .exam {
    font-size: 22px;
  }
  el-menu {
    width: 200px;
  }
  // 文字图片居中
  & .ver-al {
    vertical-align: middle;
  }
  & .icon-user {
    width: 40px;
  }
  & .icon-power {
    width: 25px;
  }
  & .mar-15 {
    margin-left: 15px;
  }
  .container {
    height: calc(100vh - 60px);
  }
  .aside {
    background-color: rgb(11, 27, 52);
  }
  .el-col {
    width: 200px;
  }
}
</style>
