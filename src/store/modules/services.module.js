import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    servicesList: []
  },
  getters: {
    servicesList(state) {
      return state.servicesList;
    }
  },
  mutations: {
    resetState(state) {
      state.servicesList = [];
    },
    setServicesList(state, payload) {
      state.servicesList = payload;
    }
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
    async getServicesList({ commit }) {
      try {
        const { data } = await services.services.getList();
        commit("setServicesList", data);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
