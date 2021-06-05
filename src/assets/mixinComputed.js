import Holidays from "./dates";
export const mixinComputed = {
  computed: {
    attrs() {
      const attrs1 = [
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
        // {
        //   key: "allday",
        //   highlight: {
        //     class: "redBackground",
        //     contentClass: "whiteContent"
        //   },
        //   popover: {
        //     label: "Booked",

        //     hideIndicator: true
        //   },
        //   customData: {
        //     key: "some"
        //   },
        //   dates: this.reservedDays[1],
        //   order: 100
        // },
        // {
        //   key: "allday",
        //   highlight: {
        //     class: "redBackground",
        //     contentClass: "whiteContent"
        //   },
        //   popover: {
        //     label: "Booked2",

        //     hideIndicator: true
        //   },
        //   customData: {
        //     key: "some"
        //   },
        //   dates: this.reservedDays[2],
        //   order: 100
        // },
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

      // second array with names of those that booked

      for (var i = 0; i < this.reservedDays.length; i++) {
        const temp = {
          key: "allday",
          highlight: {
            class: "redBackground",
            contentClass: "whiteContent"
          },
          popover: {
            label: this.resNames[i] + " booked",

            hideIndicator: true
          },
          customData: {
            key: "some"
          },
          dates: this.reservedDays[i],
          order: 100
        };
        this.attrs2.push(temp);
      }

      const attrs = [...attrs1, ...this.attrs2];
      return attrs;
    }
  }
};
