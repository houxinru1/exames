<template>
  <div class="permissionconfiguration">
    <m-title title="权限配置"></m-title>
    <el-button type="danger" plain @click="open">创建</el-button>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.title }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => open(data)">
                增加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
                v-if="!data.children.length"
              >
                删除
              </el-button>
              <el-button type="text" size="mini" @click="() => edit(data)">
                编辑
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <m-title title="提示"></m-title>
        <el-form-item
          label="权限名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="权限类型"
          :label-width="formLabelWidth"
          prop="type"
        >
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="左侧栏" :value="1"></el-option>
            <el-option label="页面" :value="2"></el-option>
            <el-option label="功能" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="catalogue"
          label="所在目录"
          :label-width="formLabelWidth"
          prop="pid"
        >
          <el-select v-model="form.pid" placeholder="请选择所在目录">
            <el-option
              v-for="item in permissionlist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onsubmit" v-if="create"
          >新增</el-button
        >
        <el-button type="primary" @click="submit(data)" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getpermissionlistApi,
  getpermissiondeleteApi,
  getpermissioncreateApi,
  getpermissionupdateApi,
} from "@/api/api";
export default {
  data() {
    return {
      form: {
        id: "",
        title: "",
        type: "",
        pid: null,
      },
      data: [],
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      catalogue: false,
      permissionlist: [],
      rules: {
        title: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择权限类型", trigger: "change" },
        ],
        pid: [
          { required: true, message: "请选择所在目录", trigger: "change" },
        ],
      },
      create: true,
    };
  },

  methods: {
    ///点击弹层修改
    submit(data) {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.getpermissionupdate(data);
          this.getpermissionlist();
        }
      });
    },
    ////点击弹层新增
    onsubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await this.getpermissioncreate();
          this.getpermissionlist();
        }
      });
    },
    empty() {
      this.form = {
        id: null,
        title: "",
        type: "",
        pid: null,
      };
    },
    /////权限配置列表接口
    async getpermissionlist() {
      let res = await getpermissionlistApi({ pagination: false });
      if (res.data.status == 1) {
        console.log(res);
        let permissionlist = res.data.data.rows;
        this.permissionlist = permissionlist;
        ///外面循环一次，里面循环所有，在循环外面一层
        permissionlist.forEach((item) => {
          item.children = permissionlist.filter(
            (child) => child.pid == item.id
          );
        });
        ///在列表中找，没有pid的 为一级 ，第一步循环
        this.data = permissionlist.filter((item) => !item.pid);
      } else {
        alert("获取权限列表失败");
      }
    },
    ////创建接口
    async getpermissioncreate() {
      let res = await getpermissioncreateApi({
        title: this.form.title,
        type: this.form.type,
        pid: this.form.pid,
      });
      if (!res.data.status) return;
      this.$message({
        type: "success",
        message: "创建成功!",
      });
      this.dialogFormVisible = false;
      this.empty();
    },
    ////修改接口
    async getpermissionupdate(data) {
      let res = await getpermissionupdateApi({
        id: this.form.id,
        type: this.form.type,
        title: this.form.title,
        pid: this.form.pid,
      });
      console.log(data);
      if (!res.data.status) return;
      this.$message({
        type: "success",
        message: "修改成功!",
      });
      this.dialogFormVisible = false;
    },
    ////删除接口
    async getpermissiondelete(data) {
      await getpermissiondeleteApi({
        id: data.id,
      });
      console.log(this.data);
    },
    ///点击页面添加
    open(data) {
      this.catalogue = false;
      this.dialogFormVisible = true;
      this.empty(); ///清空列表
      this.form.pid = data.id;
    },
    ///点击页面编辑
    edit(data) {
      this.dialogFormVisible = true;
      this.create = false; ///新增按钮隐藏
      this.form.id = data.id;
      this.form.title = data.title;
      this.form.type = data.type;
      this.form.pid = data.pid;

      this.catalogue = true; ///编辑显示最后一条属性属性
    },
    ///点击删除
    remove(node, data) {
      this.getpermissiondelete(data);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getpermissionlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getpermissionlist();
  },
};
</script>

<style lang="scss" scoped>
.permissionconfiguration {
  padding: 0 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.block {
  width: 50%;
 
  align-content: center;
}
</style>