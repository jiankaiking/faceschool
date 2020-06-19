import { Notification, Message } from "element-ui";
import axios from "axios";
import store from "@/store";
import qs from "qs";

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const service = axios.create({
  // baseURL: '/api',
  baseURL: "http://192.168.0.166:8085",
  timeout: 6000
});
const err = error => {
  console.log(123);
  if (error.response) {
    let data = error.response.data;
    // const token = localStorage.getItem('token')
    switch (error.response.status) {
      case 403:
        Notification.error({
          message: "系统提示",
          description: "拒绝访问",
          duration: 4
        });
        break;
      case 500:
        break;
      case 404:
        Notification.error({
          message: "系统提示",
          description: "很抱歉，资源未找到!",
          duration: 4
        });
        break;
      case 504:
        Notification.error({ message: "系统提示", description: "网络超时" });
        break;
      case 300:
        Message.error({
          message: "系统提示",
          description: "未授权，请重新登录",
          duration: 4
        });
        break;
      case 401:
        Notification.error({
          message: "系统提示",
          description: "未授权，请重新登录",
          duration: 4
        });
        // if (token) {
        //   store.dispatch("Logout").then(() => {
        //     setTimeout(() => {
        //       window.location.reload();
        //     }, 1500);
        //   });
        // }
        break;
      default:
        Notification.error({
          message: "系统提示",
          description: data.message,
          duration: 4
        });
        break;
    }
  }
  return Promise.reject(error);
};
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.method === "post") {
      config.data = qs.stringify({ ...config.data });
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(response => {
  if (response.data.code === 401) {
    store.dispatch("Logout").then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }
  return response.data;
}, err);

export { service as axios };
