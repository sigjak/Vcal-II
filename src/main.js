import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import "bootstrap/dist/css/bootstrap.min.css";
import VCalendar from "v-calendar";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import Vuelidate from "vuelidate";
//import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.use(VCalendar, { masks: { dayPopover: "" } });

let base = "";
if (process.env.NODE_ENV == "development") {
  base = axios.create({
    baseURL: "http://localhost/api/"
  });
} else {
  base = axios.create({
    baseURL: "https://microprobe.hi.is/api/",
    headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" }
  });
}

Vue.prototype.$http = base;

Vue.config.productionTip = false;
Vue.mixin({
  methods: {
    $redir() {
      window.location.href = "http://jardvis.hi.is/";
    }
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
