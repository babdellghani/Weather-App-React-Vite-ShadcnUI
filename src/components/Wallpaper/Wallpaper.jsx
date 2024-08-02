import { useSelector } from "react-redux";
import ImageDefault from "../../assets/img/Default.jpg";
import ImageSunny from "../../assets/img/Sunny.jpg";
import ImageCloudy from "../../assets/img/Cloudy.jpg";
import ImageRainy from "../../assets/img/Rainy.jpg";
import ImageSnowy from "../../assets/img/Snowy.jpg";
import styles from "./Wallpaper.module.scss";
import { useEffect, useState } from "react";

function Wallpaper() {
  const weather = useSelector(
    (state) => state.weather.data?.current?.condition?.text
  );
  const [image, setImage] = useState(ImageDefault);

  function getImage(image = "") {
    if (image.toLocaleLowerCase().includes("sunn")) {
      return ImageSunny;
    } else if (image.toLocaleLowerCase().includes("cloud")) {
      return ImageCloudy;
    } else if (image.toLocaleLowerCase().includes("rain")) {
      return ImageRainy;
    } else if (image.toLocaleLowerCase().includes("snow")) {
      return ImageSnowy;
    } else {
      return ImageDefault;
    }
  }

  useEffect(() => {
    const newImage = getImage(weather);
    const timeoutId = setTimeout(() => {
      setImage(newImage);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [weather]);

  return (
    <div
      className={`${styles.wallpaperImage} ${styles.wallpaperImageLoaded} w-full h-full bg-cover fixed h-full w-full -z-10`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`${styles.overflay}`}></div>
    </div>
  );
}

export default Wallpaper;
