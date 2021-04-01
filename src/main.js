import Vue from "vue";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";
import PortalVue from "portal-vue";
import VueTelInput from "vue-tel-input";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { services } from "@/utils/services";

import "vue-tel-input/dist/vue-tel-input.css";
require("@/scss/main.scss");

Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(PortalVue);
Vue.use(VueTelInput);

Vue.config.productionTip = false;

const loadSavedToken = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    return;
  }

  services.auth.setToken(token);
};

loadSavedToken();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
