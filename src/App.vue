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

<style>
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
/* .cont {
  color: red !important;
} */
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
/* .ccc {
  color: red !important;
  cursor: no-drop !important;
} */
.whiteBackground {
  background-color: #fff !important;
}
.whiteContent {
  color: #fff !important;
}
.ambg {
  /* background-color: rgb(121, 151, 248) !important;*/
  background: linear-gradient(
    to right,
    red 0%,
    red 50%,
    blue 50%,
    blue 100%
  ) !important;
  border: 1px solid #fff !important;
  border-radius: 50% !important;
}
.pmbg {
  /* background-color: rgb(121, 151, 248) !important;*/
  background: linear-gradient(
    to right,
    blue 0%,
    blue 50%,
    red 50%,
    red 100%
  ) !important;
  border: 1px solid #fff !important;
  border-radius: 50% !important;
}
.amcontent {
  color: white !important;
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
  background-color: #fff !important;
  border: 1.5px solid red !important;
  border-radius: 50% !important;
  opacity: 0.5;
}
.redContent {
  color: red !important;
  font-style: italic;
}
.vc-day .vc-opacity-0 {
  opacity: 0.2;
}
</style>
