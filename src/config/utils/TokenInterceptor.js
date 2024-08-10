import axios from "axios";
import { APP_CONSTANTS } from "./AppContext";

axios.interceptors.request.use(
  (request) => {
    const token = APP_CONSTANTS.jwt || localStorage.getItem("jwt");

    console.log("appcons", APP_CONSTANTS)

    console.log("token interceptor", token)
    if (token) {
      request.headers["Authorization"] = "Bearer " + token;
      // request.headers["Cookie"] = 'connect.sid=s%3AcfFEJy8i-tYzeM4wLTKiJYV0SUAah4sb.N6UeKmfcCR8d3Lgp7D5EQoigb2ob%2F%2BXh1Yq6bsXdhts';
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
