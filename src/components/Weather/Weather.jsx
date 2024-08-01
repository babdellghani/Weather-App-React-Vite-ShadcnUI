import {
  Droplets,
  Wind,
  Sun,
  Waves,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import styles from "./Weather.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

function Weather() {
  const [icon, setIcon] = useState(false);

  const weather = useSelector((state) => state.weather.data);

  return (
    <div
      className={`${styles.weather} flex flex-col gap-4 justify-center items-center md:flex-row md:justify-between w-full rounded-lg text-white px-16 py-4`}
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
          <div className="text-4xl font-medium">
            {weather?.current?.condition?.text}
          </div>
          <div className="text-sm font-medium">
            {weather?.location?.name}, {weather?.location?.country}
          </div>
        </div>
        <div className="text-5xl font-bold">{weather?.current?.temp_c} °C</div>
        <div className="text-base font-semibold flex items-center justify-center gap-2">
          <span>Feels like</span>
          <span className="text-blue-500 font-bold text-3xl">
            {weather?.current?.feelslike_c}°
          </span>
        </div>
      </div>
      <div className="secondary flex flex-col gap-10">
        <div className="flex justify-center md:justify-start items-center gap-4">
          <div className="icon">
            <Waves size={40} />
          </div>
          <div className="text flex flex-col gap-1">
            <h4 className="text-sm font-semibold">Humidity</h4>
            <p className="text-3xl font-bold">{weather?.current?.humidity}%</p>
          </div>
        </div>
        <div className="flex justify-center md:justify-start items-center gap-4">
          <div className="icon">
            <Droplets size={40} />
          </div>
          <div className="text flex flex-col gap-1">
            <h4 className="text-sm font-semibold">Precipition</h4>
            <p className="text-3xl font-bold">
              {weather?.current?.pressure_in} %
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-start items-center gap-4">
          <div className="icon">
            <Wind size={40} />
          </div>
          <div className="text flex flex-col gap-1">
            <h4 className="text-sm font-semibold">Wind</h4>
            <p className="text-3xl font-bold">
              {weather?.current?.wind_kph} km
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-start items-center gap-4">
          <div className="icon">
            <Sun size={40} />
          </div>
          <div className="text flex flex-col gap-1">
            <h4 className="text-sm font-semibold">UV Index</h4>
            <p className="text-3xl font-bold">{weather?.current?.uv}</p>
          </div>
        </div>
        <div>
          <button
            onMouseOver={() => setIcon(true)}
            onMouseOut={() => setIcon(false)}
            className={`${styles.btn} flex justify-center items-center gap-2 px-10 py-2`}
          >
            <p className="text-sm font-semibold">More Details</p>
            {icon ? (
              <ArrowRight size={20} strokeWidth={3} />
            ) : (
              <ChevronRight size={20} strokeWidth={3} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Weather;
