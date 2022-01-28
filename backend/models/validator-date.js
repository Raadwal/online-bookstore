module.exports.validateDate = (date) => {

  // First Check for the pattern
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
    return false;
  }

  // Parse the date parts to integers
  let parts = date.split("-");
  let day = parseInt(parts[2], 10);
  let month = parseInt(parts[1], 10);
  let year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > new Date().getFullYear() || month == 0 || month > 12) {
    return false;
  }

  // Adjust for leap years
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

  // Check the range of the day
  if(day <= 0 || day > monthLength[month - 1]) {
      return false;
  }

  return true;
};
