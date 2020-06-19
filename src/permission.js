// import router from "./router";
//
// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem("token")) {
//     console.log(123);
//     if (to.path === "/user/login") {
//       next({ path: "/home" });
//     } else {
//       next();
//     }
//   } else {
//     console.log(2);
//     next({ path: "/login", query: { redirect: to.fullPath } });
//   }
// });
