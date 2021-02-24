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

  createSalon({ name, location }) {
    return this.post(this.endpoints.create, { name, location });
  }

  updateSalon(id, data) {
    return this.patch(this.endpoints.update.replace("{:id}", String(id)), data);
  }

  deleteSalon(id) {
    return this.delete(this.endpoints.delete.replace("{:id}", String(id)));
  }
}
