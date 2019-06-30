// Function to make an object of the date

function getObjDate() {
  var date = new Date();
  // Get current year
  var y = date.getFullYear();
  // Get current month
  var m = date.getMonth() + 1;
  // Get current week
  var w = getWeekNumber();
  // Get current day
  var d = date.getUTCDate();

  // Function to find current week number
  function getWeekNumber() {
    dt = new Date();
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

  return {
    year: y,
    month: m,
    week: w,
    day: d
  };
}

exports.getObjDate = getObjDate;
