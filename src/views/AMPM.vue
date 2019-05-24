<template>
  <div>
    <img src="../images/header_01.png" class="img-fluid" />
    <h1 class="text-center display-4 text-light mt-4">{{ userData.unit }}</h1>

    <div class="container pb-5">
      <form @submit.prevent="submitting">
        <div
          class=" tt mt-5 form-group row justify-content-center pt-3 pb-5 border rounded-lg "
        >
          <div class="col-12 text-center">
            <h1>Select days</h1>
          </div>

          <div class="col-12 col-lg-auto mt-3">
            <v-date-picker
              mode="multiple"
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
                <ul v-if="userData.dates.length">
                  <li v-for="(day, index) in userData.dates" :key="index">
                    <span v-if="amShow[index]">
                      <input
                        type="checkbox"
                        id="am"
                        value="am"
                        v-model="userData.am[index]"
                      />

                      <label class="mx-1">AM</label>
                    </span>
                    <span v-if="pmShow[index]">
                      <input
                        type="checkbox"
                        id="pm"
                        value="pm"
                        v-model="userData.pm[index]"
                      />
                      <label class="mx-1">PM</label>
                    </span>

                    {{ day.toDateString() }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="text-white col-form-label  ">Full Name</label>
          <input
            type="text"
            :class="{ 'is-invalid': $v.userData.fullname.$invalid }"
            class="form-control "
            id="fullname"
            placeholder="Enter Full Name"
            v-model.trim="userData.fullname"
          />
          <div class="invalid-feedback">
            Full name required
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="email" class=" text-white col-form-label">Email</label>
            <input
              type="email"
              :class="{ 'is-invalid': $v.userData.email.$invalid }"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model.trim="userData.email"
            />
            <div class="invalid-feedback">
              Email required.
            </div>
          </div>
          <div class="col-md-6">
            <label for="repeatEmail" class="text-white col-form-label"
              >Verify Email</label
            >
            <input
              type="email"
              class="form-control"
              id="repeatEmail"
              placeholder="Verify email"
              :class="{ 'is-invalid': $v.userData.repeatEmail.$invalid }"
              v-model.trim="userData.repeatEmail"
            />
            <div
              v-if="
                $v.userData.repeatEmail.$invalid && !$v.userData.email.$invalid
              "
              class="invalid-feedback"
            >
              Verification required.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class=" text-light ">Account</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">101</span>
            </div>
            <input
              type="text"
              :class="{ 'is-invalid': $v.userData.account.$invalid }"
              class="form-control"
              id="account"
              placeholder="This account willl be charged!"
              v-model.trim="userData.account"
            />
            <div class="invalid-feedback">
              Account required.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class=" text-light ">Supervisor</label>

          <input
            type="text"
            class="form-control"
            id="supervisor"
            placeholder="...if applicable"
            v-model.trim="userData.supervisor"
          />
        </div>

        <div class="form-group">
          <label class="text-light ">Comments</label>
          <textarea
            class="form-control "
            :class="{ 'is-invalid': $v.userData.comments.$invalid }"
            placeholder="Provide info on what is to be analyzed, number of samples, sample preparations etc. "
            id="comments"
            cols="30"
            rows="5"
            v-model.trim="userData.comments"
          ></textarea>
          <div class="invalid-feedback">
            Some basic info...
          </div>
        </div>

        <div class="row">
          <div class="col-2">
            <input
              type="submit"
              value="Submit"
              class="btn btn-primary"
              :disabled="$v.userData.$invalid || userData.dates.length <= 0"
            />=0" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { sameAs, email, required, minLength } from "vuelidate/lib/validators";
import Holidays from "../assets/dates";
import f from "../func.js";

export default {
  methods: {
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
      disabledDates: [{ weekdays: [1, 7] }],
      amShow: [],
      pmShow: [],
      userData: {
        am: [],
        pm: [],
        amArray: [],
        pmArray: [],

        status: [],
        unit: "Microprobe",
        table: "probeuse",
        dates: [],
        fullname: "",
        email: "",
        repeatEmail: "",
        account: "",
        supervisor: "",
        comments: "",
        selectedDays: []
      },
      amReservedDays: [],
      pmReservedDays: [],
      ampmReservedDays: []
    };
  },
  validations: {
    userData: {
      fullname: {
        required,
        minLength: minLength(5)
      },
      email: {
        required,
        email
      },
      repeatEmail: {
        required,
        email,
        sameAsEmail: sameAs("email")
      },
      account: {
        required,
        moLength: minLength(4)
      },
      comments: {
        required,
        minLength: minLength(6)
      }
    }
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
          key: "allday",
          highlight: {
            class: "allbg",
            contentClass: "bo"
          },
          popover: {
            label: "Booked",
            hideIndicator: true
          },
          dates: this.ampmReservedDays
        },
        {
          key: "am",
          highlight: {
            class: "ambg",
            contentClass: "amcontent"
          },
          popover: {
            label: "PM available",
            hideIndicator: true
          },
          dates: this.amReservedDays
        },
        {
          key: "pm",
          highlight: {
            class: "ambg",
            contentClass: "amcontent"
          },
          popover: {
            label: "AM available",
            hideIndicator: true
          },
          dates: this.pmReservedDays
        }
      ];
      return attrs;
    }
  },
  beforeUpdate() {
    f.show(this.userData, this.amArray, this.amShow);
    f.show(this.userData, this.pmArray, this.pmShow);
  },
  created() {
    this.$http
      .get(`getHalfDateNew.php?name=${this.userData.table}`)
      .then(resp => {
        this.amArray = resp.data[0];
        this.pmArray = resp.data[2];
        f.assign(resp.data[0], this.amReservedDays);
        f.assign(resp.data[1], this.ampmReservedDays);
        f.assign(resp.data[2], this.pmReservedDays);

        this.disabledDates = this.disabledDates.concat(
          this.ampmReservedDays,
          Holidays[1]
        );
      });
  }
};
</script>
<style>
.error {
  border-color: red;
  color: red;
}
.tt {
  background-color: #f9f9f9;
}
.form-check-inline {
  margin-left: -0.5rem !important;
}
input[type="checkbox"] {
  vertical-align: middle;
  position: relative;
  bottom: 2px;
}
.card {
  min-width: 240px !important;
  min-height: 200px;
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
  padding: 10px 0px 0px 10px;
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
body {
  background-image: url("../images/view.jpg");
  background-size: cover;
}
</style>
