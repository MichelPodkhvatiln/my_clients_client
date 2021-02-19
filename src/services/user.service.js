import BaseHttpService from "@/services/baseHttp.service";

export class UserService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  get endpoints() {
    return this.getEndpoints("user");
  }

  getUser(userId) {
    return this.post(this.endpoints.getUser, { id: userId });
  }
}
