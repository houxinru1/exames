<template>
  <div class="jsquestion">
    <div class="classification">
      <div class="exam">
        <span>所属题型：</span>
        <el-button round class="active">全部</el-button>
        <el-button round>单选题</el-button>
        <el-button round>多选题</el-button>
        <el-button round>判断题</el-button>
        <el-button round>排序题</el-button>
      </div>
      <div class="form mat-20">
        <span>难易程度：</span>
        <el-button round class="active">全部</el-button>
        <el-button round>简单</el-button>
        <el-button round>中等</el-button>
        <el-button round>困难</el-button>
      </div>
      <div class="paper mat-20">
        <div>
          <el-button type="primary" @click="showDialog">添加习题</el-button>
          <el-button type="primary">批量导入</el-button>
          <el-button type="primary">加入公共习题库</el-button>
        </div>
        <div class="inp">
          <el-input placeholder="请输入内容" suffix-icon="el-icon-search">
          </el-input>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="item" v-for="item in this.data" :key="item.id">
        <div class="ontext">
          <div class="headers">
            <div class="createtime">
              <span>创建时间:{{ formatDate(item.createdAt) }} </span>
              <div class="textterm">
                <span class="term">{{ formatType(item.type) }}</span>
                <span class="tongjuan">{{ formatLevel(item.level) }}</span>
              </div>
              <div class="mal-60">使用次数:18次</div>
            </div>
            <div class="iconimg">
              <span class="el-icon-document" @click="showDialog(item)"></span>
              <span
                class="el-icon-delete"
                @click="open(item.id, item.type)"
              ></span>
            </div>
          </div>
          <div class="titles">
            <el-checkbox>{{ item.title }} </el-checkbox>
          </div>
          <div class="ioptions">
            <!-- ////单选框选值与答案绑定 -->
            <el-radio disabled v-model="item.answer" label="A">{{
              item.questionA
            }}</el-radio>
            <el-radio disabled v-model="item.answer" label="B">{{
              item.questionB
            }}</el-radio>
            <!-- ////如果有C D选项就显示没有就不显示 -->
            <el-radio
              v-if="item.questionC"
              disabled
              v-model="item.answer"
              label="C"
              >{{ item.questionC }}</el-radio
            >
            <el-radio
              v-if="item.questionD"
              disabled
              v-model="item.answer"
              label="D"
              >{{ item.questionD }}</el-radio
            >
          </div>
          <div class="answers">
            <span> 答案:</span>
            <span>{{ item.answer }}</span>
          </div>
        </div>
        <div class="downtext">
          <div>
            所属知识点:
            <span class="mal-50">知识点一</span>
            <span class="mal-50">知识点一</span>
            <span class="mal-50">知识点一</span>
          </div>
          <div class="">
            <div>解析: <span class="mal-50">这是解析字段</span></div>
          </div>
        </div>
      </div>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20, 25]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalcount"
        >
        </el-pagination>
      </div>
    </div>
    <!-- ///////新增弹框 -->
    <el-dialog
      v-show="dialogVisible"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
    >
      <div class="form">
        <div class="initem">
          <label class="label" for="">标题题目</label>
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </div>
        <div
          class="initem"
          v-for="(option, index) in questionOptions"
          :key="option.id"
        >
          <label for="">{{ option.label }} </label>
          <el-input v-model="option.value" placeholder="请输入选项"></el-input>
          <!-- ///////让加号在最后一个 和 索引小于3显示 -->
          <div>
            <span
              v-if="index == questionOptions.length - 1 && index < 3"
              class="el-icon-circle-plus-outline mr-10"
              @click="addicon"
            ></span>
            <!-- ////让减号在索引大于1 和 最后一个显示 -->
            <span
              v-if="index > 1 && index == questionOptions.length - 1"
              class="el-icon-remove-outline"
              @click="removeicon"
            ></span>
          </div>
        </div>
        <!-- <div class="initem">
          <label for="">选项B</label>
          <el-input v-model="form.questionB"></el-input>
        </div>
        <div class="initem">
          <label for="">选项C</label>
          <el-input v-model="form.questionC"></el-input>
        </div>
        <div class="initem">
          <label for="">选项D</label>
          <el-input v-model="form.questionD"></el-input>
        </div> -->
        <div class="initem mat-15">
          <label for="">答案</label>
          <el-select v-model="form.answer" placeholder="请选择">
            <el-option
              v-for="item in questionOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="initem mat-15">
          <label for="">难易程度</label>
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in leveloptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 概要设计：
// 1.用户点击js题库，调用题库列表接口，默认渲染10条数据
// 2、用户可以手动设置每页展示5,10,15,20,30,50条,设置之后每次进来都展示设置条数。
// 3.用户点击题库管理，可以创建题目， 目前只支持创建单选题，单选题最多4个答案，最少传两个；还要设置正确答案和困难等级；
// 5.如果用户有未填项，则提示用户 请设置xxx后在提交 (xxx代表的哪一项没有填，如果答案没有填，则提示用户 请设置答案后在提交！)
// 6.用户点击icon图删除按钮，调用删除接口删除当前题目，提示用户是否确定删除，确认！取消！
// 7.用户可以手动编辑当前行的题目，进行修改；修改逻辑和规则和创建相同；
// index=questionOptions.length-1 最后一条
import {
  getquestionApi,
  getdeleteApi,
  getcreateApi,
  getupdateApi,
} from "@/api/api";
///处理年月日天
import formatDate from "@/mixins/mixin";
export default {
  mixins: [formatDate],
  data() {
    return {
      label: "",
      title: "",
      form: {
        type: 1,
        title: "",
        questionA: "",
        questionB: "",
        answer: "",
        level: "",
      },
      leveloptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "中等",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      options: [
        {
          value: "A",
          label: "选项A",
        },
        {
          value: "B",
          label: "选项B",
        },
        {
          value: "C",
          label: "选项C",
        },
        {
          value: "D",
          label: "选项D",
        },
      ],
      questionOptions: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
        },
        //
      ],
      questionOptionTemp: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: "",
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: "",
        },
      ],
      value: "",
      radio: "1",
      type: "",
      id: "",
      data: "",
      totalcount: 0,
      pgCount: 0, ////共多少页
      dialogVisible: false, ///弹窗
      alogVisible: false, ////确定修改按钮
      index: "",
      questionList: [],
      pageNum: 1,
      pageSize: 10,
      answer: "",
      isCreateEvent: true,
      selectedData: {},
    };
  },
  methods: {
    ////点减号减少inp框
    removeicon() {
      this.questionOptions.pop();
    },

    ///点击加号图
    addicon() {
      var ioptions = [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: "",
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: "",
        },
      ];
      let option = JSON.parse(JSON.stringify(ioptions));
      /////把ioptions里索引的值push到 questionOptions  ///this.questionOptions.length长度为2 、3
      this.questionOptions.push(option[this.questionOptions.length]);
    },

    ////点击图标 弹出弹层、 修改复显
    showDialog(data) {
      this.dialogVisible = true;
      this.initFormParams(); ////清空
      console.log(data); ///当前行的数据
      //////判断弹层是修改还是新增，新增会拿到一个dom
      let isCreateEvent = data instanceof PointerEvent;
      if (isCreateEvent) {
        this.isCreateEvent = true;
      } else {
        /////修改复显
        this.selectedData = data; //////当前数据赋值给selectedData
        this.isCreateEvent = false;
        this.form.title = data.title;
        let questionOptions = JSON.parse(
          JSON.stringify(this.questionOptionTemp)
        );
        questionOptions[0].value = data.questionA;
        questionOptions[1].value = data.questionB;
        questionOptions[2].value = data.questionC;
        questionOptions[3].value = data.questionD;
        this.questionOptions = questionOptions.filter((item) => item.value);
        this.form.answer = data.answer;
        this.form.level = data.level;
      }
    },

    ///////分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getDatainfo();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getDatainfo();
    },
    ////////
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },

    formatType(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
      }
    },
    formatLevel(val) {
      switch (val) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    ////清空form表单值
    initFormParams() {
      this.form = {
        type: 1,
        title: "",
        questionA: "",
        questionB: "",
        answer: "",
        level: "",
      };
      this.questionOptions = [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
        },
        //
      ];
      // this.questionOptions = this.questionOptionsTemp.slice(0, 2);
      this.answer = "";
    },
    ////服务端要的那个创建题目和 修改的入参
    formCreateParams() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.form.answer;
      res.level = this.form.level;
      ////如果不是新建，把data.id赋值给res.id
      if (!this.isCreateEvent) res.id = this.selectedData.id;
      return res;
    },

    ////校验
    validataFormParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度",
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
      }
      return res;
    },
    /// 点击确定按钮. 判断是增加还是修改，对应操作
    async submit() {
      const params = this.formCreateParams();
      let validate = this.validataFormParams(params);
      if (!validate) return;
      let successMag = "";
      let res;
      ///////修改删除C D选项，页面也消失
      if (!params.questionC) params.questionC = "";
      if (!params.questionD) params.questionD = "";
      if (this.isCreateEvent) {
        res = await getcreateApi(params);
        successMag = "新增成功";
      } else {
        res = await getupdateApi(params);
        successMag = "修改成功";
      }
      if (res.data.status == 1) {
        this.getDatainfo(); ////渲染列表
        this.$message({
          type: "success",
          message: successMag,
        });
        this.dialogVisible = false;
      }
    },

    ///删除题
    // 点击删除按钮，获取当前行的数据，把当前行的数据id和type传给服务端，服务端返回成功后刷新列表：结束
    open(isid, istype) {
      // isid 这个isid是通过上边html代码里的垃圾桶图标上的点击事件 传的item.id
      // istype 也是通过上边传的 item.type
      this.$confirm("删除该题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.isdelete(isid, istype); //这个是调用一下删除的接口 这里的这两个参数 传给删除接口  因为删除接口需要根据这两个参数调用接口
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getDatainfo(); //这个是重新调用一下查询的接口  达成刷新的目的
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    isdelete(id, type) {
      // 然后 这里的 id 和 type 都是通过 open这个方法里的 .then() 这个方法里的 this.isdelete(isid,istype)方法 时传过来的参数
      // 这个是调取删除的接口
      getdeleteApi({
        id: Number(id), // 正常来说  这里的参数不是 key：val 的格式么  然后es6的新式语法是 如果key和val的单词完全一样 key后边的:val可以省略不写
        type: Number(type),
      });
    },
    //////查询 渲染列表
    getDatainfo() {
      const { pageSize, pageNum } = this;
      getquestionApi({
        type: 1,
        pageSize,
        pageNum,
      }).then((res) => {
        this.data = res.data.data.rows;
        this.totalcount = res.data.data.count;
        this.pgCount = res.data.data.pageCount;
      });
    },
  },
  /////监听questionOptions,如果这个json变化就会走watch
  watch: {
    questionOptions(newValue) {
      ///循环questionOptions ，找到里面的key是否等于form.answer，
      let res = newValue.find((item) => item.key == this.form.answer);
      this.form.answer = res ? res.key : "";
      // console.log(res);
    },
  },
  created() {
    this.initFormParams();
    this.getDatainfo();
  },
};
</script>

