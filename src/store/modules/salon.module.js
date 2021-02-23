import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    salonsList: []
  },
  getters: {
    salonsList(state) {
      return state.salonsList;
    },
    salonListInfoForCards(state) {
      if (!state.salonsList.length) {
        return [];
      }

      return state.salonsList.map(salon => {
        return {
          id: salon._id,
          name: salon.name,
          locationInfo: {
            address: salon.locationInfo.address,
            location: {
              coordinates: {
                lat: salon.locationInfo.location.coordinates[1],
                lng: salon.locationInfo.location.coordinates[0]
              }
            }
          }
        };
      });
    }
  },
  mutations: {
    resetState(state) {
      state.salonsList = [];
    },
    setSalonsList(state, payload) {
      state.salonsList = payload;
    }
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
    async getSalonList({ commit }) {
      try {
        const { data } = await services.salon.getList();
        commit("setSalonsList", data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async createSalon({}, { name, locationInfo }) {
      try {
        await services.salon.createSalon({ name, locationInfo });
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
