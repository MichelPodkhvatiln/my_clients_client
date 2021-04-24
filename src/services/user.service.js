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

  updateProfile(userId, { field, value }) {
    return this.patch(
      this.endpoints.updateProfile.replace("{:userId}", String(userId)),
      { field, value }
    );
  }

  updateEmail(userId, { email }) {
    return this.patch(
      this.endpoints.updateEmail.replace("{:userId}", String(userId)),
      { email }
    );
  }

  updatePassword(userId, { password }) {
    return this.patch(
      this.endpoints.updatePassword.replace("{:userId}", String(userId)),
      { password }
    );
  }
}
