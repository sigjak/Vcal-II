<template>
  <div>
    <h1 class="text-center headerSize text-light display-4 mt-4">
      {{ userData.unit }}
    </h1>
    <div class="container pb-5">
      <form @submit.prevent="submitting">
        <!--                                      THIN SECTIONS                   -->
        <div
          v-if="userData.table == 'thin_sections'"
          class="linBg mt-md-4 border border-light rounded p-3"
        >
          <h5>Select:</h5>

          <div class="row">
            <div class="form-group col-sm-3">
              <input
                v-model.number="userData.slide27"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">27*46 mm slide</p>
            </div>

            <div class="form-group col-sm-3">
              <input
                v-model.number="userData.slide27Coated"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">
                27*46 mm slide
                <br />polished/coated
              </p>
            </div>

            <div class="form-group col-sm-3 text-center">
              <input
                v-model.number="userData.oneRound"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">1" round slide</p>
            </div>

            <div class="form-group col-sm-3 text-center">
              <input
                v-model.number="userData.onePolished"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">
                1" round slide
                <br />polished/coated
              </p>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-sm-3 text-center">
              <input
                v-model.number="userData.mountCoated"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">
                1" round mount
                <br />polished/coated
              </p>
            </div>

            <div class="form-group col-sm-3 text-center">
              <input
                v-model.number="userData.oneSeven"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">
                1" round mount
                <br />7 spl polished/coated
              </p>
            </div>
            <div class="form-group col-sm-3 text-center">
              <input
                v-model.number="userData.carbon"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">Carbon coating</p>
            </div>
            <div class="form-group col-sm-3 text-center">
              <input
                v-model.number="userData.repolish"
                type="number"
                min="0"
                class="form-control form-control-sm"
              />
              <p class="text-center font-weight-bold">
                Repolishing and coating
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="userData.table !== 'thin_sections'"
          class="linBg mt-md-5 form-group row justify-content-center pt-3 pb-5 border rounded-lg"
        >
          <div class="col-12 text-center">
            <h2 class="text-muted">Select days</h2>
          </div>

          <div class="co-12 col-lg-auto mt-3">
            <v-date-picker
              mode="multiple"
              :columns="$screens({ default: 1, lg: 2 })"
              :firstDayOfWeek="2"
              :step="1"
              v-model="userData.dates"
              :disabled-dates="disabledDates"
              :attributes="attrs"
              is-inline
            />
          </div>

          <div class="col-auto">
            <div class="card mt-3">
              <div class="card-header text-center">Selected days</div>
              <div class="card-body pt-0 pl-2">
                <ul v-if="userData.dates.length">
                  <li v-for="(day, index) in userData.dates" :key="index">
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
import { mixinComputed } from "../assets/mixinComputed";
import Holidays from "../assets/dates";
import FormFields from "../UI/FormFields";
export default {
  props: ["unit", "table"],
  components: {
    FormFields
  },
  mixins: [mixinMethods, mixinComputed],
  methods: {
    submitting() {
      this.userData.dates.forEach(element => {
        this.userData.selectedDays.push(element.getTime() / 1000);
      });
      this.userData.account = `101-${this.userData.account}`;
      this.submit("instrPost.php");
    }
  },
  data() {
    return {
      kind: "instrument",
      disabledDates: [{ weekdays: [1, 7] }],
      userData: {
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
        slide27: 0,
        slide27Coated: 0,
        oneRound: 0,
        onePolished: 0,
        oneSeven: 0,
        mountCoated: 0,
        carbon: 0,
        repolish: 0,
        selectedDays: []
      },
      reservedDays: []
    };
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
    this.$http.get(`getDate.php?name=${this.userData.table}`).then(resp => {
      if (resp.data !== "ConnectionError") {
        this.assign(resp.data[1], this.reservedDays);
        this.disabledDates = this.disabledDates.concat(
          this.reservedDays,
          Holidays[1]
        );
        if (this.userData.table === "thin_sections") {
          this.userData.dates.push(new Date());
          this.kind = "thin_sections";
        }
      } else {
        this.showConnError();
      }
    });
  }
};
</script>
<style scoped>
.card {
  min-width: 200px !important;
  min-height: 200px;
}
</style>
