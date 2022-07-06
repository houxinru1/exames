import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "/setavatar",
        name: "setavatar",
        component: () => import("../views/SetAvatar.vue"),
      },
      {
        path: "/questionbank",
        name: "questionbank",
        component: () => import("../views/task/QuestionBank.vue"),
      },
     
      {
        path: "/jsquestion",
        name: "jsquestion",
        component: () => import("../views/task/JsQuestion.vue"),
      },
      {
        path: "/personaldata",
        name: "personaldata",
        component: () => import("../views/task/PersonalData.vue"),
      },
      {
        path: "/chatpage",
        name: "chatpage",
        component: () => import("../views/task/ChatPage.vue"),
      },
      {
        path: "/createtask",
        name: "createtask",
        component: () => import("../views/task/CreateTask.vue"),
      },
      {
        path: "/tasklist",
        name: "tasklist",
        component: () => import("../views/task/TaskList.vue"),
      },
      {
        path: "/rolepermissions",
        name: "rolepermissions",
        component: () => import("../views/task/RolePermissions.vue"),
      },
      {
        path: "/rolemanagement",
        name: "rolemanagement",
        component: () => import("../views/task/RoleManagement.vue"),
      },
      {
        path: "/taskdetails",
        name: "taskdetails",
        component: () => import("../views/task/TaskDetails.vue"),
      },
      {
        path: "/userlist",
        name: "userlist",
        component: () => import("../views/task/UserList.vue"),
      },
      {
        path: "/permissionconfiguration",
        name: "permissionconfiguration",
        component: () => import("../views/PermissionConfiguration.vue"),
      },
    ],
  },
  {
    path: "/regist",
    name: "regist",
    component: () => import("../views/RegistView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
