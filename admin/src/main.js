import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";

Vue.config.productionTip = false;

import http from "./http";
Vue.prototype.$http = http;

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authoriztion: `Bearer ${localStorage.express_vue_moba_token}` || ""
      };
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
