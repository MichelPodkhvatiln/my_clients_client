import Vue from "vue";
import VModal from "vue-js-modal";
import App from "./App.vue";
import router from "./router";
import store from "./store";
require("@/scss/main.scss");

Vue.component("CustomButton", () =>
  import("@/components/shared/CustomButton.vue")
);

Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
