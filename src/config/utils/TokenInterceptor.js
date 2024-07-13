import axios from "axios";
import { APP_CONSTANTS } from "./AppContext";

axios.interceptors.request.use(
  (request) => {
    const token = APP_CONSTANTS.token ? APP_CONSTANTS.token.jwt : null;

    console.log("token interceptor", token)
    if (token) {
      request.headers["Authorization"] = token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
