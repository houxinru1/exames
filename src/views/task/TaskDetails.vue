<template>
  <div class="taskdetails">
    <el-container>
      <el-aside width="900px">
        <div class="iheader">
          <h3>任务详情</h3>
          <div>
            <el-button size="small" class="el-icon-edit">编辑按钮</el-button>
            <el-button size="small" class="el-icon-upload2">编辑按钮</el-button>
            <el-button size="small" class="el-icon-box">编辑按钮</el-button>
            <el-button size="small" class="el-icon-folder-delete"
              >编辑按钮</el-button
            >
            <el-button size="small" class="el-icon-share">编辑按钮</el-button>
          </div>
        </div>
        <div class="mat-15">简介：{{ data.desc }}</div>
        <div>
          <h3>活动日志</h3>
          <div class="radio">
            全部
            <el-radio-group v-model="reverse">
              <el-radio>只看日志</el-radio>
              <el-radio :label="false">只看评论</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="quill-wrap">
          <quill-editor ref="myQuillEditor" v-model="content" />
        </div>
        <el-button type="primary" class="but">主要按钮</el-button>
      </el-aside>

      <el-main>
        <div>
          <h3>项目</h3>
          <p>{{ data.taskName }}</p>
        </div>
        <div>
          <h3>状态</h3>
          <p>{{ data1.status == 0 ? "失败" : "成功" }}</p>
        </div>
        <div>
          <h3>处理人</h3>
          <p>{{ data.userName }}</p>
        </div>
        <div>
          <h3>所属需求</h3>
          <p>{{ data.desc }}</p>
        </div>
        <div>
          <h3>迭代</h3>
          <p>未规划进迭代</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { gettaskdetailApi } from "@/api/api";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: { quillEditor },
  data() {
    return {
      content: "",
      reverse: true,
      textarea: "",
      activities: [
        {
          content: "盒子组创建了任务",
          timestamp: "2021-12-23 16.14",
        },
        {
          content: "盒子组重新指派任务给盒子组",
          timestamp: "2021-12-23 16.14",
        },
        {
          content: "盒子组更新了处理状态为 已完成",
          timestamp: "2021-12-23 16.14",
        },
        {
          content: "盒子组更新了处理状态为 未开始",
          timestamp: "2021-12-23 16.14",
        },
      ],
      data: "",
      data1: "",
    };
  },
  methods: {
    async gettaskdetail() {
      let res = await gettaskdetailApi({ taskId: this.$route.query.a });
      this.data = res.data.data;
      this.data1 = res.data;
      console.log(res);
      console.log(this.data);
    },
    ///任务列表
  },
  created() {
    this.gettaskdetail();
  },
};
</script>

<style scoped lang="scss">
.taskdetails {
  height: 100%;
  padding: 0 25px;
  .iheader {
    height: 90px;
    border-bottom: 1px solid rgb(217, 215, 215);
  }
  .radio {
    margin-bottom: 20px;
  }
}
.quill-wrap {
  height: 280px;
}
.ql-container {
  min-height: 300px;
}
.quill-editor {
  width: 880px;
  height: 200px;
}
</style>
