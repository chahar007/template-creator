import axios from "axios";
import { APP_CONSTANTS } from "./AppContext";

axios.interceptors.request.use(
  (request) => {
    const token = APP_CONSTANTS.jwt || localStorage.getItem("jwt");

    if (token && !request.url.includes("wp-json/wp")) {
      request.headers["Authorization"] = "Bearer " + token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
