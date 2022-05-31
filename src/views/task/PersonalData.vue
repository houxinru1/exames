<template>
  <div class="paesonaldata">
    <header class="isheader">基本信息</header>

    <main class="main">
      <div class="item">
        <label for="">账号昵称</label>
        <el-input v-model="form.avatarName" placeholder="请输入账号"></el-input>
      </div>
      <div class="item">
        <label for="">真实姓名</label>
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </div>
      <div class="item">
        <label for="">性别</label>
        <div>
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="0">女</el-radio>
        </div>
      </div>
      <div class="item">
        <label for="">手机号</label>
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </div>
      <div class="item">
        <label for="">邮箱</label>
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </div>
      <div class="item">
        <label for="">所在地</label>
        <div class="local">
          <!-- label是给用户看的值，value是给服务端传的值,value要等于v-model -->
          <el-select
            v-model="form.provinceNo"
            @change="handleChangeProvince"
            placeholder="请选择省"
          >
            <el-option
              v-for="item in this.provincedata"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="form.cityNo"
            @change="handleChangeCity"
            placeholder="请选择市"
          >
            <el-option
              v-for="item in this.citydata"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select v-model="form.areaNo" placeholder="请选择区">
            <el-option
              v-for="(item, i) in this.areadata"
              :key="item[i]"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <label for="">简介</label>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.desc"
          maxlength="80"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="button flex-grid">
        <el-button type="primary" round @click="submit">保存</el-button>
        <el-button round>取消</el-button>
      </div>
    </main>
  </div>
</template>

<script>
// 概要设计：
// 1、调用户信息接口 ，获取到data数据，利用data给input框复显
// 2、导入省市区JSON数据，把JSON数据赋值给定义的省列表变量，在控制台输出JSON
// 3、循环JSON数据，把数据item.name放到 ：label中显示出来
// 3.1给省里添加一个change事件
//  3.2、任意选择一个省，在控制台拿到这个省的code及item.children
// 4.循环市的数据，在获取到各市区的数据和code
// 5、
import { getuserupdateApi, getUserInfoApi } from "@/api/api";
import citydata from "@/assets/lib/citydata.json";
export default {
  data() {
    return {
      selectedData: "",
      form: {
        avatarName: "",
        name: "",
        sex: 1,
        phone: "",
        email: "",
        provinceNo: "", ///省编号
        cityNo: "", ///市编号
        areaNo: "", ////区编号
        desc: "",
      },
      value: "",
      data: [],
      ///JSON数据
      provincedata: [], ///渲染省列表
      citydata: [], ///渲染市列表
      areadata: [], ///渲染区列表
    };
  },
  async created() {
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      ///将返回的数据赋值给data
      this.data = res.data.data[0];
    } else if (res.data.status !== 1) {
      this.$message({
        message: res.data.msg,
        type: "warning",
      });
    }
    this.reappearance(); ///复显

    console.log(this.provincedata); ////总json数据
  },
  methods: {
    ////change监听省
    handleChangeProvince(value) {
      this.provincedata.forEach((item) => {
        if (item.code == value) {
          console.log("asjdkl");
          console.log(value); ///省的code
          console.log(item.children);
          this.citydata = item.children;
          ////清空
          this.form.cityNo = "";
          this.form.areaNo = "";
        }
      });
    },

    ////change监听市
    handleChangeCity(newValue) {
      this.citydata.forEach((item) => {
        if (item.code == newValue) {
          ///把市的children赋值给this.areadata 定义的区的变量
          this.areadata = item.children;
          this.form.areaNo = "";
        }
      });
    },

    ////复显
    reappearance() {
      this.provincedata = citydata;
      this.form.avatarName = this.data.avatarName;
      this.form.name = this.data.name;
      this.form.sex = this.data.sex;
      this.form.phone = this.data.phone;
      this.form.email = this.data.email;

      this.form.provinceNo = this.data.provinceNo;
      this.handleChangeProvince(this.form.provinceNo);
      this.form.cityNo = this.data.cityNo;
      this.handleChangeCity(this.form.cityNo);
      this.form.areaNo = this.data.areaNo;
      this.form.desc = this.data.desc;
    },
    ///调用修改信息接口
    async submit() {
      let res = await getuserupdateApi(this.form);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改信息成功",
        });
      }
    },
  },
};

let arr = [1, 8, 96, 72, 48, 9, 35, 79, 666, 111];

function find(arr, cb) {
  let res;
  for (var i = 0; i < arr.length; i++) {
    let n = cb(arr[i]);
    if (n) {
      res = n;
      break;
    }
  }
  return res;
}

let num = find(arr, (a) => a > 5 && a);
console.log(num);
</script>

<style scoped lang="scss">
.paesonaldata {
  .isheader {
    font-weight: bold;
    font-size: 25px;
    padding: 15px 50px;
    border-bottom: 1px solid rgb(211, 209, 209);
  }
  .main {
    display: grid;
    gap: 24px 0;
    padding: 30px 50px;

    .item {
      display: grid;
      grid-template-columns: 75px 800px;
      gap: 20px;
      align-items: center;
    }
    .local {
      display: grid;
      gap: 0 25px;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .button {
    margin-left: 90px;
  }
}
</style>
