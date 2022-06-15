<template>
  <div class="tasklist">
    <div>
      <m-title title="任务列表" icon="el-icon-user"></m-title>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="任务名称">
          <el-input v-model="taskName" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="任务执行人">
          <el-select v-model="formInline.region" placeholder="执行人">
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="taskName" label="任务名" align="center">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="任务描述"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="duration"
        label="任务时长"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.duration }}小时</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="levelName"
        label="任务等级"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="任务发布人"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column label="创建时间" show-overflow-tooltip align="center">
        <!-- ///处理时间 new Date(scope.row.createdAt).toLocaleString() -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            formatDate(scope.row.createdAt)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否领取" align="center" width="130">
        <!-- ///判断是否领取 -->
        <template slot-scope="scope">
          <div>{{ scope.row.isReceived == 1 ? "已领取" : "未领取" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-link type="primary" @click="headleClick(scope.row.id)"
            >查看详情</el-link
          >
          <el-link
            type="primary"
            @click="receivetask(scope.row.id)"
            v-if="scope.row.isReceived == 0"
            >领取任务</el-link
          >
          <el-link type="primary" @click="modifytask(scope.row)"
            >修改任务</el-link
          >
          <el-link type="primary">发布任务</el-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确认领取任务？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getReleasetask">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVis">
      <title-components title="修改任务"></title-components>
      <task-form1
        :data="selectedData"
        @submit="taskLogic"
        ref="form"
      ></task-form1>
    </el-dialog>
  </div>
</template>

<script>
import {
  getlisttaskApi,
  getreleasetaskApi,
  getuserinfoApi,
  gettaskupdateApi,
} from "@/api/api";
// import titleComponents from "@/components/TitleComponents.vue";
import TaskForm1 from "@/components/TaskForm1.vue";
import formatDate from "@/mixins/mixin";
export default {
  mixins: [formatDate],
  data() {
    return {
      tableData: [],
      pagination: false,
      count: 0,
      taskName: "",
      total: "",
      pageSize: 10,
      pageNum: 1,
      dialogVisible: false,
      dialogVis: false,
      info: {},
      taskId: "",
      formInline: {
        user: "",
        region: "",
      },
      selectedData: [],
    };
  },
  components: {
    // titleComponents,
    TaskForm1,
  },

  methods: {
    ////点击确定按钮，修改逻辑
    async taskLogic(form) {
      let { name, duration, desc, level, id ,userIds} = form;
      this.taskId=id;
      let res = await gettaskupdateApi({
        id,
        name,
        desc,
        duration,
        level,
      });
      if (res.data.status == 1) {
        this.dialogVis = false;

        ////发布接口
        this.getReleasetask(userIds);
        ////刷新列表
        this.getTaskList();
      }
    },
    ///点击修改任务,打开弹层，调用子组件中的init方法
    modifytask(row) {
      this.dialogVis = true;
      this.selectedData = row;
      this.$nextTick(() => {
        ////调用子组件中init方法
        this.$refs.form.init();
      });
    },
    onSubmit() {
      this.getTaskList();
    },

    //   刚开始的时候   通过点击了 领取任务按钮
    // 然后 点击的时候 传了一个参数  这个参数是当前领取的这一个任务的任务id
    // 拿到这个id之后  先给 实例 中声明一个变量  这个变量的值 就是当前任务的id
    //   打开弹层方法的转换
    headleClick(params) {
      if (this.$route.name == "taskdetails") return;
      this.$router.push({
        name: "taskdetails",
        query: {
          a: params,
        },
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 确定领取任务？弹层确定的逻辑
    async getReleasetask(userIds) {
      let res = await getreleasetaskApi({
        userIds,
        taskId: this.taskId,
      });
      if (res.data.status == 1) {
        console.log(res);
        this.dialogVisible = false;
        this.getTaskList();
      }
    },
    ////点击领取任务，弹出弹框
    receivetask(id) {
      console.log("id", id);
      this.taskId = id;
      // 这里的id是当前点击领取任务的这一条数据的 任务id  [this.info.id]
      this.dialogVisible = true;
    },

    ///查询任务列表
    async getTaskList() {
      let res = await getlisttaskApi({
        taskName: this.taskName,
        pagination: true,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      });
      // console.log(res);
      this.tableData = res.data.data.rows;
      this.count = res.data.data.count;
      this.pageCount = res.data.data.pageCount;
    },
    ///个人信息
    async getUserInfo() {
      let res = await getuserinfoApi({});
      console.log(res);
      this.info = res.data.data;
      console.log(this.info);
    },
    ///分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTaskList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTaskList();
    },
  },
  created() {
    ///任务列表接口
    this.getTaskList();
    ///个人信息
    this.getUserInfo();
  },
};
</script>

<style scoped lang="scss">
.tasklist {
  padding: 0 15px;
}
.el-link {
  margin-right: 5px;
}
</style>
