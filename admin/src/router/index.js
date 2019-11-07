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
      },
      {
        path: "/items/create",
        component: () => import("../views/ItemEdit.vue")
      },
      {
        path: "/items/list",
        component: () => import("../views/ItemList.vue")
      },
      {
        path: "/items/edit/:id",
        component: () => import("../views/ItemEdit.vue"),
        props: true
      },
      {
        path: "/heroes/create",
        component: () => import("../views/HeroEdit.vue")
      },
      {
        path: "/heroes/list",
        component: () => import("../views/HeroList.vue")
      },
      {
        path: "/heroes/edit/:id",
        component: () => import("../views/HeroEdit.vue"),
        props: true
      },
      {
        path: "/articles/create",
        component: () => import("../views/ArticleEdit.vue")
      },
      {
        path: "/articles/list",
        component: () => import("../views/ArticleList.vue")
      },
      {
        path: "/articles/edit/:id",
        component: () => import("../views/ArticleEdit.vue"),
        props: true
      },
      {
        path: "/ads/create",
        component: () => import("../views/AdEdit.vue")
      },
      {
        path: "/ads/list",
        component: () => import("../views/AdList.vue")
      },
      {
        path: "/ads/edit/:id",
        component: () => import("../views/AdEdit.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
