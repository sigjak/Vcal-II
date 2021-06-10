<template>
  <div>
    <h1 class="text-center headerSize text-light display-4 mt-4">
      {{ userData.unit }}
    </h1>
    <div class="container pb-5">
      <form @submit.prevent="submitting">
        <div
          class="linBg mt-md-5 form-group row justify-content-center pt-3 pb-5 border rounded-lg"
        >
          <div class="col-12 text-center">
            <h2 class="text-muted">Select days</h2>
          </div>

          <div class="col-auto mt-3">
            <v-date-picker
              mode="multiple"
              :columns="$screens({ default: 1, lg: 2 })"
              :firstDayOfWeek="2"
              :step="1"
              v-model="userData.dates"
              :disabled-dates="disabledDates"
              :attributes="ampmAttrs"
              is-inline
            />
          </div>

          <div class="col-auto">
            <div class="card mt-3">
              <div class="card-header text-center">Selected days</div>
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
                      <label class="ml-1">PM</label>
                    </span>
                    {{ day.toDateString() }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FormFields :userData="userData" :kind="kind" />
      </form>
    </div>
  </div>
</template>

<script>
import { mixinMethods } from "../assets/mixinMethods";
import { mixinComputedNew } from "../assets/mixinComputedNew";
import Holidays from "../assets/dates";
import FormFields from "../UI/FormFields";
export default {
  components: {
    FormFields
  },
  props: ["unit", "table"],
  mixins: [mixinMethods, mixinComputedNew],

  methods: {
    submitting() {
      let stat = this.status(this.userData);
      // selectedDays contains PHP timestamp
      if (stat) {
        this.userData.dates.forEach(element => {
          this.userData.selectedDays.push(element.getTime() / 1000);
        });
        this.userData.account = `101-${this.userData.account}`;
        this.submit("halfDayPost.php");
      } else {
        this.$swal({
          type: "error",
          text: "Select AM, PM or both!",
          timer: 3000
        });
      }
    }
  },
  computed: {
    amAttrs() {
      let amAttrs = [];
      const amLength = this.amReservedDays.length;
      for (let i = 0; i < amLength; i++) {
        const temp = {
          key: "am",
          highlight: {
            class: "ambg",
            contentClass: "blackContent"
          },
          popover: {
            label: this.amNames[i] + " booked. -- PM available",
            hideIndicator: true
          },
          dates: this.amReservedDays[i]
        };
        amAttrs.push(temp);
      }
      return amAttrs;
    },
    pmAttrs() {
      let pmAttrs = [];
      const pmLength = this.pmReservedDays.length;
      for (let i = 0; i < pmLength; i++) {
        const temp = {
          key: "pm",
          highlight: {
            class: "pmbg",
            contentClass: "blackContent"
          },
          popover: {
            label: this.pmNames[i] + " booked. -- AM available",
            hideIndicator: true
          },
          dates: this.pmReservedDays[i]
        };
        pmAttrs.push(temp);
      }
      return pmAttrs;
    }
  },

  data() {
    return {
      kind: "instrument",
      resNames: [],
      ampmAttrs: [],
      //attrs2: [],
      disabledDates: [{ weekdays: [1, 7] }],
      amShow: [],
      pmShow: [],
      amArray: [],
      pmArray: [],
      userData: {
        am: [],
        pm: [],
        status: [0],
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
      },
      amReservedDays: [],
      amNames: [],
      pmNames: [],
      pmReservedDays: [],
      reservedDays: []
    };
  },

  beforeUpdate() {
    this.show(this.userData, this.amArray, this.amShow);
    this.show(this.userData, this.pmArray, this.pmShow);
  },
  created() {
    if (!this.unit) {
      this.userData.unit = localStorage.getItem("unit");
      this.userData.table = localStorage.getItem("table");
    } else {
      this.userData.unit = this.unit;
      this.userData.table = this.table;
      localStorage.setItem("unit", this.unit);
      localStorage.setItem("table", this.table);
    }
    this.$http.get(`getHalfDate.php?name=${this.userData.table}`).then(resp => {
      if (resp.data !== "ConnectionError") {
        this.amArray = resp.data[0];
        this.pmArray = resp.data[2];
        this.assign(resp.data[0], this.amReservedDays);
        this.amNames = resp.data[1];
        this.resNames = resp.data[3];
        this.pmNames = resp.data[5];
        this.assign(resp.data[2], this.reservedDays);
        this.assign(resp.data[4], this.pmReservedDays);

        this.ampmAttrs = this.attrs.concat(this.amAttrs, this.pmAttrs);
        this.disabledDates = this.disabledDates.concat(
          this.reservedDays,
          Holidays[1]
        );
      } else {
        this.showConnError();
      }
    });
  }
};
</script>
<style scoped>
.card {
  min-width: 250px !important;
  min-height: 200px !important;
}
</style>
