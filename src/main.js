import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import echarts from 'echarts'
import * as filters from './config/globalFilter'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
