import axios from "axios";

const baseURL = "/api";
/**
 * @description  token值 放到请求头中
 ***/
const getPostConfig = function () {
  return {
    baseURL,
    headers: {
      contentType: "application/json",
      authorization: sessionStorage.getItem("token"),
    },
  };
};

/**
 * @description 获取用户信息
 ***/
export const getUserInfoApi = function (payload = {}) {
  return axios.post("/user/info", payload, getPostConfig());
};

/**
 * @description 刷新验证码
 ***/
export const getCaptchaApi = function () {
  return `${baseURL}/captcha? ` + Math.random();
};

/**
 * @description 获取登录接口
 * @dparam payload <object>
 * @dparam payload.username
 * @dparam payload.password
 * @dparam payload.captcha
 ***/
export const getloginApi = function (payload = {}) {
  return axios.post("/user/login", payload, getPostConfig());
};

/**
 * @description  注册接口
 ***/
export const getregisterApi = function (payload = {}) {
  return axios.post("/user/register", payload, getPostConfig());
};

/**
 * @description  退出
 ***/
export const getretreatApi = function (payload = {}) {
  return axios.post("/user/logout", payload, getPostConfig());
};

/**
 * @description  查询题库接口
 *  @dparam payload type      1：单选题  2：多选题  3：填空题
 * @dparam payload  pagination:<boolean>,  //非必填  是否需要分页  如果传 false：不分页   true:分页   默认是分页;
 * @dparam payload  pageSize:<number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 *  @dparam payload pageNum:<number>,      //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/
export const getquestionApi = function (payload = {}) {
  return axios.post("/question/list", payload, getPostConfig());
};

/**
 * @description  创建题
 *   *  @dparam payload  type:<number>, //题目类型
 *  @dparam payload   title:<string>, //题目标题
 *  @dparam payload   questionA:<string>,  // 选项a,
 *  @dparam payload   questionB:<string>,  // 选项b,
 *  @dparam payload   questionC:<string>,  // 非必填 选项c,
 *  @dparam payload   questionD:<string>,  // 非必填 选项d,
 *  @dparam payload   answer:<string>,     // 答案
 *  @dparam payload   level: <number>,     // 难度系数  1：简单  2：普通 3：困难
 ***/
export const getcreateApi = function (payload = {}) {
  return axios.post("/question/create", payload, getPostConfig());
};

/**
 * @description  修改题
 *   *  @dparam payload  id: <number>,   // 必填 题目id
 *  @dparam payload   type:<number>,  // 必填 题目类型
 *  @dparam payload   title:<string>, // 非必填 题目标题
 *  @dparam payload   questionA:<string>,  // 选项a,
 *  @dparam payload   questionB:<string>,  // 选项b,
 *  @dparam payload   questionC:<string>,  // 非必填 选项c,
 *  @dparam payload   questionD:<string>,  // 非必填 选项d,
 *  @dparam payload   answer:<string>,     // 答案
 *  @dparam payload   level: <number>,     // 难度系数  1：简单  2：普通 3：困难
 ***/
export const getupdateApi = function (payload = {}) {
  return axios.post("/question/update", payload, getPostConfig());
};

/**
 * @description  删除题
 *   *  @dparam payload  id: <number>,   // 必填 题目id
 *  @dparam payload   type:<number>,  // 必填 题目类型
 ***/
export const getdeleteApi = function (payload = {}) {
  return axios.post("/question/delete", payload, getPostConfig());
};

/**
 * @description  个人信息接口
 *   *
 ***/
export const getuserinfoApi = function (payload = {}) {
  return axios.post("/user/info", payload, getPostConfig());
};

