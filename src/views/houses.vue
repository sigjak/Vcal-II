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
              mode="range"
              :columns="$screens({ default: 1, lg: 2 })"
              :firstDayOfWeek="2"
              :step="1"
              v-model="userData.dates"
              :disabled-dates="reservedDays"
              :attributes="attrsHouse"
              is-inline
              @input="setMax"
            />
          </div>

          <div class="col-auto">
            <div class="card mt-3">
              <div class="card-header text-center">Selected days</div>
              <div class="card-body pt-0 pl-2">
                <div v-if="userData.dates != null">
                  <ul
                    class="py-1"
                    v-if="typeof userData.dates.start !== 'undefined'"
                  >
                    <li>From: {{ userData.dates.start.toDateString() }}</li>
                    <li>
                      <span style="padding-right:18px;">To:</span>
                      {{ userData.dates.end.toDateString() }}
                    </li>
                  </ul>
                </div>
                <div v-else class="text-center mt-4 pb-2">
                  Nothing selected!
                </div>
                <div class="input-group mt-3 mx-auto">
                  <div class="input-group-prepend">
                    <span class="input-group-text bb">How many?</span>
                  </div>

                  <input
                    v-model.number="userData.status"
                    type="number"
                    class="form-control"
                    :class="{ bord: userData.status.length < 1 }"
                    id="ip"
                    min="1"
                    max
                    v-on:click.once="setMax"
                    v-on:keyup="maxGuard"
                  />
                  <span
                    class="hide"
                    :class="{ err: userData.status.length < 1 }"
                    >Enter a number</span
                  >
                </div>
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
// import Holidays from "../assets/dates";
import { mixinMethods } from "../assets/mixinMethods";
import { mixinComputed } from "../assets/mixinComputed";
import FormFields from "../UI/FormFields";
export default {
  components: {
    FormFields
  },
  props: ["unit", "table"],
  mixins: [mixinMethods, mixinComputed],

  data() {
    return {
      firstRun: true,
      kind: "house",
      attrsHouse: [],
      compareDays: [],
      reservedDays: [],
      availableDays: [],
      statusDays: [],
      maxOccupancy: "",
      userData: {
        status: [],
        unit: "",
        table: "",
        dates: {},
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

  methods: {
    toWord(inp) {
      let num = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven"
      ];
      const number = parseInt(inp);
      return num[number] + " available.";
    },
    highClass(available) {
      let occupied = this.maxOccupancy - available;
      let ref = (occupied / this.maxOccupancy) * 100;
      if (ref < 10) {
        return "house10";
      }
      if (ref >= 10 && ref < 20) {
        return "house20";
      }
      if (ref >= 20 && ref < 30) {
        return "house30";
      }
      if (ref >= 30 && ref < 40) {
        return "house40";
      }
      if (ref >= 40 && ref < 50) {
        return "house50";
      }
      if (ref >= 50 && ref < 60) {
        return "house60";
      }
      if (ref >= 60 && ref < 70) {
        return "house70";
      }
      if (ref >= 70 && ref < 80) {
        return "house80";
      }
      if (ref >= 80) {
        return "house90";
      }
    },
    maxGuard() {
      const inp = document.getElementById("ip");

      if (this.userData.status > inp.max) this.userData.status = "";
    },
    setMax() {
      if (this.firstRun) {
        this.firstRun = false;
        return;
      }

      const inp = document.getElementById("ip");

      this.userData.status = "";
      this.userData.selectedDays = this.daysBetween(
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

    submitting() {
      // selectedDays contain PHP timestamp
      this.userData.account = `101-${this.userData.account}`;
      this.submit("housePost.php");
      // console.log(this.userData);
    },
    howToBook() {
      this.$swal({
        title: "Selecting:",
        timer: 10000,
        text:
          "Click on arrival day and release; then move cursor to departure day and click."
      });
    }
  },
  computed: {
    moreAttr() {
      let arr2 = [];
      const arrLength = this.statusDays.length;
      for (let i = 0; i < arrLength; i++) {
        const temp = {
          highlight: {
            class: this.highClass(this.statusDays[i]),
            contentClass: "blackContent"
          },
          popover: {
            label: this.toWord(this.statusDays[i]),
            hideIndicator: true
          },
          dates: this.availableDays[i],
          order: 200
        };
        arr2.push(temp);
      }

      return arr2;
    }
  },

  mounted() {
    this.howToBook();
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

    if (this.table == "vidimelur") this.kind = "vidimelur";
    this.$http.get(`getHouse.php?name=${this.userData.table}`).then(resp => {
      if (resp.data !== "ConnectionError") {
        this.assign(resp.data[0], this.availableDays);
        this.compareDays = resp.data[0].map(element => {
          return element / 1000;
        });
        //console.log(this.compareDays);
        this.statusDays = resp.data[1];
        this.assign(resp.data[2], this.reservedDays);
        this.maxOccupancy = resp.data[3];
        this.attrsHouse = this.attrs.concat(this.moreAttr);
      } else {
        this.showConnError();
      }
    });
  }
};
</script>
<style scoped>
li {
  padding-left: 10px;
  line-height: 1.35rem !important;
}
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
</style>
