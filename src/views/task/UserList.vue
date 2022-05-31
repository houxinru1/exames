<template>
  <div class="userlist">
    <el-table
      ref="multipleTable"
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column
        prop="avatarName"
        label="昵称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="id" label="Id" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="真实姓名"
        width="180"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="sex"
        label="性别"
        width="120"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.sex == 0 ? "女" : "男" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="180"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="desc"
        label="个人介绍"
        show-overflow-tooltip
        align="center"
        width="270"
      >
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getuserlistApi } from "@/api/api";
export default {
  data() {
    return {
      data: [],
      pageSize: 10,
      pageNum: 1,
      count: 0,
      //   total: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getuserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getuserList();
    },

    async getuserList() {
      let { pagination, pageSize, pageNum } = this;
      let res = await getuserlistApi({
        pagination,
        pageSize,
        pageNum,
      });
      console.log(res);
      this.data = res.data.data.data.rows;
      this.count = res.data.data.data.count;
    },
  },
  created() {
    ///查询用户列表接口
    this.getuserList();
  },
};
</script>

<style lang="scss" scoped>
.userlist {
  padding: 15px;
}
.el-link {
  margin-right: 5px;
}
</style>
