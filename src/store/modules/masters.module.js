//import { services } from "@/utils/services";

import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    mastersList: []
  },
  getters: {
    mastersList(state) {
      return state.mastersList;
    }
  },
  mutations: {
    resetState(state) {
      state.mastersList = [];
    },
    setMastersList(state, mastersList) {
      state.mastersList = mastersList;
    }
  },
  actions: {
    async getMastersList({ commit }) {
      try {
        const { data } = await services.masters.getList();
        commit("setMastersList", data);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
