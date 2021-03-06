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
    setServicesList(state, servicesList) {
      state.servicesList = servicesList;
    },
    addService(state, service) {
      state.servicesList.push(service);
    },
    removeService(state, id) {
      const index = state.servicesList.findIndex(salon => salon._id === id);

      if (index === -1) {
        return;
      }

      state.servicesList.splice(index, 1);
    },
    updateService(state, { id, data }) {
      const index = state.servicesList.findIndex(salon => salon._id === id);

      if (index === -1) {
        return;
      }

      state.servicesList.splice(index, 1, data);
    }
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
    async getServicesList({ commit }, withReturn = false) {
      try {
        const { data } = await services.services.getList();
        if (!withReturn) {
          commit("setServicesList", data);
        } else {
          return data;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async createNewService({ commit }, payload) {
      try {
        const params = {
          name: payload.name,
          price: payload.price,
          comment: payload.comment
        };

        const { data } = await services.services.createService(params);
        commit("addService", data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateService({ commit }, { id, formData }) {
      try {
        const { data } = await services.services.updateService(id, formData);
        commit("updateService", { id, data });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async removeService({ commit }, id) {
      try {
        await services.services.removeService(id);
        commit("removeService", id);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
