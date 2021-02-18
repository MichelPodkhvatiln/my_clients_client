import Vue from "vue";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";
import HttpClient from "@/utils/httpClient";
import App from "./App.vue";
import router from "./router";
import store from "./store";
require("@/scss/main.scss");

Vue.use(VModal);
Vue.use(Vuelidate);

window.httpClient = new HttpClient();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
