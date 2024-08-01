import PropTypes from "prop-types";

function WeatherCart({ day, date }) {

  const formatDate = (dateString) => {
    const dateFormat = new Date(dateString);
    const today = new Date();

    // Check if the date is Hourly
    if (date === "hourly") {
      // Get hours and minutes
      let hours = dateFormat.getHours();
      let minutes = dateFormat.getMinutes();

      // Determine A.M. or P.M.
      let ampm = hours >= 12 ? "P.M." : "A.M.";

      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'

      // Pad the minutes with leading zeros if needed
      minutes = minutes < 10 ? "0" + minutes : minutes;

      // Return the formatted time
      return hours + ":" + minutes + " " + ampm;
    }

    // Check if the date is today
    if (dateFormat.toDateString() === today.toDateString()) {
      return "Today";
    }

    // Format the date
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = dateFormat.getUTCDate();
    const suffix = (d) => ["th", "st", "nd", "rd"][((d % 10) - 1) % 10] || "th";
    return `${days[dateFormat.getUTCDay()]} ${
      months[dateFormat.getUTCMonth()]
    } ${day}${suffix(day)}`;
  };

  return (
    <>
      <div className="weather text-white flex justify-center items-center flex-col gap-2">
        <div className="day text-sm font-medium">
          {date === "hourly" ? formatDate(day?.time) : formatDate(day?.date)}
        </div>
        <div className="icon">
          <img
            className="w-30"
            src={
              date === "hourly"
                ? day?.condition?.icon
                : day?.day?.condition?.icon
            }
            alt="weather"
          />
        </div>
        <div className="temp text-base font-semibold flex items-center justify-center gap-2">
          <span>
            {date === "hourly" ? day?.temp_c : day?.day?.maxtemp_c} C°
          </span>
          <span
            className={`text-blue-500 ${date === "hourly" ? "hidden" : ""}`}
          >
            {date === "hourly" ? "" : day?.day?.mintemp_c} C°
          </span>
        </div>
        <div className="desc text-sm font-medium text-center">
          {date === "hourly" ? day?.condition?.text : day?.day?.condition?.text}
        </div>
      </div>
    </>
  );
}

WeatherCart.propTypes = {
  day: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default WeatherCart;
