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
            :src="this.$store.state.imageUrl.avatarImg" 
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
            unique-opened
          >
            <el-submenu
              :index="item.name"
              v-for="item in menu"
              :key="item.name"
              
            >
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{ item.label }} </span>
              </template>

              <el-menu-item
                :index="child.name"
                @click="headleClick(child.name)"
                v-for="child in item.children"
                :key="child.name"
                >{{ child.label }}
              </el-menu-item>
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
import { getretreatApi, getloginApi } from "@/api/api";
import menu from "@/config/menu.config";
export default {
  name: "HomeView",
  data() {
    return {
      data: "",
      menu,
      
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
    this.$store.dispatch('getUserInfoApi').then(res=>{
      console.log(res);
       if (res.data.status == 1) {
         ///显示res下面data 的phone值赋值给username
        this.data = res.data.data;   
       this.$store.commit('imageUrl',res.data.data)
        console.log(this.$store.state.imageUrl);
      } else {
        this.$router.push({
          name: "login",
        });
      } 
    })
   
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