<style scoped lang="scss">
.jsquestion {
  border: 1px solid rgb(223, 219, 219);
  padding: 15px 22px 35px 22px;
  margin-bottom: 35px;
  .classification {
    margin-bottom: 25px;
    background-color: #f9f9f9;
    padding: 20px 15px;
  }
  .active {
    //强制执行
    color: red !important;
    border: 1px solid red;
  }
  .paper {
    display: flex;
    justify-content: space-between;
  }
  .exam .el-button,
  .form .el-button {
    background-color: #f9f9f9;
    color: #9a9898;
    line-height: 0;
    height: 15px;
  }
  .inp {
    width: 250px;
  }
  .main {
    min-width: 700px;
  }
  .item {
    border: 1px solid #e0e0e0;
    padding: 15px 20px;
    margin-bottom: 25px;
    .headers {
      color: #cdcccc;
      display: flex;
      justify-content: space-between;
      gap: 0 20px; /////div之间的距离  y轴  x轴
      padding: 12px 0;
    }
    .createtime {
      display: flex;
      gap: 0 20px;
    }
    .term {
      padding: 3px;
      text-align: center;
      font-size: 10px;
      background-color: #f45945;
      color: #fff;
    }
    .tongjuan {
      padding: 3px 7px;
      color: #fff;
      text-align: center;
      font-size: 10px;
      background: linear-gradient(#72d98f, #72d9cb);
    }
    .iconimg {
      color: black;
      display: flex;
      font-size: 20px;
      gap: 0 20px;
    }
  }
  .ontext {
    border-bottom: 1px dashed #cdcccc;
  }
  .titles {
    padding: 12px 0;
  }
  .answers {
    padding: 12px 40px;
  }
  .ioptions {
    display: flex;
    gap: 0 70px;
    padding: 12px 40px;
  }
  .downtext {
    padding: 13px 0;
    color: #cdcccc;
  }
  .paging {
    display: flex;
    justify-content: flex-end;
    padding: 15px 0;
  }
  .textterm {
    display: flex;
    gap: 0 20px;
  }
  .popup {
    align-content: center;
    width: 650px;
    background-color: rgb(251, 240, 242);
    margin-top: 20px;
    padding: 20px;
    & .lable {
      width: 600px;
      display: flex;
      align-items: center;
    }
    .islable {
      width: 100px;
    }
  }
  .dialog {
    ::v-deep .el-dialog {
      min-width: 450px !important;
    }
    & .form {
      display: flex;
      flex-direction: column;
      gap: 20px 0;
      & .initem {
        display: grid;
        grid-template-columns: 60px auto 50px;
        gap: 0 10px;
      }
    }
  }
}
</style>