/**
 * @description  修改个人信息接口
   *  @dparam payload   phone : <string>,    //手机号
   *  @dparam payload   email : <string>,    //邮箱
   *  @dparam payload   sex   : <number>,    //性别 1 ： 男   0： 女
   *  @dparam payload  avatarName: <string>, //昵称
  *  @dparam payload  name  ：<string>,    //真实姓名
   *  @dparam payload   provinceNo: <string>,  //省编号
  *  @dparam payload  cityNo: <string>,    //市编号
  *  @dparam payload  areaNo: <string>,    //区编号
  *  @dparam payload  townNo: <string>,    //镇编号
  *  @dparam payload  desc:   <string>,    //个人介绍
        修改哪个参数 传哪个
 ***/
export const getuserupdateApi = function (payload = {}) {
  return axios.post("/user/update", payload, getPostConfig());
};

/**
 * @description  创建任务
 *  @dparam payload  name：<string>,   // 必填 任务名称
 *  @dparam payload   desc:<string>,  // 非必填 任务描述
 *  @dparam payload   duration:<number>,  // 必填 任务时长
 *  @dparam payload   level:<number>,  // 必填 任务等级   1紧急  0普通

 ***/
export const getcreatetaskApi = function (payload = {}) {
  return axios.post("/task/create", payload, getPostConfig());
};

/**
 * @description  发布任务
 *  @dparam payload   userId： <array[<number>] >,   // 必填 用户id，若给多人发送任务，可以传数组，数组中是每个人的
 *  @dparam payload   taskId：number,  // 必填 任务id

 ***/
export const getreleasetaskApi = function (payload = {}) {
  return axios.post("/task/release", payload, getPostConfig());
};

/**
 * @description  查询任务列表
 *  @dparam payload   pagination： <boolean>,   // 非必填，表示是否需要分页，true分页，false不分页，默认分页
 *  @dparam payload   pageSize: <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 *  @dparam payload   pageNum : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/
export const getlisttaskApi = function (payload = {}) {
  return axios.post("/task/list", payload, getPostConfig());
};

/**
 * @description  查询用户信息接口
 *  @dparam payload    pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 *  @dparam payload    pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 *  @dparam payload    pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/
export const getuserlistApi = function (payload = {}) {
  return axios.post("/user/list", payload, getPostConfig());
};

/**
 * @description  查询任务详情接口
 *  @dparam payload     taskId : <number>,    //任务id
 ***/
export const gettaskdetailApi = function (payload = {}) {
  return axios.post("/task/detail", payload, getPostConfig());
};

/**
 * @description  角色列表
 *  @dparam payload    pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 *  @dparam payload    pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 *  @dparam payload    pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/
export const getrolelistApi = function (payload = {}) {
  return axios.post("/role/list", payload, getPostConfig());
};

/**
 * @description  创建角色接口
 *  @dparam payload     roleName:<string>, //角色名字
 *  @dparam payload     groupId :<number>,  //分组id  非必填
 ***/
export const getrolecreateApi = function (payload = {}) {
  return axios.post("/role/create", payload, getPostConfig());
};

/**
 * @description  创建角色组接口
 *  @dparam payload      groupName:<string>, //分组名字
 ***/
export const getroleGroupcreateApi = function (payload = {}) {
  return axios.post("/roleGroup/create", payload, getPostConfig());
};

/**
 * @description  角色分组列表接口
 *  @dparam payload    pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 *  @dparam payload    pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 *  @dparam payload    pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/
export const getroleGrouplistApi = function (payload = {}) {
  return axios.post("/roleGroup/list", payload, getPostConfig());
};

/**
 * @description  创建评论接口
 *  @dparam payload     commentContent:<string>, //要评论的内容
 *  @dparam payload         taskId:<number> //要评论任务的id
 *  @dparam payload        userId:<number> //评论的用户id  是谁评论的
 ***/
export const getcommentcreateApi = function (payload = {}) {
  return axios.post("/comment/create", payload, getPostConfig());
};

/**
 * @description  获取评论列表接口
 *  @dparam payload    pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 *  @dparam payload    pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 *  @dparam payload    pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；
 ***/
export const getcommentlistApi = function (payload = {}) {
  return axios.post("/comment/list", payload, getPostConfig());
};
