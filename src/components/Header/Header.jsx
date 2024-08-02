import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.scss";
import { MapPin, MapPinCheck, MapPinX } from "lucide-react";

function Header() {
  const [geoLocation, setGeoLocation] = useState();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });

    setIsCurrentLocation(true);
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  const resetCurrentLocation = () => {
    setIsCurrentLocation(false);
  };

  return (
    <div className="w-full mt-4 z-50">
      <div
        className={`header flex w-full justify-center items-center gap-4 p-2 px-8`}
      >
        <SearchBar
          geoLocation={geoLocation}
          resetCurrentLocation={resetCurrentLocation}
        />
        {geoLocation ? (
          <button
            onClick={getGeoLocation}
            className={`${styles.location} rounded-lg p-2 ${
              isCurrentLocation ? "text-gray-700" : "cursor-pointer text-white"
            }`}
            disabled={isCurrentLocation === true}
          >
            {isCurrentLocation ? <MapPinCheck /> : <MapPin />}
          </button>
        ) : (
          <button
            onClick={getGeoLocation}
            className={`${styles.location} rounded-lg p-2 text-gray-500`}
            disabled
            title="Location not available"
          >
            <MapPinX />
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
