import styles from "./DetailsSlider.module.scss";
import WeatherCart from "@/components/Slider/WeatherCart/WeatherCart";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Chart from "../Chart/Chart";
import Sunrise from "../../../assets/img/sunrise.png";
import Sunset from "../../../assets/img/sunset.png";
import Moonrise from "../../../assets/img/moonrise.png";
import Moonset from "../../../assets/img/moonset.png";
import {
  CloudFog,
  CloudRain,
  CloudSnow,
  Droplets,
  Rainbow,
  Snowflake,
  View,
  Waves,
} from "lucide-react";

function DetailsSlider() {
  const [documentWidth, setDocumentWidth] = useState(window.innerWidth);
  const weather = useSelector((state) => state.weather.data);
  const date = "daily";
  const [weatherData, setWeatherData] = useState(
    weather?.forecast?.forecastday[0]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleResize = () => {
    setDocumentWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  const clickItem = (item, index) => {
    setWeatherData(item);
    setSelectedIndex(index);
  };

  const { typeTemp, typeWind, typePrecip, typeVisibility } =
    useSelector((state) => state.weather);

  return (
    <div className="w-full pb-10 px-4 flex flex-col sm:flex-row justify-center items-start sm:items-center">
      <div className="w-screen max-w-full sm:max-w-fit sm:w-fit pb-10 px-4 flex flex-col justify-center items-center">
        <Carousel
          className="w-full flex flex-col justify-center items-center gap-4"
          orientation={documentWidth >= 640 ? "vertical" : "horizontal"}
        >
          <div className="slider w-full text-white flex justify-between items-center gap-4">
            <div className="group-buttons flex justify-center items-center">
              <button
                className={`font-medium flex justify-center items-center px-8 py-2 bg-white text-black rounded-lg`}
              >
                Daily
              </button>
            </div>
            <div className="arrows flex justify-center items-center gap-2">
              <CarouselPrevious className="text-black static translate-y-0 translate-x-0" />
              <CarouselNext className="text-black static translate-y-0 translate-x-0" />
            </div>
          </div>
          <div className="w-full flex justify-around items-center gap-4">
            <CarouselContent className="max-h-full md:max-h-[96rem] lg:max-h-screen mx-4 sm:mx-auto sm:my-4 gap-4">
              {weather?.forecast?.forecastday?.map((day, index) => {
                return (
                  <CarouselItem
                    className={`${styles.weatherCard} ${
                      selectedIndex === index ? styles.weatherCardActive : ""
                    } basis-1/2 cursor-pointer px-8 py-4`}
                    key={index}
                    onClick={() => clickItem(day, index)}
                  >
                    <WeatherCart day={day} date={date} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
      <div className="w-full pb-10 px-4 flex flex-col justify-center items-center gap-4">
        <div
          className={`w-full p-4 text-white flex flex-col lg:flex-row justify-center items-center gap-10 ${styles.weatherCard}`}
        >
          <div className="main text-center flex flex-col gap-4">
            <div className="icon flex place-content-center">
              <img
                className="w-40"
                src={weatherData?.day?.condition?.icon}
                alt="weather"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-4xl font-medium capitalize">
                {weatherData?.day?.condition?.text}
              </div>
            </div>
            <div className="text-5xl font-bold truncate">
              {typeTemp === "C" ? weatherData?.day?.avgtemp_c + " °C" : weatherData?.day?.avgtemp_f + " °F"}
            </div>
            <div className="text-base font-semibold flex items-center justify-center gap-2">
              <span className="font-medium text-xl">
                <span className="text-blue-400">
                  {typeTemp === "C" ? weatherData?.day?.mintemp_c + " °C" : weatherData?.day?.mintemp_f + " °F"}
                </span>
                <span> / </span>
                <span className="text-red-400">
                  {typeTemp === "C" ? weatherData?.day?.maxtemp_c + " °C" : weatherData?.day?.maxtemp_f + " °F"}
                </span>
              </span>
            </div>
          </div>
          <div className="details grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-start">
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <CloudFog size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Max Wind</h4>
                <p className="text-3xl font-bold truncate">
                  {typeWind === "Kph" ? weatherData?.day?.maxwind_kph + " Kph" : weatherData?.day?.maxwind_mph + " Mph"}
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <Droplets size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Total Precipition</h4>
                <p className="text-3xl font-bold truncate">
                  {typePrecip === "Mm" ? weatherData?.day?.totalprecip_mm + " Mm" : weatherData?.day?.totalprecip_in + " In"}
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <Snowflake size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Total Snow</h4>
                <p className="text-3xl font-bold truncate">
                  {weatherData?.day?.totalsnow_cm} Cm
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <View size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Average Visibility</h4>
                <p className="text-3xl font-bold truncate">
                  {typeVisibility === "Km" ? weatherData?.day?.avgvis_km + " Km" : weatherData?.day?.avgvis_miles + " Miles"}
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <Waves size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Average Humidity</h4>
                <p className="text-3xl font-bold truncate">
                  {weatherData?.day?.avghumidity} %
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <CloudRain size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Chance of Rain</h4>
                <p className="text-3xl font-bold truncate">
                  {weatherData?.day?.daily_chance_of_rain} %
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <CloudSnow size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Chance of Snow</h4>
                <p className="text-3xl font-bold truncate">
                  {weatherData?.day?.daily_chance_of_snow} %
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="icon">
                <Rainbow size={40} />
              </div>
              <div className="text flex flex-col gap-1">
                <h4 className="text-sm font-semibold">UV Index</h4>
                <p className="text-3xl font-bold truncate">
                  {weatherData?.day?.uv}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <div
            className={`${styles.weatherCard} flex justify-between items-center p-4`}
          >
            <div className="img">
              <img className="w-20" src={Sunrise} alt="Sunrise" />
            </div>
            <div className="details">
              <h2 className="text-xl font-semibold">Sunrise</h2>
              <h1 className="text-3xl font-bold truncate">
                {weatherData?.astro?.sunrise}
              </h1>
            </div>
          </div>
          <div
            className={`${styles.weatherCard} flex justify-between items-center p-4`}
          >
            <div className="img">
              <img className="w-20" src={Sunset} alt="Sunset" />
            </div>
            <div className="details">
              <h2 className="text-xl font-semibold">Sunset</h2>
              <h1 className="text-3xl font-bold truncate">
                {weatherData?.astro?.sunset}
              </h1>
            </div>
          </div>
          <div
            className={`${styles.weatherCard} flex justify-between items-center p-4`}
          >
            <div className="img">
              <img className="w-20" src={Moonrise} alt="Moonrise" />
            </div>
            <div className="details">
              <h2 className="text-xl font-semibold">Moonrise</h2>
              <h1 className="text-3xl font-bold truncate">
                {weatherData?.astro?.moonrise}
              </h1>
            </div>
          </div>
          <div
            className={`${styles.weatherCard} flex justify-between items-center p-4`}
          >
            <div className="img">
              <img className="w-20" src={Moonset} alt="Moonset" />
            </div>
            <div className="details">
              <h2 className="text-xl font-semibold">Moonset</h2>
              <h1 className="text-3xl font-bold truncate">
                {weatherData?.astro?.moonset}
              </h1>
            </div>
          </div>
        </div>
        <Chart className="w-full" weatherData={weatherData} />
      </div>
    </div>
  );
}

export default DetailsSlider;
