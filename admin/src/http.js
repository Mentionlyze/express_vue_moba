import axios from "axios";
import Vue from "vue";
import router from "./router/index";

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
});

http.interceptors.request.use(
  config => {
    if (localStorage.express_vue_moba_token) {
      config.headers.Authoriztion =
        "Bearer " + (localStorage.express_vue_moba_token || "");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message.error(err.response.data.message);
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default http;
