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

  setToken(token) {
    this.bindToken(token);
  }

  deleteToken() {
    this.removeToken();
  }

  login(credentials) {
    return this.post(this.endpoints.login, credentials);
  }

  signUp(credentials) {
    return this.post(this.endpoints.signUp, credentials);
  }
}
