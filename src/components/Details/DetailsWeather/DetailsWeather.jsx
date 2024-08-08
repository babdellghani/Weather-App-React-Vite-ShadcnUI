import {
  Droplets,
  Wind,
  Sun,
  Waves,
  Rainbow,
  View,
  CircleGauge,
  ThermometerSun,
  ThermometerSnowflake,
  SunSnow,
  CloudFog,
  Tornado,
  Cloudy,
} from "lucide-react";
import styles from "./DetailsWeather.module.scss";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function DetailsWeather({ weather }) {
  // const weather = useSelector((state) => state.weather.data);
  const [time, setTime] = useState(
    new Date(weather?.location?.localtime).getTime()
  );

  useEffect(() => {
    setTime(new Date(weather?.location?.localtime).getTime());
  }, [weather]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const date = new Date(time).toLocaleTimeString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const { typeTemp, typeWind, typePressure, typePrecip, typeVisibility } =
    useSelector((state) => state.weather);
  return (
    <div
      className={`${styles.weather} flex flex-col gap-4 justify-center items-center lg:flex-row lg:justify-around w-full rounded-lg text-white px-16 py-4`}
    >
      <div className="main text-center flex flex-col gap-4">
        <div className="icon flex place-content-center">
          <img
            className="w-40"
            src={weather?.current?.condition?.icon}
            alt="weather"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-4xl font-medium capitalize">
            {weather?.current?.condition?.text}
          </div>
          <div className="text-sm font-medium">
            {weather?.location?.name}, {weather?.location?.country}
          </div>
        </div>
        <div className="text-5xl font-bold truncate">
          {typeTemp === "C"
            ? weather?.current?.temp_c + " °C"
            : weather?.current?.temp_f + " °F"}
        </div>
        <div className="text-base font-semibold flex items-center justify-center gap-2">
          <span className="text-orange-400 font-bold text-3xl">
            {typeTemp === "C"
              ? weather?.current?.feelslike_c + " °C"
              : weather?.current?.feelslike_f + " °F"}
          </span>
        </div>
        <div className="text-base font-semibold flex items-center justify-center gap-2">
          <span className=" font-bold text-xs">{date}</span>
        </div>
      </div>

      <div className="details grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-start">
        {/* Secondary Details */}
        <div className="secondary flex flex-col gap-10">
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <CircleGauge size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Pressure</h4>
              <p className="text-3xl font-bold truncate">
                {typePressure === "In"
                  ? weather?.current?.pressure_in + " In"
                  : weather?.current?.pressure_mb + " Mb"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <CloudFog size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Wind</h4>
              <p className="text-3xl font-bold truncate">
                {typeWind === "Mph"
                  ? weather?.current?.wind_mph + " Mph"
                  : weather?.current?.wind_kph + " Kph"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <Sun size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Fells Like</h4>
              <p className="text-3xl font-bold truncate">
                {typeTemp === "C"
                  ? weather?.current?.feelslike_c + " °C"
                  : weather?.current?.feelslike_f + " °F"}
              </p>
            </div>
          </div>
        </div>

        {/* Third Details */}
        <div className="third flex flex-col gap-10">
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <Droplets size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Precipition</h4>
              <p className="text-3xl font-bold truncate">
                {typePrecip === "In"
                  ? weather?.current?.precip_in + " In"
                  : weather?.current?.precip_mm + " Mm"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <Wind size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Wind Degree</h4>
              <p className="text-3xl flex justify-start items-start gap-1 font-bold truncate">
                <span>{weather?.current?.wind_degree}</span>
                <span className="text-sm">°{weather?.current?.wind_dir}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <SunSnow size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Wind Chill</h4>
              <p className="text-3xl font-bold truncate">
                {typeTemp === "C"
                  ? weather?.current?.windchill_c + " °C"
                  : weather?.current?.windchill_f + " °F"}
              </p>
            </div>
          </div>
        </div>

        {/* Fourth Details */}
        <div className="fourth flex flex-col gap-10">
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <View size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold">Visibility</h4>
              <p className="text-3xl font-bold truncate">
                {typeVisibility === "Miles"
                  ? weather?.current?.vis_miles + " Miles"
                  : weather?.current?.vis_km + " Km"}
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <ThermometerSun size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Heat Index</h4>
              <p className="text-3xl font-bold truncate">
                {typeTemp === "C"
                  ? weather?.current?.heatindex_c + " °C"
                  : weather?.current?.heatindex_f + " °F"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <Waves size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold">Humidity</h4>
              <p className="text-3xl font-bold truncate">
                {weather?.current?.humidity}%
              </p>
            </div>
          </div>
        </div>

        {/* Fifth Details */}
        <div className="fifth flex flex-col gap-10">
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <Tornado size={40} />
            </div>

            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold">Gust</h4>
              <p className="text-3xl font-bold truncate">
                {typeWind === "Mph"
                  ? weather?.current?.gust_mph + " Mph"
                  : weather?.current?.gust_kph + " Kph"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <ThermometerSnowflake size={40} />
            </div>

            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold truncate">Dew Point</h4>
              <p className="text-3xl font-bold truncate">
                {typeTemp === "C"
                  ? weather?.current?.dewpoint_c + " °C"
                  : weather?.current?.dewpoint_f + " °F"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="icon">
              <Cloudy size={40} />
            </div>
            <div className="text flex basis-1/2 flex-col gap-1">
              <h4 className="text-sm font-semibold">Cloud</h4>
              <p className="text-3xl font-bold truncate">
                {weather?.current?.cloud}
              </p>
            </div>
          </div>
        </div>

        {/* Sixth Details */}
        <div className="sixth w-full justify-center flex flex-col gap-10 md:col-span-2 lg:col-span-4">
          <div className="flex justify-start md:justify-center items-center gap-4">
            <div className="icon">
              <Rainbow size={40} />
            </div>
            <div className="text flex flex-col gap-1">
              <h4 className="text-sm font-semibold">UV Index</h4>
              <p className="text-3xl font-bold truncate">
                {weather?.current?.uv}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DetailsWeather.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default DetailsWeather;
