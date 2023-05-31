export function dateConverter(reviewDate) {
    const date = new Date(reviewDate);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const nameDate = `${dayName} ${monthName} ${year}`;
    return nameDate;
  }

