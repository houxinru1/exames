<template>
  <div class="createtask">
    <m-title title="创建任务"></m-title>
    <task-form1 ref="task" @submit="taskLogic"></task-form1>
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
import { getcreatetaskApi, getreleasetaskApi, getuserlistApi } from "@/api/api";
import TaskForm1 from "@/components/TaskForm1.vue";

export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    TaskForm1,
  },
  methods: {
    async taskLogic(form) {
      let { name, duration, desc, level } = form;
      // /创建任务接口
      let res = await getcreatetaskApi({
        name,
        desc,
        duration: Number(duration),
        level,
      });
      if (res.data.status == 1) {
        this.taskId = res.data.data[0].id;
        await getreleasetaskApi({
          userIds: this.$refs.task.executor,
          taskId: this.taskId,
        });
        form = "";
        this.$refs.task.executor = [];
      }
      this.dialogVisible = true;
    },
    ////点击查看任务列表
    viewtasklist() {
      this.$router.push({
        name: "tasklist",
      });
    },
    ///点击继续创建
    clickadd() {
      this.$nextTick(() => {
        this.$refs.task.initForm();
      });
    },
    async getuserlist(){
      let res=await getuserlistApi({ pagination: false })
      if(res.data.status==1){
        console.log(res);
      }
    }
  },
  created(){
    this.getuserlist()
      this.$nextTick(() => {
        this.$refs.task.init();
      });
  }
};
</script>

<style scoped lang="scss"></style>
