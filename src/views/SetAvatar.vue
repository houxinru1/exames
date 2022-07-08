<template>
  <div class="setavatar">
    <el-upload
      class="avatar-uploader"
      action="api/upload/image"
      :data="{ type: 2 }"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div class="head-portrait">
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <!-- <div class="custom"> -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <!-- </div> -->
        <div class="system-avatar" v-for="(item,index) in avatarlist" :key="index">
          <img :src="item.url" class="avatar" />
        </div>
      </div>
    </el-upload>
    <el-button type="primary" size="small" @click="clickdialog"
      >确定修改</el-button
    >

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否修改</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getuserupdateApi, getavatarlistApi } from "../api/api";
export default {
  data() {
    return {
      imageUrl: "",
      dialogVisible: false,
      avatarImg: "",
      image: "",
      avatarlist: [],
    };
  },
  methods: {
    ///上传成功的钩子函数
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatarImg = res.data;
    },
    ///上传文件之前的钩子函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 200;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2kB!");
      }
      return isJPG && isLt2M;
    },
    ///信息接口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    clickdialog() {
      this.dialogVisible = true;
    },
    ////用户信息接口
    getUserInfo() {
      this.$store.dispatch("getUserInfoApi").then((res) => {
        console.log(res.data.data);
        this.imageUrl = res.data.data.avatarImg;
        this.image = res.data.data;
        /////把最新的用户信息存到vux
        this.$store.commit("imageUrl", this.image);
      });
    },
    ///点击弹层里确定
    async handleclick() {
      ////更新用户头像
      await getuserupdateApi({ avatarImg: this.avatarImg });
      ///获取到最新用户信息
      this.getUserInfo();
      this.dialogVisible = false;
    },
    ///返回头像列表
    async getavatarlist() {
      let res = await getavatarlistApi();
      this.avatarlist = res.data.data;
      console.log(this.avatarlist);
    },
  },
  created() {
    this.getUserInfo();
    this.getavatarlist();
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-bottom: 10px;
}
.setavatar {
  padding: 25px 25px;
}
.head-portrait {
  display: flex;
  gap: 0 10px;
  flex-wrap: wrap;

}

</style>