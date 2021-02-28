import Vue from "vue";
import Vuex from "vuex";
import userModule from "@/store/modules/user.module";
import salonModule from "@/store/modules/salon.module";
import servicesModule from "@/store/modules/services.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userModule,
    salonModule,
    servicesModule
  }
});
