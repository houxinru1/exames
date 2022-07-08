export default [
  {
    label: "题库管理",
    name: "questionManage",
    meta: {
      icon: "el-icon-location",
    },
    children: [
      {
        label: "题库管理",
        path: "/questionbank",
        name: "questionbank",
      },
      {
        label: "JS管理",
        path: "/jsquestion",
        name: "jsquestion",
      },
      {
        label: "创建题库",
        path: "/createquestion",
        name: "createquestion",
      },
      {
        label: "删除题库",
        path: "/deletequestion",
        name: "deletequestion",
      },
      {
        label: "修改题库",
        path: "/modifyquestion",
        name: "modifyquestion",
      },
    ],
  },
  {
    label: "报名系统",
    name: "registrationSystem",
    meta: {
        icon: "el-icon-eleme",
      },
    children: [],
  },
  {
    label: "刷题系统",
    name: "questionSystem",
    meta: {
        icon: "el-icon-document-copy",
      },
    children: [],
  },
  {
    label: "匹配比赛",
    name: "match",
    meta: {
        icon: "el-icon-trophy",
      },
    children: [],
  },
  {
    label: "账号设置",
    name: "userSettings",
    meta: {
        icon: "el-icon-s-tools",
      },
    children: [
      {
        label: "个人资料",
        path: "/personaldata",
        name: "personaldata",
      },
      {
        label: "上传个人头像",
        path: "/setavatar",
        name: "setavatar",
      },
    ],
  },
  {
    label: "任务中心",
    name: "taskCenter",
    meta: {
        icon: "el-icon-s-grid",
      },
    children: [
      {
        label: "聊天页面",
        path: "/chatpage",
        name: "chatpage",
      },
      {
        label: "创建任务",
        path: "/createtask",
        name: "createtask",
      },
      {
        label: "任务列表",
        path: "/tasklist",
        name: "tasklist",
      },
      {
        label: "任务详情",
        path: "/taskdetails",
        name: "taskdetails",
      },
      {
        label: "用户列表",
        path: "/userlist",
        name: "userlist",
      },
    ],
  },
  {
    label: "角色管理",
    name: "role",
    meta: {
        icon: "el-icon-s-custom",
      },
    children: [
      {
        label: "新增角色权限",
        path: "/rolepermissions",
        name: "rolepermissions",
      },
      {
        label: "权限管理",
        path: "/rolemanagement",
        name: "rolemanagement",
      },
      {
        label: "权限配置",
        path: "/permissionconfiguration",
        name: "permissionconfiguration",
      },
    ],
  },
];
