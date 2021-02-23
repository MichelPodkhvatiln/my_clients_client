import axios from "axios";

const apiURL =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_API_REMOTE_URL
    : process.env.VUE_APP_API_LOCAL_URL;

const config = {
  baseURL: apiURL,
  timeout: 1000000,
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

const client = axios.create(config);

export default client;
