import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
require("@/scss/main.scss");

Vue.component("CustomButton", () =>
  import("@/components/shared/CustomButton.vue")
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
