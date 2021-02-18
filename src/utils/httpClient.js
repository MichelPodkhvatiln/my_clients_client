import axios from "axios";

class HttpClient {
  constructor() {
    const config = {
      baseURL: process.env.VUE_APP_API_LOCAL_URL,
      timeout: 1000000,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    this._client = axios.create(config);
  }

  bindToken(token) {
    this._client.defaults.headers.common["x-access-token"] = token;
  }

  removeToken() {
    delete this._client.defaults.headers.common["x-access-token"];
  }

  get(url) {
    return this._client.get(url);
  }
  post(url, data = {}) {
    return this._client.post(url, data, this._client.defaults.headers);
  }
  put(url, data = {}) {
    return this._client.put(url, data, this._client.defaults.headers);
  }
  delete(url) {
    return this._client.delete(url, this._client.defaults.headers);
  }
}

export default HttpClient;
