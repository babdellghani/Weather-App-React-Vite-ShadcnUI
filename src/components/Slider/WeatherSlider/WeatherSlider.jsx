import styles from "./WeatherSlider.module.scss";
import { useState } from "react";
import WeatherCart from "../WeatherCart/WeatherCart";
import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function WeatherSlider() {
  const [date, setDate] = useState("daily");
  const weather = useSelector((state) => state.weather.data);
  const currentTime = new Date(weather.location.localtime).getTime();

  const hourWeather = weather?.forecast?.forecastday?.map((day) => {
    return day?.hour;
  });
  return (
    <div className="w-full pb-10 px-4 flex flex-col justify-center items-center">
      <Carousel
        className="w-full flex flex-col justify-center items-center gap-4"
        opts={{ align: "start", loop: true }}
      >
        <div className="slider w-full text-white flex justify-between items-center gap-4">
          <div className="group-buttons flex justify-center items-center">
            <button
              onClick={() => setDate("daily")}
              className={`${
                styles.daily
              } font-medium flex justify-center items-center px-4 py-2 ${
                date === "daily" ? styles.active : ""
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setDate("hourly")}
              className={`${
                styles.hourly
              } font-medium flex justify-center items-center px-4 py-2 ${
                date === "hourly" ? styles.active : ""
              }`}
            >
              Hourly
            </button>
          </div>
          <div className="arrows flex justify-center items-center gap-2">
            <CarouselPrevious className="text-black static translate-y-0 translate-x-0" />
            <CarouselNext className="text-black static translate-y-0 translate-x-0" />
          </div>
        </div>
        <div className="w-full flex justify-around items-center gap-4">
          {date === "daily" && (
            <CarouselContent>
              {weather?.forecast?.forecastday?.map((day, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="basis-3/6 md:basis-2/6 lg:basis-1/5"
                  >
                    <WeatherCart day={day} date={date} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          )}

          {date === "hourly" && (
            <CarouselContent>
              {hourWeather?.map((day) =>
                day
                  ?.filter((day) => new Date(day.time).getTime() >= currentTime)
                  ?.map((day, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="basis-3/6 md:basis-2/6 lg:basis-1/5"
                      >
                        <WeatherCart day={day} date={date} />
                      </CarouselItem>
                    );
                  })
              )}
            </CarouselContent>
          )}
        </div>
      </Carousel>
    </div>
  );
}

export default WeatherSlider;
