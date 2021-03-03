import BaseHttpService from "@/services/baseHttp.service";

export class MastersService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!MastersService.instance) {
      MastersService.instance = new MastersService();
    }

    return MastersService.instance;
  }

  get endpoints() {
    return this.getEndpoints("masters");
  }

  getList() {
    return this.get(this.endpoints.getList);
  }

  getMaster(id) {
    return this.get(this.endpoints.getMaster.replace("{:id}", String(id)));
  }

  create(data) {
    return this.post(this.endpoints.create, data);
  }

  changeSalon(data) {
    return this.post(this.endpoints.changeSalon, data);
  }
}
