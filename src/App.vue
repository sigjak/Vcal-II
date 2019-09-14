<template>
  <div id="app">
    <img src="./images/header_01.png" class="img-fluid" />
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-outline-light btn-sm mr-5 btnExit"
        @click="$redir()"
      >
        Exit
      </button>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins";
@import "node_modules/bootstrap/scss/grid";
@import "node_modules/bootstrap/scss/utilities/borders";
@import "node_modules/bootstrap/scss/utilities/text";

@import "node_modules/bootstrap/scss/buttons";
@import "node_modules/bootstrap/scss/type";
@import "node_modules/bootstrap/scss/forms";
@import "node_modules/bootstrap/scss/card";
@import "node_modules/bootstrap/scss/bootstrap-grid";
@import "node_modules/bootstrap/scss/bootstrap-reboot";
@import "node_modules/bootstrap/scss/input-group";
@import "node_modules/bootstrap/scss/images";

@media (max-width: 768px) {
  .headerSize {
    font-size: 2.5rem;
  }
}
.focus\:vc-bg-gray-200:focus {
  background: #edb862 !important;
}
h2 {
  font-size: calc(26px + (40 - 26) * ((100vw - 300px) / (1600 - 300)));
}
.btnExit {
  margin-top: -40px;
  width: 60px !important;
  height: 30px !important;
}
body {
  background: url("./images/dawn.jpg") no-repeat center center fixed;
  background-size: cover;
}
input[type="number"] {
  width: 50px;
  margin: 0 auto;
}
.logBg {
  background-image: linear-gradient(
    to right,
    rgba(26, 24, 24, 0.507),
    rgba(32, 30, 30, 0.11)
  );
}

.linBg {
  background-image: linear-gradient(to right, #f9f9f98e, #f9f9f938) !important;
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
  background-color: #edb862 !important;
}

label {
  font-size: 0.9rem !important;
}

.vc-header {
  background-color: #edb862;
  border: 2px solid #edb862;
  border-radius: 7px 7px 0 0;
}
.vc-arrows-container {
  border-top: 4px solid #edb862 !important;
  border-radius: 7px 7px 0 0;
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
  z-index: 100;
}

.whiteBackground {
  background-color: #fff !important;
}
.greyBackground {
  background-color: rgb(240, 240, 240) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.whiteContent {
  color: #fff !important;
}
.house10 {
  background: linear-gradient(to right, crimson 10%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house20 {
  background: linear-gradient(to right, crimson 20%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house30 {
  background: linear-gradient(to right, crimson 30%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house40 {
  background: linear-gradient(to right, crimson 40%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house50 {
  background: linear-gradient(to right, crimson 50%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house60 {
  background: linear-gradient(to right, crimson 60%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house70 {
  background: linear-gradient(to right, crimson 70%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house80 {
  background: linear-gradient(to right, crimson 80%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.house90 {
  background: linear-gradient(to right, crimson 90%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.ambg {
  /* background-color: rgb(121, 151, 248) !important;*/
  background: linear-gradient(to right, red 50%, #efefef 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}
.pmbg {
  /* background-color: rgb(121, 151, 248) !important;*/
  background: linear-gradient(to right, #efefef 50%, red 0%) !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
}

.bluebg {
  background-color: rgb(121, 151, 248) !important;
  border: 1px solid rgb(121, 151, 248) !important;
  border-radius: 50% !important;
}
.redBackground {
  background-color: rgb(250, 4, 4) !important;
  border: 1px red solid !important;
  border-radius: 50% !important;
  opacity: 0.9;
}
.redCircle {
  background-color: rgb(255, 255, 255) !important;
  border: 2px solid red !important;
  border-radius: 50% !important;
}
.blackCircle {
  background-color: rgba(204, 204, 204, 0.356) !important;
  border: 2px solid #ccc !important;
}
.blackContent {
  color: black !important;
  //font-style: italic;
}
.greyContent {
  color: rgb(117, 115, 115) !important;
}
.redContent {
  color: red !important;
  font-style: italic;
}
.vc-day .vc-opacity-0 {
  opacity: 0.2;
}
</style>
