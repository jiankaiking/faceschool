import { Notification } from "element-ui";
import axios from "axios";



const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 6000
});
const err = error => {
  if (error.response) {
    let data = error.response.data;
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
    const token = "123";
    if (token) {
      config.headers["X-Access-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    if (config.method == "get") {
      config.params = {
        ...config.params
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(response => {
  return response.data;
}, err);

export {service as axios}
