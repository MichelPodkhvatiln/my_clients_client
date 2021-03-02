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
    setSalonsList(state, salonsList) {
      state.salonsList = salonsList;
    },
    addSalon(state, salon) {
      state.salonsList.push(salon);
    },
    removeSalon(state, salonId) {
      const index = state.salonsList.findIndex(salon => salon._id === salonId);

      if (index === -1) {
        return;
      }

      state.salonsList.splice(index, 1);
    },
    updateSalon(state, { id, data }) {
      const index = state.salonsList.findIndex(salon => salon._id === id);

      if (index === -1) {
        return;
      }

      state.salonsList.splice(index, 1, data);
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
    async getSalonList({ commit }, withReturn = false) {
      try {
        const { data } = await services.salon.getList();
        if (withReturn) {
          return data;
        } else {
          commit("setSalonsList", data);
        }
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
    async updateSalon({ commit }, { id, formData }) {
      try {
        const { data } = await services.salon.updateSalon(id, formData);
        commit("updateSalon", { id, data });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteSalon({ commit }, id) {
      try {
        await services.salon.deleteSalon(id);
        commit("removeSalon", id);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
