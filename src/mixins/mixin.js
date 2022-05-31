export default {
  methods: {
    formatDate(time) {
      let d = new Date(time);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let date = d.getDate();
      date = date > 9 ? date : "0" + date;
      let day = ["七", "一", "二", "三", "四", "五", "六"][d.getDay()];
      let hours = d.getHours();
      hours = hours > 9 ? hours : "0" + hours;
      let minutes = d.getMinutes();
      minutes = minutes > 9 ? minutes : "0" + minutes;
      let seconds = d.getSeconds();
      seconds = seconds > 9 ? seconds : "0" + seconds;
      return (
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        "星期" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    /**
     * @description 跳转页面的方法
     * @param params 非必填这个是 需要传的参数 数据可以通过这个参数传 需要先声明一个变量接
     * @param params 语法：let params = {key:value};
     * @param params 调用方法：navigator('去哪个页面的name',params);
     **/
    navigator(name, params = {}) {
      if (this.$route.name == name) {
        this.$message({
          message: "已在当前界面，请勿重复跳转",
          type: "warning",
        });
      } else {
        this.$router.push({
          name,
          params,
        });
      }
    },
  },
};
