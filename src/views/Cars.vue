<template>
  <!-- 1 is confirmed, 0 is pending -->
  <div>
    <h1 class="text-center text-light display-4  mt-4">{{ userData.unit }}</h1>

    <div class="container pb-5">
      <form @submit.prevent="submitting">
        <!--                                      THIN SECTIONS                   -->

        <div
          class=" linBg mt-5 form-group row justify-content-center pt-3 pb-5 border rounded-lg "
        >
          <div class="col-12 text-center">
            <h2 class="text-muted">Select days</h2>
          </div>

          <div class=" mt-3">
            <v-date-picker
              mode="range"
              :columns="$screens({ default: 1, lg: 2 })"
              :firstDayOfWeek="2"
              v-model="userData.dates"
              :disabled-dates="disabledDates"
              :attributes="attrs"
              is-inline
            />
          </div>

          <div class="col-auto ">
            <div class=" card mt-3">
              <div class="card-header text-center ">Selected days</div>
              <div class="card-body text-center pt-0 pl-0">
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
            placeholder="Provide info on travel, destination, how to contact, GSM etc.  "
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
import { mixins } from "../assets/mixin";
import Holidays from "../assets/dates";

export default {
  props: ["unit", "table"],
  mixins: [mixins],
  methods: {
    submitting() {
      // selectedDays contains PHP timestamp
      this.userData.selectedDays = this.daysBetween(
        this.userData.dates.start.getTime(),
        this.userData.dates.end.getTime()
      );

      this.userData.status = this.carStatus(this.userData.dates.start);
      console.log(this.userData);
      this.userData.account = `101-${this.userData.account}`;
      this.submit("carPost.php");
    }
  },
  data() {
    return {
      disabledDates: [],
      pendingDays: [],
      reservedDays: [],
      userData: {
        status: "0",
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
        },
        {
          key: "pending",
          highlight: {
            class: "bluebg",
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
    this.$http.get(`getDate.php?name=${this.userData.table}`).then(resp => {
      if (resp.data !== "ConnectionError") {
        this.assign(resp.data[0], this.pendingDays);
        this.assign(resp.data[1], this.disabledDates);
      } else {
        this.showConnError();
      }
    });
  }
};
</script>
<style scoped>
.card {
  min-width: 220px !important;
  min-height: 200px !important;
}

li {
  line-height: 1.35rem !important;
  text-align: left;
  padding-left: 10px;
}
</style>
