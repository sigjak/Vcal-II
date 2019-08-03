//import { sameAs, email, required, minLength } from "vuelidate/lib/validators";

export const mixins = {
  // validations: {
  //   userData: {
  //     status: {
  //       required,
  //       minLength: minLength(1)
  //     },
  //     fullname: {
  //       required,
  //       minLength: minLength(5)
  //     },
  //     email: {
  //       required,
  //       email
  //     },
  //     repeatEmail: {
  //       required,
  //       email,
  //       sameAsEmail: sameAs("email")
  //     },
  //     account: {
  //       required,
  //       moLength: minLength(4)
  //     },
  //     comments: {
  //       required,
  //       minLength: minLength(6)
  //     }
  //   }
  // },
  methods: {
    submit(phpConnect) {
      this.$swal({
        title: "Saving and sending email",
        type: "info",
        onBeforeOpen: () => {
          this.$swal.showLoading();
          this.$http.post(phpConnect, this.userData).then(resp => {
            //this.userData.selectedDays = [];
            //this.userData.dates = [];
            this.$swal.disableLoading();

            if (resp.data == "error") {
              this.showError();
            } else {
              this.showOk();
            }
          });
        }
      });
    },
    assign(resp, arr) {
      resp.forEach(item => {
        arr.push(new Date(item));
      });
    },
    status(obj) {
      let check = true;
      for (let i = 0; i < obj.dates.length; i++) {
        if (obj.am[i] !== true && obj.pm[i] !== true) {
          check = false;
          break;
        } else if (obj.am[i] !== true && obj.pm[i] === true) {
          obj.status[i] = 2;
        } else if (obj.am[i] === true && obj.pm[i] !== true) {
          obj.status[i] = 0;
        } else if (obj.am[i] === true && obj.pm[i] === true) {
          obj.status[i] = 1;
        }
      }
      if (check === false) {
        return false;
      } else {
        return true;
      }
    },
    show(userobj, ampm, show) {
      const len = userobj.dates.length;
      for (let i = 0; i < len; i++) {
        if (ampm.indexOf(userobj.dates[i].getTime()) !== -1) {
          show[i] = false;
        } else {
          show[i] = true;
        }
      }
    },

    daysBetween(start, end) {
      let tsArray = [];
      tsArray.push(start);
      do {
        start = start + 86400000;
        tsArray.push(start);
      } while (start < end);
      tsArray.forEach((element, index) => (tsArray[index] = element / 1000));
      return tsArray;
      // tsArray timestamp for PHP
    },
    carStatus(day) {
      let dayOne = day.getTime();
      let status = 1;

      const yr = +new Date().getFullYear();
      const firstDaySummer = new Date(yr, 4, 1).getTime();
      const lastDaySummer = new Date(yr, 9, 1).getTime();

      if (firstDaySummer < dayOne && dayOne < lastDaySummer) {
        status = 0;
      }

      return status;
    },
    showError() {
      this.$swal({
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "No",
        allowOutsideClick: false,
        type: "error",
        title: "Something went wrong!!</br> Booked -- but no email sent!",
        text: "Try again?",
        confirmButtonText: "Yes"
      }).then(res => {
        if (res.value) {
          this.$router.push("/selectItem");
        } else {
          window.location.href = "http://jardvis.hi.is/";
        }
      });
    },
    showConnError() {
      this.$swal({
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "No",
        allowOutsideClick: false,
        type: "error",
        title: "Could not connect to database!!",
        text: "Try again?",
        confirmButtonText: "Yes"
      }).then(res => {
        if (res.value) {
          this.$router.push("/selectItem");
        } else {
          window.location.href = "http://jardvis.hi.is/";
        }
      });
    },
    showOk() {
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
          this.$router.push("/selectItem");
        } else {
          window.location.href = "http://jardvis.hi.is/";
        }
      });
    }
  }
};
