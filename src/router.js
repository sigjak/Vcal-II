import Vue from "vue";
import Router from "vue-router";
import Select from "./views/selectItems.vue";
import AMPM from "./views/AMPM1.vue";
import Cars from "./views/Cars.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "select",
      component: Select
    },
    {
      path: "/AMPM",
      name: "ampm",
      component: AMPM,
      props: true
    },
    {
      path: "/cars",
      name: "cars",
      component: Cars,
      props: true
    }
  ]
});
