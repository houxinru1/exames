<template>
  <div class="box">
    <div class="grid">
      <div class="calendar">
        <div class="notice">日历</div>
        <el-calendar :range="['2022-05-01', '2022-06-01']"> </el-calendar>
      </div>
      <div class="task">
        <div class="notice">今日任务</div>
        <div class="tasklist">
          <el-checkbox>Working on Asla Project </el-checkbox>
          <el-checkbox>Team Meeting</el-checkbox>
          <el-checkbox>Doing Research</el-checkbox>
        </div>
      </div>
    </div>
    <div class="chat">
      <div>
        <div class="notice">通知</div>
        <div class="chatmain">
          <div class="el-icon-edit-outline flex-column"></div>
          <div class="timer">
            <div class="assign">XXX给你发了一条任务</div>
            <p>description-timer</p>
            <el-button type="warning" round>立即领取</el-button>
          </div>
          <div>
            <img class="icon-yuan" src="../../assets/yuan.png" alt="" />
          </div>
        </div>
      </div>

      <div class="teamchat">
        <div class="chatinfo">
          <div class="notice">团队聊天</div>
          <span class="chatpop">当前总人数：{{ userCount }}人</span>
        </div>

        <div class="ischat">
          <div class="chats">
            <div v-for="(item, index) in textArr" :key="index">
              <div
                class="item main"
                ref="talkchat"
                v-if="data.id == item.userId"
              >
                <div class="infor">
                  <span class="item-msg">{{ item.msg }}</span>

                  <span class="username">{{
                    item.avatarName.substring(0, 1)
                  }}</span>
                </div>
              </div>
              <div class="item" ref="talkchat" v-else>
                <div class="infor">
                  <span class="username">{{
                    item.avatarName.substring(0, 1)
                  }}</span>
                  <span class="item-msg">{{ item.msg }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <el-input placeholder="请输入内容" v-model="msg"></el-input>
          <el-button round @click="sendSocketMsg">发送信息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/api/api";
export default {
  data() {
    return {
      checked: "",
      ////调用用户信息，返回的数据
      data: {},
      msg: "",
      textArr: [],
      userCount: "",
    };
  },
  ///出参调用 sockets
  sockets: {
    ////建立链接
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
      ///进入聊天
      this.$socket.emit("addUser", {
        userId: this.data.id, //用户ID
        avatarName: this.data.avatarName,
      });
    },
    ///聊天室人数
    userCount: function (msg) {
      console.log("当前聊天室人数" + msg);
      this.userCount = msg;
    },
    // 接收消息
    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
      ////跳到最后一条消息
      this.$nextTick(() => {
        let talk = this.$refs.talkchat; // console.log("this.$nextTick ~ talk", talk);
        talk[talk.length - 1].scrollIntoView(false);
      });
    },
    ///断开链接
    disconnect: function () {
      console.log("disconnect!");
      this.$socket.emit("removeUser", {
        userId: this.textArr.userId, //用户ID
        avatarName: this.textArr.avatarName, //
      });
    },
  },
  methods: {
    ////点击发送
    sendSocketMsg() {
      //向服务端发送消息
      this.$socket.emit("sendMsg", {
        userId: this.data.id, //用户ID
        avatarName: this.data.name,
        msg: this.msg,
      });
      if (!this.msg) {
        this.$message({
          type: "warning",
          message: "消息不能为空",
        });
      }
      //inp框清空
      this.msg = "";
    },
  },
  async created() {
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      ///将返回的数据赋值给data
      this.data = res.data.data[0];
      console.log(this.data);
    } else if (res.data.status !== 1) {
      this.$message({
        message: res.data.msg,
        type: "warning",
      });
    }
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-calendar-day {
  text-align: center;
}

::v-deep .calendar {
  box-sizing: border-box !important;
}
.box {
  padding: 0 20px;
  display: grid;
  //两个div之间x轴的距离40，
  gap: 0 15px;
  // /布局横着分两边，一边占1fr，另一边1.5fr
  grid-template-columns: 1fr 1fr;

  height: 100%;
}
.grid {
  height: 100%;
  display: grid;
  // /布局竖着分两边，上面的div占2fr，下面的占1fr
  grid-template-rows: 400px auto;
}
.icon-yuan {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  bottom: 0;
}
::v-deep .el-calendar-day {
  height: auto;
}
.task {
  padding: 0 15px;
}

.tasklist {
  background-color: #f7f7fa;
  display: grid;
  gap: 20px 0;
}
.notice {
  height: 40px;
  font-weight: 900;
  font-size: 20px;
  line-height: 40px;
}
.ischat {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.chatinfo {
  display: flex;
  gap: 0 15px;
  //水平居中
  align-items: center;
}
.chat {
  height: 100%;
  display: grid;
  gap: 0 10px;
  grid-template-rows: 200px auto;
}
.chatmain {
  background: #58419c;
  padding: 16px 10px;
  border-radius: 30px;
  display: flex;
  gap: 0 36px;
  position: relative;
}
.el-icon-edit-outline {
  background: #9989c3;
  width: 45px;
  height: 45px;
  line-height: 45px;
  color: #f7f7fa;
  font-size: 28px;
  border-radius: 20%;
  margin-left: 10px;
}
.timer {
  color: #fff;
  min-width: 235px;

  .assign {
    font-weight: 700;
    font-size: 23px;
  }
}

.teamchat {
  height: calc(100% - 80px);
  // /单词换行
  word-break: break-all;
}
.chats {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 100%;
  background: #f1f1f4;
  overflow-y: scroll;
  padding: 15px;
  box-sizing: border-box;

  & .username {
    width: 35px;
    height: 35px;
    background-color: #a792e69f;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    display: inline-block;
    color: #fff;
    min-width: 35px;
  }
  .infor {
    display: flex;
  }
  .item {
    margin: 5px 0;
  }

  & .item-msg {
    background-color: #58419c5f;
    padding: 10px;
    margin: 0 5px;
    border-radius: 10px;
  }
}

.footer {
  height: 40px;
  display: flex;
}
::-webkit-scrollbar {
  width: 100%;
}

.main {
  display: flex;
  flex-direction: row-reverse;
}
</style>
