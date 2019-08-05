import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/selectItem",
      name: "selectItem",
      component: () =>
        import(/*webpackChunkName: "select" */ "./views/selectItems.vue")
    },
    {
      path: "/instruments",
      name: "instruments",
      component: () =>
        import(/*webpackChunkName: "instruments" */ "./views/instruments.vue"),
      props: true
    },
    {
      path: "/ampm",
      name: "ampm",
      component: () => import(/*webpackChunkName: "ampm" */ "./views/ampm.vue"),
      props: true
    },

    {
      path: "/cars",
      name: "cars",
      component: () => import(/*webpackChunkName: "cars" */ "./views/Cars.vue"),
      props: true
    },
    {
      path: "/houses",
      name: "houses",
      component: () =>
        import(/*webpackChunkName: "houses" */ "./views/houses.vue"),
      props: true
    }
  ]
});
