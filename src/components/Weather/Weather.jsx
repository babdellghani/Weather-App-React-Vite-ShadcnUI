import { Droplets, Wind, Sun, Waves } from "lucide-react";
import styles from "./Weather.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Weather() {
  const weather = useSelector((state) => state.weather.data);
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
          <span className="text-orange-400 font-bold text-3xl">
            {weather?.current?.feelslike_c} °C
          </span>
        </div>
        <div className="text-base font-semibold flex items-center justify-center gap-2">
          <span className=" font-bold text-xs">{date}</span>
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
      </div>
    </div>
  );
}

export default Weather;
