import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      isPublic: true
    }
  },
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
      },
      {
        path: "/admin_users/create",
        component: () => import("../views/AdminEdit.vue")
      },
      {
        path: "/admin_users/list",
        component: () => import("../views/AdminList.vue")
      },
      {
        path: "/admin_users/edit/:id",
        component: () => import("../views/AdminEdit.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.express_vue_moba_token) {
    next("/login");
    // global.console.log("need login");
  }
  next();
});

export default router;
