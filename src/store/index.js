import Vue from "vue";
import Vuex from "vuex";
import userModule from "@/store/modules/user.module";
import salonModule from "@/store/modules/salon.module";
import servicesModule from "@/store/modules/services.module";
import mastersModule from "@/store/modules/masters.module";
import recordModule from "@/store/modules/record.module";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // getters:{},
  // mutations: {},
  // actions: {},
  modules: {
    userModule,
    salonModule,
    servicesModule,
    mastersModule,
    recordModule
  }
});
