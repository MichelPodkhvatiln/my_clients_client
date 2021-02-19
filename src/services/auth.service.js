import BaseHttpService from "@/services/baseHttp.service";

export class AuthService extends BaseHttpService {
  static instance;

  constructor() {
    super();
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  get endpoints() {
    return this.getEndpoints("auth");
  }

  bindToken(token) {
    super.bindToken(token);
  }

  removeToken() {
    super.removeToken();
  }

  login(credentials) {
    return this.post(this.endpoints.login, credentials);
  }

  logout() {
    return this.post(this.endpoints.logout);
  }
}
