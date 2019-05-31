import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login";
import Select from "./views/selectItems.vue";
import AMPM from "./views/ampm.vue";
import Cars from "./views/Cars.vue";
import Instruments from "./views/instruments.vue";
import Houses from "./views/houses.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/select",
      name: "select",
      component: Select
    },
    {
      path: "/instruments",
      name: "instruments",
      component: Instruments,
      props: true
    },
    {
      path: "/ampm",
      name: "ampm",
      component: AMPM,
      props: true
    },

    {
      path: "/cars",
      name: "cars",
      component: Cars,
      props: true
    },
    {
      path: "/houses",
      name: "houses",
      component: Houses,
      props: true
    }
  ]
});
