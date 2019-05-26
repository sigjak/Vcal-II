const oo = {
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
  assign(resp, arr) {
    resp.forEach(item => {
      arr.push(new Date(item));
    });
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
  }
};
export default oo;
