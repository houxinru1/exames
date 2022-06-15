<template>
  <div class="createtask">
    <div class="content">
      <!-- <h1>创建任务</h1> -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="任务名称">
          <div class="task-inp">
            <el-input
              v-model="form.name"
              placeholder="请输入任务名称"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="任务时长">
          <div class="task">
            <div class="inp"><el-input v-model="form.duration"></el-input></div>
            <div><span>小时</span></div>
          </div>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="请输入任务描述(非必填)"
          ></el-input>
        </el-form-item>
        <el-form-item label="执行人">
          <el-select
            v-model="form.userIds"
            placeholder="请选择"
            filterable
            multiple
          >
            <el-option
              v-for="item in this.unReceiveUsers" :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否紧急">
          <el-switch v-model="form.level"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getuserlistApi, gettaskdetailApi } from "@/api/api";

export default {
  props: ["data", "submit"],
  data() {
    return {
      // users: [],
      form: {},
      userlist: [],
      dialogVisible: false,
      taskId: 0,
      formdata: [],
      receivedData: [],
      taskdetailData: [],
      userlistData: [],
      unReceiveUsers: [],
    };
  },

  methods: {
    ////把created中的方法封装到init中，在父组件中调用inits
    init() {
      this.initForm()
      this.unReceiveUsers = [];
        this.getUnReceiveUsers(); ///获取未领取的人
    },
    ///清空form表单
    initForm() {
      this.form = {
        name: "",
        duration: '',
        desc: "",
        userIds:[],
        ///判断紧急程度
        level: false,
      };
    },
   
    ///查看任务详情,利用promise.all 调用俩接口，拿到数据，把数据合并
    async getUnReceiveUsers() {
      // console.log(this.data);
      if (this.data !=undefined) {
        let { taskName, duration, desc, level } = this.data
        console.log(this.data);
        this.taskId = this.data.id;
        this.form = {
          name: taskName,
          duration,
          desc, 
          ///判断紧急程度
          level: level == 1 ? true : false,
        };

        let [taskdetail, userlist] = await Promise.all([
          gettaskdetailApi({ taskId: this.taskId }),
          getuserlistApi({ pagination: false }),
        ]);
        let receivedData = taskdetail.data.data.receivedData; ///领取人
        this.userlistData = userlist.data.data.data.rows; ///所有用户
        ////循环所有用户数据
        this.userlistData.forEach((user) => {
          ////循环领取任务的人的数据
          let receiveUser = receivedData.find(
            (receiveUser) => user.id == receiveUser.userId
          );
          ////已领取的人
          if (!receiveUser) this.unReceiveUsers.push(user);

        });
      } else {
        ////否则就是创建，调用用户列表接口，把数据赋值给unReceiveUsers
        let userlist = await getuserlistApi({ pagination: false });
        this.unReceiveUsers = userlist.data.data.data.rows;    ////把所有用户赋值给一个变量
      console.log(  this.unReceiveUsers);       ///未领取任务的人
      }
    },
    ///点击立即创建 ，效验inp信息
    async onSubmit() {
      ////校验
      let validate = this.validataFormParams();
      if (!validate) return;
      let { name, desc, duration, level,userIds } = this.form;
      let params;
      if (this.data) {
        params = {
          userIds,
          id: this.data.id,
          name,
          duration,
          desc,
          ///判断紧急程度
          level: level == 1 ? true : false,
        };
        }else{
            params = {
              userIds,
            name,
            duration,
            desc,
            ///判断紧急程度
            level: level == 1 ? true : false,
          };
      }
      this.$emit("submit", params);
      this.dialogVisible = true;
    },
    // ////校验
    validataFormParams() {
      let res = true;
      let rule = {
        name: "任务名称",
        duration: "任务时长",
        desc: "描述",
        level: "等级",
      };
      for (let key in this.form) {
        if (this.form[key] === "") {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空！",
          });
          res = false;
          break;
        }
      }

      return res;
    },
  },
};
</script>

<style scoped lang="scss">
.createtask {
  padding: 0 30px;
  & .content {
    max-width: 700px;
    .task-inp {
      width: 350px;
    }
  }
  .task {
    display: flex;
    & .inp {
      width: 50px;
    }
  }
}
</style>
