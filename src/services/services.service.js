import BaseHttpService from "@/services/baseHttp.service";

export class ServicesService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!ServicesService.instance) {
      ServicesService.instance = new ServicesService();
    }

    return ServicesService.instance;
  }

  get endpoints() {
    return this.getEndpoints("services");
  }

  getList() {
    return this.get(this.endpoints.getList);
  }

  createService(data) {
    return this.post(this.endpoints.create, data);
  }

  updateService(id, data) {
    return this.patch(this.endpoints.update.replace("{:id}", String(id)), data);
  }

  removeService(id) {
    return this.delete(this.endpoints.remove.replace("{:id}", String(id)));
  }
}
