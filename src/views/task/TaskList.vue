<template>
  <div class="tasklist">
    <div>
      <title-components title="任务列表" icon="el-icon-user"></title-components>

      <!-- <h2>任务列表</h2> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="任务名称">
          <el-input v-model="taskName" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="任务执行人">
          <el-select v-model="formInline.region" placeholder="执行人">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
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
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="desc"
        label="任务描述"
        width="200"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="duration"
        label="任务时长"
        width="100"
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
        width="120"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="任务发布人"
        width="120"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        show-overflow-tooltip
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            new Date(scope.row.createdAt).toLocaleString()
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
        <el-button type="primary" @click="clickreceive">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getlisttaskApi, getreleasetaskApi, getuserinfoApi } from "@/api/api";
import titleComponents from "@/components/TitleComponents.vue";
export default {
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
      info: {},
      taskId: "",
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  components: {
    titleComponents,
  },

  methods: {
    onSubmit() {
      this.getTaskList();
    },
    ///处理时间
    // {{ new Date(scope.row.createdAt).toLocaleString() }}
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
    // 这个是领取任务的方法
    async clickreceive() {
      let res = await getreleasetaskApi({
        userId: [this.info.id],
        taskId: this.taskId,
      });
      if (res.data.status == 1) {
        console.log(res);
        this.dialogVisible = false;
        this.getTaskList();
      }
    },

    receivetask(id) {
      console.log("id", id);
      this.taskId = id;
      // 这里的id是当前点击领取任务的这一条数据的 任务id
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
