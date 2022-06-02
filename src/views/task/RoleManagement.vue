<template>
  <div class="rolemanagement">
    <el-container>
      <el-header class="iheader align-center">
        <span class="el-icon-user mr-10"></span>
        <h3>权限管理</h3>
      </el-header>

      <el-container>
        <el-aside width="250px">
          <div class="info">
            <div>
              <span class="el-icon-user"></span>
              <el-link type="primary" @click="headleClick('rolepermissions')"
                >新建角色</el-link
              >
            </div>
            <div>
              <span class="el-icon-s-custom"></span>
              <el-link type="primary">新建分组</el-link>
            </div>
          </div>
          <el-row class="tac">
            <el-col :span="12">
              <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-submenu
                  :index="index + ''"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <template slot="title">
                    <span>{{ item.label }}</span>
                  </template>
                  <el-menu-item-group
                    v-for="(el, index) in item.children"
                    :key="index"
                  >
                    <el-menu-item index="1-1">{{ el.roleName }}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">
              <div class="main">
                
              </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
              <div class="main">
                <div class="setrole">
                  <div class="setrole-role">设置角色对应的功能操作</div>

                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                </div>
                <div class="jurisdiction">
                  <div class="item">
                    <header class="hd">
                      <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        >签名管理</el-checkbox
                      >
                    </header>
                    <div class="main">
                      <div class="main-box">
                        <el-checkbox>签名管理</el-checkbox>
                        <el-checkbox>签名管理</el-checkbox>
                        <el-checkbox>签名管理</el-checkbox>
                      </div>
                      <div class="main-box">
                        <el-checkbox>签名管理</el-checkbox>
                        <el-checkbox>签名管理</el-checkbox>
                        <el-checkbox>签名管理</el-checkbox>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <header class="hd">
                      <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        >全选</el-checkbox
                      >
                    </header>
                    <div class="main">
                      <div class="main-box">
                        <el-checkbox>地址管理</el-checkbox>
                      </div>
                      <div class="main-box">
                        <el-checkbox>转账列表</el-checkbox>
                        <el-checkbox>手动拉取</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <header class="hd">
                      <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        >全选</el-checkbox
                      >
                    </header>
                    <div class="main">
                      <div class="main-box">
                        <el-checkbox>组织成员列表</el-checkbox>
                        <el-checkbox>组织成员列表</el-checkbox>
                        <el-checkbox>组织成员列表</el-checkbox>
                        <el-checkbox>组织成员列表</el-checkbox>
                        <el-checkbox>组织成员列表</el-checkbox>
                      </div>
                      <div class="main-box">
                        <el-checkbox>转账列表</el-checkbox>
                        <el-checkbox>手动拉取</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                      </div>
                      <div class="main-box">
                        <el-checkbox>转账列表</el-checkbox>
                        <el-checkbox>手动拉取</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <header class="hd">
                      <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        >全选</el-checkbox
                      >
                    </header>
                    <div class="main">
                      <div class="main-box">
                        <el-checkbox>地址管理</el-checkbox>
                      </div>
                      <div class="main-box">
                        <el-checkbox>转账列表</el-checkbox>
                        <el-checkbox>手动拉取</el-checkbox>
                        <el-checkbox>手动签名</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getrolelistApi, getroleGrouplistApi } from "@/api/api";
// import { headleClick } from "@/assets/utils/index";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      activeName: "second",
      list: [],
    };
  },
  methods: {
    headleClick(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name: name,
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
  },
  created() {
    Promise.all([getrolelistApi(), getroleGrouplistApi()]).then((res) => {
      let rolelist = res[0].data.data.rows;
      let grouplist = res[1].data.data.rows;
      grouplist.forEach((item) => {
        let children = rolelist.filter((el) => {
          if (item.id == el.groupId) {
            return el;
          }
        });
        this.list.push({
          label: item.groupName,
          children: children,
        });
      });
      console.log(this.list);
    });
  },
};
</script>

<style scoped lang="scss">
.rolemanagement {
  // height: 100%;
  // padding: 15px;
  .iheader {
    border-bottom: 1px solid rgb(234, 232, 232);
  }
  .el-col-12 {
    width: 100%;
  }
  .el-container {
    height: 100%;
  }
  .info {
    margin: 10px 5px;
    display: flex;
    gap: 0 25px;
  }
  .main {
    padding: 0 15px;
  }
  .setrole {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .el-menu-item {
    color: black;
  }
  // .jurisdiction {
  //   // height: 100%;
  //   background: rgb(217, 242, 249);
  // }
  .item,
  .main-box {
    margin-top: 15px;
  }
  .hd {
    padding: 0 30px;
    align-items: center;
    height: 40px;
    line-height: 40px;
    background: #e9eff3;
  }
  .main {
    padding: 0 20px;
  }
  .main-box {
    display: flex;
    gap: 0 50px;
  }
}
</style>
