import BaseHttpService from "@/services/baseHttp.service";

export class SalonService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!SalonService.instance) {
      SalonService.instance = new SalonService();
    }

    return SalonService.instance;
  }

  get endpoints() {
    return this.getEndpoints("salon");
  }

  getList() {
    return this.get(this.endpoints.getList);
  }

  createSalon({ name, locationInfo }) {
    return this.post(this.endpoints.create, { name, locationInfo });
  }
}
