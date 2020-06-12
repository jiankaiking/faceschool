import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuIsfold:false,
  },
  mutations: {
    CHANGE_MENU_FOLD(state){
      state.menuIsfold = !state.menuIsfold
    }
  },
  actions: {},
  modules: {}
});
