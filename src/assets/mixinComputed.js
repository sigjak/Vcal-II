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
            contentClass: "whiteContent"
          },
          popover: {
            label: "Booked",
            hideIndicator: true
          },
          dates: this.reservedDays,
          order: 100
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
          dates: this.pendingDays,
          order: 100
        },
        {
          key: "am",
          highlight: {
            class: "ambg",
            contentClass: "blackContent"
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
            contentClass: "blackContent"
          },
          popover: {
            label: "AM available",
            hideIndicator: true
          },
          dates: this.pmReservedDays
        }
        // {
        //   key: "weekend",
        //   highlight: {
        //     class: "whiteBackground",
        //     contentClass: this.kind === "instrument" ? "notAllowed" : ""
        //   },
        //   dates: { weekdays: [1, 7] }
        // }
      ];
      return attrs;
    }
  }
};
