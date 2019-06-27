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
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  return {
    year: y,
    month: m,
    week: w,
    day: d
  };
}

exports.getObjDate = getObjDate;
