import axios from "axios";

const config = {
  baseURL: process.env.VUE_APP_API_LOCAL_URL,
  timeout: 1000000,
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const client = axios.create(config);

export default client;
