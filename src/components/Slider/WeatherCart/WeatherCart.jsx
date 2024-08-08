import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function WeatherCart({ day, date }) {
  const formatDate = (dateString) => {
    const dateFormat = new Date(dateString);
    const today = new Date();

    // Check if the date is Hourly
    if (date === "hourly") {
      // Get Month Long and Date
      const month = dateFormat.toLocaleString("default", { month: "long" });
      const date = dateFormat.getDate();
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
      return (
        date + " " + month + " - " + hours + ":" + minutes + " " + ampm + " "
      );
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

  const { typeTemp } = useSelector((state) => state.weather);

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
            {date === "hourly"
              ? typeTemp === "C"
                ? day?.temp_c + " C°"
                : day?.temp_f + " F°"
              : typeTemp === "C"
              ? day?.day?.maxtemp_c + " C°"
              : day?.day?.maxtemp_f + " F°"}
          </span>
          {date === "hourly" ? null : (
            <span
              className={`text-blue-500`}
            >
              {typeTemp === "C" ? day?.day?.mintemp_c + " C°" : day?.day?.mintemp_f + " F°"}
            </span>
          )}
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
