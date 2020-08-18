import { Notification, Message } from "element-ui";
import BASE_URL from "../config/baseUrl";
import axios from "axios";
import store from "@/store";
// import qs from "qs";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
});
const err = error => {
  if (error.response) {
    // let data = error.response.data;
    console.log(error.response)
    // const token = localStorage.getItem('token')
    switch (error.response.status) {
      case 403:
        Notification.error({
          message: "系统提示",
          description: "拒绝访问",
          duration: 2000
        });
        break;
      case 500:
        break;
      case 404:
        Notification.error({
          title:'系统提示',
          message: "资源未找到",
          description: "很抱歉，资源未找到!",
          duration: 2000
        });
        break;
      case 504:
        Notification.error({ message: "系统提示", description: "网络超时" });
        break;
      case 300:
        Message.error({
          title: "系统提示",
          message: "未授权，请重新登录",
          duration: 2000
        });
        break;
      case 401:
        Notification.error({
          title: "系统提示",
          message: "未授权，请重新登录",
          duration: 2000
        });
        break;
      default:
        Notification.error({
          title: "系统提示",
          message: error.response.message,
          duration: 2000
        });
        break;
    }
  }
  return Promise.reject(error);
};
service.interceptors.request.use(
  config => {
    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
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
