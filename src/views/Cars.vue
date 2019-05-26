<template>
  <!-- 1 is confirmed, 0 is pending -->
  <div>
    <img src="../images/header_01.png" class="img-fluid" />
    <h1 class="text-center display-4  mt-4">{{ userData.unit }}</h1>

    <div class="container pb-5">
      <form @submit.prevent="submitting">
        <!--                                      THIN SECTIONS                   -->

        <div
          class=" tt mt-5 form-group row justify-content-center pt-3 pb-5 border rounded-lg "
        >
          <div class="col-12 text-center">
            <h2>Select days</h2>
          </div>

          <div class="col-12 col-lg-auto mt-3">
            <v-date-picker
              mode="range"
              :columns="$screens({ default: 1, md: 2 })"
              :firstDayOfWeek="2"
              v-model="userData.dates"
              :disabled-dates="disabledDates"
              :attributes="attrs"
              is-inline
            />
          </div>

          <!-- <div class="col-12 col-md-auto border rounded-lg mt-3 px-2 pt-3 sel">
            <h6 class=" h6 font-weight-bold px-2 ss mb-0">Selected Days</h6>
            <ul v-if="userData.dates.length">
              <li v-for="(day, index) in userData.dates" :key="index">
                {{ day.toDateString() }}
              </li>
            </ul>
          </div> -->
          <div class="col-10 col-lg-auto">
            <div class=" card mt-3">
              <div class="card-header text-center ">Selected days</div>
              <div class="card-body pt-0 pl-2">
                <ul
                  class="py-1"
                  v-if="typeof userData.dates.start !== 'undefined'"
                >
                  <li>
                    <span>From: {{ userData.dates.start.toDateString() }}</span>
                  </li>
                  <li>
                    <span>
                      To: &nbsp;&nbsp;&nbsp;&nbsp;
                      {{ userData.dates.end.toDateString() }}</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button @click="testing" class="btn btn-secondary">Test</button>
    </div>
  </div>
</template>

<script>
import Holidays from "../assets/dates";
import f from "../func.js";

export default {
  props: ["unit", "table"],
  methods: {
    testing() {
      let tt = f.daysBetween(
        this.userData.dates.start.getTime(),
        this.userData.dates.end.getTime()
      );
      console.log(tt);
    },
    showAlert() {
      this.$swal({
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "No",
        allowOutsideClick: false,
        type: "success",
        title: "Email sent!",
        text: "More reservations?",
        confirmButtonText: "Yes"
      }).then(res => {
        if (res.value) {
          this.$router.push("/selectItem/");
        } else {
          window.location.href = "http://jardvis.hi.is/";
        }
      });
    },
    submitting() {
      let stat = f.status(this.userData);
      // selectedDays contains PHP timestamp
      if (stat) {
        this.userData.dates.forEach(element => {
          this.userData.selectedDays.push(element.getTime() / 1000);
        });
        this.userData.account = `101-${this.userData.account}`;
        this.$swal({
          title: "Saving and sending email",
          type: "info",
          onBeforeOpen: () => {
            this.$swal.showLoading();
            this.$http.post("halfDayPostNew.php", this.userData).then(() => {
              this.userData.selectedDays = [];
              this.userData.dates = [];
              this.$swal.disableLoading();
              //this.showAlert();
            });
          }
        });
      } else {
        this.$swal({
          type: "error",
          text: "Select AM, PM or both!",
          timer: 3000
        });
      }
    }
  },
  data() {
    return {
      disabledDates: [],
      pendingDays: [],
      reservedDays: [],
      userData: {
        am: [],
        pm: [],
        status: [],
        unit: "",
        table: "",
        dates: [],
        fullname: "",
        email: "",
        repeatEmail: "",
        account: "",
        supervisor: "",
        comments: "",
        selectedDays: []
      }
    };
  },
  computed: {
    attrs() {
      const attrs = [
        {
          highlight: {
            class: "ba",
            contentClass: "bo"
          },
          popover: {
            label: "Holiday",
            hideIndicator: true
          },
          dates: Holidays[1]
        },
        {
          key: "booked",
          highlight: {
            class: "allbg",
            contentClass: "bo"
          },
          popover: {
            label: "Booked",
            hideIndicator: true
          },
          dates: this.disabledDates
        },
        {
          key: "pending",
          highlight: {
            class: "ambg",
            contentClass: "amcontent"
          },
          popover: {
            label: "Requested",
            hideIndicator: true
          },
          dates: this.pendingDays
        }
      ];
      return attrs;
    }
  },

  created() {
    //1 is confirmed, 0 is pending -
    this.userData.unit = this.unit;
    this.userData.table = this.table;
    this.$http.get(`getHalfDate.php?name=${this.userData.table}`).then(resp => {
      f.assign(resp.data[0], this.pendingDays);
      f.assign(resp.data[1], this.disabledDates);
    });
  }
};
</script>
<style scoped>
ul {
  padding: 2rem;
}
li {
  line-height: 1.35rem !important;
}
</style>
