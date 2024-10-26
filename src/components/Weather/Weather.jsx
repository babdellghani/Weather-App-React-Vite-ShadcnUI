import {
  Droplets,
  Wind,
  Sun,
  Waves,
} from "lucide-react";
import styles from "./Weather.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const { typeTemp, typeWind, typePrecip } =
    useSelector((state) => state.weather);
  return (
    <div
      className={`${styles.weather} flex flex-col gap-4 justify-center items-center md:flex-row md:justify-around w-full rounded-lg text-white px-16 py-4`}
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
        <div className="text-5xl font-bold">
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
              {typePrecip === "Mm" ? weather?.current?.precip_mm + " Mm" : weather?.current?.precip_in + " In"}
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
              {typeWind === "Kph" ? weather?.current?.wind_kph + " Kph" : weather?.current?.wind_mph + " Mph"}
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
          <Link
            to={`/details`}
          className={`${styles.btn} relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 group`} >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out text-white">More Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Weather;
