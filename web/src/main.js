import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);

import Card from "./components/Card.vue";
Vue.component("m-card", Card);

import ListCard from "./components/ListCard.vue";
Vue.component("m-list-card", ListCard);

import "./assets/scss/style.scss";
import "swiper/dist/css/swiper.css";
import "./assets/icon-font/iconfont.css";

import http from "./http";
Vue.prototype.$http = http;

import dayjs from "dayjs";

Vue.mixin({
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
