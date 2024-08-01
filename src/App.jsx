import styles from "./App.module.scss";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import WeatherSlider from "./components/Slider/WeatherSlider/WeatherSlider";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import Weather from "./components/Weather/Weather";

function App() {
  const { isLoaded } = useSelector((state) => state.weather);
  return (
    <>
      <Wallpaper />
      <div className="absolute h-full w-full">
        <div className={`container mx-auto h-full flex flex-col items-center ${isLoaded ? "justify-evenly" : "justify-center"} gap-10`}>
          <Header />
          {isLoaded ? (
            <>
              <Weather />
              <WeatherSlider />
            </>
          ) :
            (
              <div className={`${styles.alert} flex justify-center items-center py-4 px-10`}>
                <h1 className="text-center text-white text-2xl font-semibold">Select Your Location</h1>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
