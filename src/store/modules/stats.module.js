import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getRecordWeekStats({}) {
      const { data } = await services.stats.getRecordWeekStats();
      return data?.data ?? [];
    },
    async getRecordMonthStats({}) {
      const { data } = await services.stats.getRecordMonthStats();
      return data?.data ?? [];
    }
  }
};
