import Vue from "vue";
import VueRouter from "vue-router";
import dashboard from "../views/dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: dashboard,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "/campuslist",
        name: "campusList",
        component: () => import("../views/campusAdmin/campusList.vue")
      },
      {
        path: "/classlist",
        name: "classList",
        component: () => import("../views/campusAdmin/classList.vue")
      },
      {
        path: "/schlloinfo",
        name: "schlloInfo",
        component: () => import("../views/campusAdmin/schlloInfo.vue")
      },
      {
        path: "/stafflist",
        name: "staffList",
        component: () => import("../views/campusAdmin/staffList.vue")
      },
      {
        path: "/studentslist",
        name: "studentsList",
        component: () => import("../views/campusAdmin/studentsList.vue")
      },
      {
        path: "/orderlist",
        name: "orderList",
        component: () => import("../views/order/orderlist.vue")
      },
      {
        path: "/subsidylist",
        name: "subsidyList",
        component: () => import("../views/subsidy/subsidyList.vue")
      },
      {
        path:'/subsidy/info',
        name: "subsidyInfo",
        component: () => import("../views/subsidy/modules/subsidyInfo.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
