<template>
  <div class="createtask">
    <div class="content">
      <h1>创建任务</h1>
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
            v-model="desc"
            placeholder="请输入任务描述(非必填)"
          ></el-input>
        </el-form-item>
        <el-form-item label="执行人">
          <el-select
            v-model="executor"
            placeholder="请选择"
            filterable
            multiple
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否紧急">
          <el-switch v-model="level"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>发布成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewtasklist">查看任务列表</el-button>
        <el-button type="primary" @click="clickadd">继续创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getcreatetaskApi, getuserlistApi, getreleasetaskApi } from "@/api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        duration: "",
      },
      desc: "",
      level: false,
      options: [],
      dialogVisible: false,
      taskId: "",
      executor: [],
    };
  },
  methods: {
    viewtasklist() {
      this.$router.push({
        name: "tasklist",
      });
    },

    ///点击立即创建 ，效验inp信息
    async onSubmit() {
      ////校验
      let validate = this.validataFormParams(this.form);
      if (!validate) return;
      let { name, duration } = this.form;
      ///创建任务接口
      let res = await getcreatetaskApi({
        name,
        desc: this.desc,
        duration: Number(duration),
        level: this.level,
      });
      if (res.data.status == 1) {
        this.taskId = res.data.data[0].id;
        ///发布任务接口
        await getreleasetaskApi({
          userId: this.executor,
          taskId: this.taskId,
        });
      }
      this.dialogVisible = true;
    },
    ////校验
    validataFormParams(params) {
      let res = true;
      let rule = {
        name: "任务名称",
        duration: "任务时长",
      };
      for (let key in params) {
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空！",
          });
          res = false;
          break;
        }
        ///判断时长不能为0
        // if (this.form.duration == 0) {
        //   this.$message({
        //     type: "warning",
        //     message: "时长不能为0",
        //   });
        // }
      }

      return res;
    },
    ///点击继续创建
    clickadd() {
      this.dialogVisible = false;
      this.form = "";
    },
  },
  async created() {
    let res = await getuserlistApi({
      pagination: false,
    });
    if (res.data.status == 1) {
      ///用户信息赋值
      this.options = res.data.data.data.rows;
      console.log(res.data.data.data.rows);
    }
  },
};
</script>

<style scoped lang="scss">
.createtask {
  padding: 0 30px;
  & .content {
    width: 700px;
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
