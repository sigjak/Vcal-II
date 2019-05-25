import Vue from "vue";
import Router from "vue-router";
import Select from "./views/selectItems.vue";
import AMPM from "./views/AMPM1.vue";
import Cars from "./views/Cars.vue";
import Instruments from "./views/instruments.vue";

Vue.use(Router);

export default new Router({
  routes: [
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
