import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/categories/create",
        component: () => import("../views/CategoryEdit.vue")
      },
      {
        path: "/categories/list",
        component: () => import("../views/CategoryList.vue")
      },
      {
        path: "/categories/edit/:id",
        component: () => import("../views/CategoryEdit.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
