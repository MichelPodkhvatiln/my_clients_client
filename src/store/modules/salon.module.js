import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    salonsList: [],
    editingSalonId: null
  },
  getters: {
    salonsList(state) {
      return state.salonsList;
    },
    editingSalonData(state) {
      if (!state.salonsList.length) {
        return undefined;
      }

      return state.salonsList.find(salon => salon._id === state.editingSalonId);
    }
  },
  mutations: {
    resetState(state) {
      state.salonsList = [];
      state.editingSalonId = null;
    },
    setSalonsList(state, payload) {
      state.salonsList = payload;
    },
    addSalon(state, payload) {
      state.salonsList.push(payload);
    },
    setEditingSalonId(state, payload) {
      state.editingSalonId = payload;
    }
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
    setEditingSalonId({ commit }, id) {
      commit("setEditingSalonId", id);
    },
    resetEditingSalonId({ commit }) {
      commit("setEditingSalonId", null);
    },
    async getSalonList({ commit }) {
      try {
        const { data } = await services.salon.getList();
        commit("setSalonsList", data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async createSalon({ commit }, { name, location }) {
      try {
        const { data } = await services.salon.createSalon({ name, location });
        commit("addSalon", data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteSalon({}, id) {
      try {
        await services.salon.deleteSalon(id);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
