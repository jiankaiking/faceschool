import Vue from "vue";
import Vuex from "vuex";
import { login } from "../api/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuIsfold: false, //菜单收缩
    token: "" || localStorage.getItem("token")
  },
  mutations: {
    CHANGE_MENU_FOLD(state) {
      state.menuIsfold = !state.menuIsfold;
    },
    SET_TOKEN(state, data) {
      state.token = data;
      localStorage.setItem("token", data);
    }
  },
  actions: {
    LOGIN(context, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            if (response.code == "200") {
              context.commit("SET_TOKEN", response.data);
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
