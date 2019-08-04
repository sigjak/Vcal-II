import Holidays from "./dates";
export const mixinComputed = {
  computed: {
    attrs() {
      const attrs = [
        {
          bar: true,
          dates: new Date(),
          popover: {
            label: "Today",
            hideIndicator: true
          }
        },
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
          key: "allday",
          highlight: {
            class: "redBackground",
            contentClass: "blackContent"
          },
          popover: {
            label: "Booked",
            hideIndicator: true
          },
          dates: this.reservedDays
        },
        {
          key: "pending",
          highlight: {
            class: "bluebg",
            contentClass: "whiteContent"
          },
          popover: {
            label: "Requested",
            hideIndicator: true
          },
          dates: this.pendingDays
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
            class: "pmbg",
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
  }
};
