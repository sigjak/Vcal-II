<template>
  <div>
    <h1 class="text-center text-light display-4  mt-4">{{ userData.unit }}</h1>

    <div class="container pb-5">
      <form @submit.prevent="submitting">
        <div
          class=" linBg mt-5 form-group row justify-content-center pt-3 pb-5 border rounded-lg "
        >
          <div class="col-12 text-center">
            <h2 class="text-muted">Select days</h2>
          </div>

          <div class="col-auto mt-3">
            <v-date-picker
              mode="range"
              :columns="$screens({ default: 1, lg: 2 })"
              :firstDayOfWeek="2"
              v-model="userData.dates"
              :disabled-dates="disabledDates"
              :attributes="attrs"
              is-inline
              @input="setMax"
            />
          </div>

          <div class="col-auto">
            <div class=" card mt-3">
              <div class="card-header text-center ">Selected days</div>
              <div class="card-body pt-0 pl-2">
                <ul
                  class="py-1"
                  v-if="typeof userData.dates.start !== 'undefined'"
                >
                  <li>From: {{ userData.dates.start.toDateString() }}</li>
                  <li>
                    To: &nbsp;&nbsp;&nbsp;&nbsp;
                    {{ userData.dates.end.toDateString() }}
                  </li>
                </ul>
                <div
                  class="input-group mt-2 mx-auto"
                  v-show="typeof userData.dates.start !== 'undefined'"
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text bb">How many?</span>
                  </div>
                  <input
                    v-model="userData.status"
                    type="number"
                    class="form-control "
                    :class="{ bord: $v.userData.status.$invalid }"
                    id="ip"
                    min="1"
                    max=""
                    v-on:keyup="maxGuard"
                  />
                  <span
                    class="hide"
                    :class="{ err: $v.userData.status.$invalid }"
                  >
                    Enter a number
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group ">
          <label class="text-white col-form-label  ">Full Name</label>
          <input
            type="text"
            :class="{ 'is-invalid': $v.userData.fullname.$invalid }"
            class="form-control  "
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
              class="form-control "
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
              class="form-control "
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
            class="form-control "
            id="supervisor"
            placeholder="...if applicable"
            v-model.trim="userData.supervisor"
          />
        </div>

        <div class="form-group">
          <label class="text-light ">Comments</label>
          <textarea
            class="form-control  "
            :class="{ 'is-invalid': $v.userData.comments.$invalid }"
            :placeholder="place"
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
            />
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
  props: ["unit", "table"],
  methods: {
    maxGuard() {
      const inp = document.getElementById("ip");
      if (this.userData.status > inp.max) this.userData.status = "";
    },
    setMax() {
      const inp = document.getElementById("ip");
      this.userData.status = "";
      this.userData.selectedDays = f.daysBetween(
        this.userData.dates.start.getTime(),
        this.userData.dates.end.getTime()
      );
      let g = [];
      this.userData.selectedDays.forEach(element => {
        const temp = this.compareDays.indexOf(element);
        if (temp !== -1) {
          g.push(this.statusDays[temp]);
        }
      });
      if (g.length > 0) {
        inp.max = +Math.min.apply(null, g);
      } else {
        inp.max = this.maxOccupancy;
      }
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
      // selectedDays contains PHP timestamp

      this.userData.account = `101-${this.userData.account}`;
      this.$swal({
        title: "Saving and sending email",
        type: "info",
        onBeforeOpen: () => {
          this.$swal.showLoading();
          this.$http.post("housePost.php", this.userData).then(() => {
            this.userData.selectedDays = [];
            this.userData.dates = [];
            this.$swal.disableLoading();
            this.showAlert();
          });
        }
      });
    }
  },
  data() {
    return {
      // place: "Provide some basic infor, how to contact GSM mobile etc.",
      compareDays: [],
      disabledDates: [],
      availableDays: [],
      statusDays: [],
      maxOccupancy: "",
      userData: {
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
            class: "redCircle",
            contentClass: "redContent"
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
            class: "redBackground",
            contentClass: "whiteContent"
          },
          popover: {
            label: "Booked",
            hideIndicator: true
          },
          dates: this.disabledDates
        }
      ];

      const arrLength = this.statusDays.length;
      for (let i = 0; i < arrLength; i++) {
        const temp = {
          highlight: {
            class: "ambg",
            contentClass: "amcontent"
          },
          popover: {
            label: `Available: ${this.statusDays[i]}`,
            hideIndicator: true
          },
          dates: this.availableDays[i]
        };
        attrs.push(temp);
      }

      return attrs;
    },
    place() {
      let place = "Provide some basic info, how to contact GSM mobile etc.";
      if (this.table === "vidimelur") {
        place =
          "Further information if needed and where to send the invoice if applicable";
      }
      return place;
    }
  },

  created() {
    this.userData.unit = this.unit;
    this.userData.table = this.table;
    this.$http.get(`getHouse.php?name=${this.userData.table}`).then(resp => {
      f.assign(resp.data[0], this.availableDays);
      this.compareDays = resp.data[0].map(element => {
        return element / 1000;
      });
      this.statusDays = resp.data[1];
      f.assign(resp.data[2], this.disabledDates);
      this.maxOccupancy = resp.data[3];
    });
  },
  validations: {
    userData: {
      status: {
        required,
        minLength: minLength(1)
      },
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
  }
};
</script>
<style scoped>
.hide {
  display: none;
}
.bord {
  border: 1px solid red;
}
.err {
  display: block;
  color: red !important;
  font-size: 60%;
}

.card-body .input-group {
  width: 80%;
}
.bb {
  font-size: 70%;
}
input[type="number"] {
  width: 50px !important;
}
.card {
  min-width: 230px !important;
  min-height: 200px !important;
}

li {
  line-height: 1.35rem !important;
}
</style>
