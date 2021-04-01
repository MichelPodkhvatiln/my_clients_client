import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async addRecord({}, recordData) {
      const data = {
        dateInfoId: recordData.dateInfoId,
        salonInfo: {
          name: recordData.salonInfo.name
        },
        masterInfo: {
          masterId: recordData.masterInfo.masterId,
          firstName: recordData.masterInfo.firstName,
          lastName: recordData.masterInfo.lastName
        },
        serviceInfo: {
          name: recordData.serviceInfo.name,
          price: recordData.serviceInfo.price,
          comment: recordData.serviceInfo.comment
        },
        userInfo: {
          firstName: recordData.userInfo.firstName,
          lastName: recordData.userInfo.lastName,
          phone: recordData.userInfo.phone
        },
        date: recordData.date
      };

      try {
        await services.record.addRecord(data);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
};
