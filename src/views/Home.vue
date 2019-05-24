<template>
  <div>
    <div class="jumbotron jumbotron-fluid mx-0">
      <div class="h1">EEEE</div>
    </div>
    <div class="container">
      <form @submit.prevent="submitting">
        <div
          class="form-group row justify-content-center py-5 border rounded-lg "
        >
          <div class="col-12 text-center"><h4>Select days</h4></div>

          <div class="col-12 col-md-auto mt-3">
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
          <div class="card mt-3">
            <div class="card-header">Selected days</div>
            <div class="card-body pt-0 pl-2">
              <ul v-if="userData.dates.length">
                <li v-for="(day, index) in userData.dates" :key="index">
                  {{ day.toDateString() }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="  ">Full Name</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Enter Full Name"
            v-model.trim="userData.fullname"
          />
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="email" class=" col-form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              v-model.trim="userData.email"
            />
          </div>
          <div class="col-md-6">
            <label for="verifyemail" class=" col-form-label"
              >Verify Email</label
            >
            <input
              type="email"
              class="form-control"
              id="verifyemail"
              placeholder="Verify email"
              v-model.trim="userData.repeatEmail"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="  ">Account</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">101</span>
            </div>
            <input
              type="text"
              class="form-control"
              id="account"
              placeholder="This account willl be charged!"
              v-model.trim="userData.account"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="  ">Supervisor</label>

          <input
            type="text"
            class="form-control"
            id="supervisor"
            placeholder="...if applicable"
            v-model.trim="userData.supervisor"
          />
        </div>

        <div class="form-group">
          <label>Comments</label>
          <textarea
            class="form-control"
            placeholder="Provide info on what is to be analyzed, number of samples, sample preparations etc. "
            id="comments"
            cols="30"
            rows="5"
            v-model.trim="userData.comments"
          ></textarea>
        </div>

        <div class="row">
          <div class="col-2">
            <input type="submit" value="submit" class="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Holidays from "../assets/dates";
// Holidays[1] = legal holidays; Holidays[0] = legal holidays and weekends
export default {
  methods: {
    submitting() {
      // selectedDays contains timestamp PHP
      this.userData.dates.forEach(element => {
        this.userData.selectedDays.push(element.getTime() / 1000);
      });

      this.$http.post("instrPostNew.php", this.userData).then(() => {
        this.userData.selectedDays = [];
        this.userData.dates = [];
      });
    }
  },
  data() {
    return {
      disabledDates: [{ weekdays: [1, 7] }],
      userData: {
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

      alreadyReservedDays: []
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
          key: "reserved",
          highlight: {
            class: "bas",
            contentClass: "bo"
          },
          popover: {
            label: "Booked",
            hideIndicator: true
          },

          dates: this.alreadyReservedDays
        }
      ];
      return attrs;
    }
  },
  created() {
    this.$http.get(`getDateNew.php?name=${this.userData.table}`).then(resp => {
      let arr = resp.data[1];
      arr.forEach(item => {
        this.alreadyReservedDays.push(new Date(item));
      });

      this.disabledDates = this.disabledDates.concat(
        this.alreadyReservedDays,
        Holidays[1]
      );
    });
  }
};
</script>
<style>
.card-header {
  background-color: #edb862 !important;
}
.sel {
  background-color: #fff;
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
  font-size: 0.8rem;
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
.bas {
  background-color: #fff !important;
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
  background-color: #fdfdfd !important;
}
</style>
