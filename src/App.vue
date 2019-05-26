<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//import Home from "./views/Home";
//import Select from "./views/selectItems";
//import AMPM1 from "@/views/AMPM1";
export default {
  components: {
    //Home,
    //AMPM1
    //Select
  }
};
</script>

<style>
body {
  background: url("./images/dawn.jpg") no-repeat center center fixed;
  background-size: cover;
}
input[type="number"] {
  width: 50px;
  margin: 0 auto;
}
/* .error {
  border-color: red;
  color: red;
} */
.tt {
  background-color: #f9f9f9e3;
}
.form-check-inline {
  margin-left: -0.5rem !important;
}
input[type="checkbox"] {
  vertical-align: middle;
  position: relative;
  bottom: 2px;
}
.card-header {
  color: black !important;
  font-weight: 600 !important;
}
.card-header {
  background-color: #edb862 !important;
}

label {
  font-size: 0.9rem !important;
}
.cont {
  color: red !important;
}
.vc-header {
  background: #edb862;
  padding-bottom: 5px;
}
.vc-title-layout {
  padding-bottom: 10px;
}
li {
  font-size: 0.9rem !important;
  line-height: 1 !important;
}
.vc-container {
  margin: 0 auto;
}

ul {
  /*padding: 10px 0px 0px 10px;*/
  margin-top: 1rem !important;
  padding-left: 20px;
  list-style: none;
}
.vc-pointer-events-none {
  pointer-events: auto !important;
  cursor: no-drop !important;
}
.ccc {
  color: red !important;
  cursor: no-drop !important;
}
.allbg {
  background-color: #fff !important;
}
.ambg {
  background-color: rgb(121, 144, 248) !important;
  border: 1px solid !important;
  border-radius: 50% !important;
}
.amcontent {
  color: white !important;
}
.redbg {
  background-color: rgb(250, 4, 4) !important;
  border: 1px red solid !important;
  border-radius: 50% !important;
  opacity: 0.9;
}
.ba {
  background-color: #fff !important;

  border: 1.5px solid red !important;
  border-radius: 50% !important;
  opacity: 0.5;
}
.bo {
  color: red !important;
  z-index: 100;
  font-style: italic;
}
</style>
