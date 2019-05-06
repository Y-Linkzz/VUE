import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import axios from "axios";
import 'weui'
Vue.prototype.$axios = axios;
// Vue.config.productionTip = false
import router from "./router.js";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
