import styles from "./App.module.scss";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  const { isLoaded } = useSelector((state) => state.weather);

  return (
    <>
      <BrowserRouter>
        <Wallpaper />
        <div className="absolute h-full w-full">
          <div
            className={`container mx-auto h-full flex flex-col items-center ${
              isLoaded ? "justify-evenly" : "justify-center"
            } gap-10`}
          >
            <Header />
            {isLoaded ? (
              <>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/details" element={<Details />} />
                  <Route path="/*" element={<Home />} />
                </Routes>
              </>
            ) : (
              <div
                className={`${styles.alert} flex justify-center items-center py-4 px-10`}
              >
                <h1 className="text-center text-white text-2xl font-semibold">
                  Select Your Location
                </h1>
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
