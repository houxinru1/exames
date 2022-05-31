<template>
  <div class="rolepermissions">
    <div class="container">
      <header>
        <h2>新增角色权限</h2>
        <el-link type="primary">系统管理 * 角色与权限 * 新增角色权限</el-link>
      </header>
      <main>
        <div class="form">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="角色名称">
              <el-input
                v-model="roleName"
                placeholder="输入新增角色名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select v-model="groupId" placeholder="请选择">
                <el-option
                  v-for="item in data"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="onSubmit" class="but"
            >确认新增</el-button
          >
        </div>
        <div>
          <el-checkbox>选择所有权限</el-checkbox>
        </div>
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
      </main>
    </div>
  </div>
</template>

<script>
import { getroleGrouplistApi, getrolecreateApi } from "@/api/api";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      checked: true,
      cities: cityOptions,
      isIndeterminate: true,
      checkAll: "",
      data: [],
      groupId: "",
      roleName: "",
    };
  },
  methods: {
    async onSubmit() {
      console.log(this.groupId);
      let res = await getrolecreateApi({
        roleName: this.roleName,
        groupId: this.groupId,
      });
      console.log(res);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    ///角色分组列表
    async roleGrouplist() {
      let res = await getroleGrouplistApi({});
      if (res.data.status == 1) {
        console.log(res);
        this.data = res.data.data.rows;
      }
    },
  },
  created() {
    ///角色分组列表
    this.roleGrouplist();
  },
};
</script>

<style scoped lang="scss">
.rolepermissions {
  height: 100%;
  padding: 0 20px;
  .container {
    // height: 100%;
    padding: 10px 0;
  }
  header {
    height: 60px;
    display: flex;
    .el-link {
      margin-left: 15px;
    }
  }
  .but {
    height: 40px;
  }
  main {
    height: calc(100% - 60px);
    padding: 0 20px;
    background: rgb(255, 252, 253);

    .form {
      display: flex;
      min-width: 700px;
    }
    .item,
    .main-box {
      margin-top: 15px;
    }
    .hd {
      padding: 0 10px;
      align-items: center;
      height: 55px;
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
}
</style>
