import httpClient from "@/utils/httpClient";
import { endpoints } from "@/services/endpoints";

class BaseHttpService {
  static get httpClient() {
    return httpClient;
  }

  getEndpoints(key) {
    return endpoints[key];
  }

  bindToken(token) {
    BaseHttpService.httpClient.defaults.headers.common[
      "x-access-token"
    ] = token;
  }

  removeToken() {
    delete BaseHttpService.httpClient.defaults.headers.common["x-access-token"];
  }

  get(url, params) {
    return BaseHttpService.httpClient.get(url, params);
  }

  post(url, data = {}) {
    return BaseHttpService.httpClient.post(url, data);
  }

  put(url, data = {}) {
    return BaseHttpService.httpClient.get(url, data);
  }

  patch(url, data = {}) {
    return BaseHttpService.httpClient.get(url, data);
  }

  delete(url) {
    return BaseHttpService.httpClient.delete(url, {});
  }
}

export default BaseHttpService;
