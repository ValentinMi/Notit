// Function to make an object of the date

function getObjDate() {
  var date = new Date();

  // Get current year
  var y = date.getFullYear();

  // Get current month
  var m = date.getMonth() + 1;

  // Get current week
  var w = getWeekNumber(date);

  // Get current day in week
  var dw = getDayNumberInWeek(date);

  // Get current day in month
  var dm = date.getUTCDate();

  // Find current week number
  function getWeekNumber(dt) {
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  // Find current day number in week
  function getDayNumberInWeek(dt) {
    var weekday = new Array(7);
    weekday[0] = 0;
    weekday[1] = 1;
    weekday[2] = 2;
    weekday[3] = 3;
    weekday[4] = 4;
    weekday[5] = 5;
    weekday[6] = 6;

    return weekday[dt.getDay()];
  }

  return {
    year: y,
    month: m,
    week: w,
    day: {
      dayInWeek: dw,
      dayInMonth: dm
    }
  };
}

exports.getObjDate = getObjDate;
