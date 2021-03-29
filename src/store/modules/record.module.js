import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  action: {
    async addRecord({}, recordData) {
      const data = {
        salonInfo: {
          name: recordData.salonInfo.name
        },
        masterInfo: {
          firstName: recordData.salonInfo.firstName,
          lastName: recordData.salonInfo.lastName
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
        }
      };

      try {
        await services.record.addRecord(data);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
};
