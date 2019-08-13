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
              :step="1"
              v-model="userData.dates"
              :disabled-dates="reservedDays"
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

        <FormFields :userData="userData" :kind="kind" />
      </form>
    </div>
  </div>
</template>

<script>
import { mixinMethods } from "../assets/mixinMethods";
import { mixinComputed } from "../assets/mixinComputed";
//import Holidays from "../assets/dates";
import FormFields from "../UI/FormFields";
export default {
  components: {
    FormFields
  },
  props: ["unit", "table"],
  mixins: [mixinMethods, mixinComputed],
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
      kind: "cars",
      reservedDays: [],
      pendingDays: [],

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

  created() {
    //1 is confirmed, 0 is pending -
    if (!this.unit) {
      this.userData.unit = localStorage.getItem("unit");
      this.userData.table = localStorage.getItem("table");
    } else {
      this.userData.unit = this.unit;
      this.userData.table = this.table;
      localStorage.setItem("unit", this.unit);
      localStorage.setItem("table", this.table);
    }
    this.$http.get(`getDate.php?name=${this.userData.table}`).then(resp => {
      if (resp.data !== "ConnectionError") {
        this.assign(resp.data[0], this.pendingDays);
        this.assign(resp.data[1], this.reservedDays);
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
