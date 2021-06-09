import BaseHttpService from "@/services/baseHttp.service";

export class StatsService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!StatsService.instance) {
      StatsService.instance = new StatsService();
    }

    return StatsService.instance;
  }

  get endpoints() {
    return this.getEndpoints("stats");
  }

  getRecordWeekStats() {
    return this.get(this.endpoints.getRecordWeekStats);
  }

  getRecordMonthStats() {
    return this.get(this.endpoints.getRecordMonthStats);
  }
}
