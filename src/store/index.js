import Vue from "vue";
import Vuex from "vuex";
import userModule from "@/store/modules/user.module";
import salonModule from "@/store/modules/salon.module";
import servicesModule from "@/store/modules/services.module";
import mastersModule from "@/store/modules/masters.module";
import recordModule from "@/store/modules/record.module";
import statsModule from "@/store/modules/stats.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    salonModule,
    servicesModule,
    mastersModule,
    recordModule,
    statsModule
  }
});
