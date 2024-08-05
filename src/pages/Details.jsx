import DetailsSlider from "@/components/Details/DetailsSlider/DetailsSlider";
import DetailsWeather from "@/components/Details/DetailsWeather/DetailsWeather";
import { useSelector } from "react-redux";
function Details() {
  const weather = useSelector((state) => state.weather.data);
  return (
    <>
      <DetailsWeather weather={weather} />
      <DetailsSlider />
    </>
  );
}

export default Details;
