/* eslint-disable no-plusplus */
function getEaster(year) {
  const f = Math.floor;
  const G = year % 19;
  const C = f(year / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const day = L + 28 - 31 * f(month / 4);
  return [month, day];
}

function holidays() {
  const today = new Date();
  const yr = today.getFullYear();

  const jan1 = new Date(yr, 0, 1);
  const may1 = new Date(yr, 4, 1);
  const june17 = new Date(yr, 5, 17);
  const dec24 = new Date(yr, 11, 24);
  const dec25 = new Date(yr, 11, 25);
  const dec26 = new Date(yr, 11, 26);
  const dec31 = new Date(yr, 11, 31);
  const disabledDates = [jan1, may1, june17, dec24, dec25, dec26, dec31];
  let sumFyrsti = new Date();
  for (let i = 1; i < 8; i++) {
    const test = new Date(yr, 3, 18 + i);
    if (test.getDay() === 4) {
      sumFyrsti = test;
      break;
    }
  }
  disabledDates.push(sumFyrsti);
  let fridVerslm = new Date();
  for (let i = 0; i < 7; i++) {
    const test = new Date(yr, 7, 1 + i);
    if (test.getDay() === 1) {
      fridVerslm = test;
      break;
    }
  }
  disabledDates.push(fridVerslm);
  const pask = getEaster(yr);
  const paskadagur = new Date(yr, pask[0] - 1, pask[1]);
  disabledDates.push(paskadagur);
  const skird = paskadagur.getTime() - 3 * 60 * 60 * 24 * 1000;
  const skirdagur = new Date(skird);
  disabledDates.push(skirdagur);
  const fostud = skird + 86400000;
  const fostudagurinnlangi = new Date(fostud);
  disabledDates.push(fostudagurinnlangi);
  const annarpaskadagur = new Date(fostud + 3 * 24 * 60 * 60 * 1000);
  disabledDates.push(annarpaskadagur);

  const annarhvsunna = new Date(paskadagur.getTime() + 50 * 24 * 60 * 60000);
  disabledDates.push(annarhvsunna);
  const uppstdagur = new Date(paskadagur.getTime() + 39 * 24 * 60 * 60 * 1000);
  disabledDates.push(uppstdagur);
  const janNext = new Date(yr + 1, 0, 1);
  disabledDates.push(janNext);
  const holidays2 = disabledDates.slice();
  disabledDates.push({ weekdays: [1, 7] });
  return [disabledDates, holidays2];
}

const data = holidays();
export default data;
