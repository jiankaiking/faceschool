import Vue from "vue";
import VueRouter from "vue-router";
import dashboard from "../views/dashboard.vue";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    component: dashboard,
    redirect: "/schlloinfo",
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
        path: "/class/info",
        name: "classInfo",
        component: () => import("../views/campusAdmin/classInfo.vue"),
        meta: {
          activeMenu: "/classlist"
        }
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
        path: "/subsidy/info",
        name: "subsidyInfo",
        component: () => import("../views/subsidy/modules/subsidyInfo.vue"),
        meta: {
          activeMenu: "/subsidylist"
        }
      },
      {
        path: "/depositlist",
        name: "depositList",
        component: () => import("../views/deposit/depositList.vue")
      },
      {
        path: "/blacklist",
        name: "blackList",
        component: () => import("../views/deposit/blackList.vue")
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

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    if (to.path === "/login") {
      next({ path: "/schlloinfo" });
    } else {
      next();
    }
  } else {
    if(to.path === '/login'){
      next()
    }else{
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  }
});


export default router;
