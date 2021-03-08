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
    },
    addMaster(state, master) {
      state.mastersList.push(master);
    },
    removeMaster(state, masterId) {
      const index = state.mastersList.findIndex(
        master => master.id === masterId
      );

      if (index === -1) {
        return;
      }

      state.mastersList.splice(index, 1);
    }
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
    async getMastersList({ commit }) {
      try {
        const { data } = await services.masters.getList();
        commit("setMastersList", data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMasterById({}, id) {
      try {
        const { data } = await services.masters.getMaster(id);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async createMaster({ commit }, payload) {
      try {
        const params = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
          salonId: payload.salonId
        };

        const { data } = await services.masters.createMaster(params);

        commit("addMaster", data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async removeMaster({ commit }, masterId) {
      try {
        await services.masters.removeMaster(masterId);
        commit("removeMaster", masterId);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeMasterInfo({}, payload) {
      try {
        const masterId = payload.masterId;
        const updatedInfo = payload.updatedInfo;

        const { data } = await services.masters.changeInfo(
          masterId,
          updatedInfo
        );

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeMasterEmail({}, payload) {
      try {
        const masterId = payload.masterId;
        const updatedData = payload.updatedData;

        const { data } = await services.masters.changeEmail(
          masterId,
          updatedData
        );

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeMasterPassword({}, payload) {
      try {
        const masterId = payload.masterId;
        const updatedData = payload.updatedData;

        const { data } = await services.masters.changePassword(
          masterId,
          updatedData
        );

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeMasterSalon({}, payload) {
      try {
        const params = {
          masterId: payload.masterId,
          salonId: payload.salonId
        };

        const { data } = await services.masters.changeSalon(params);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeMasterWorkdays({}, payload) {
      try {
        const params = {
          masterId: payload.masterId,
          workDays: payload.workDays
        };

        const { data } = await services.masters.changeWorkDays(params);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async changeMasterServices({}, payload) {
      try {
        const params = {
          masterId: payload.masterId,
          services: payload.services
        };

        const { data } = await services.masters.changeServices(params);

        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
