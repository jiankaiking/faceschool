import { axios } from "./request";

export function login(parameter) {
  return axios({
    url: "/login",
    method: "post",
    data: parameter
  });
}

export function logout(logoutToken) {
  return axios({
    url: "/sys/logout",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Access-Token": logoutToken
    }
  });
}
