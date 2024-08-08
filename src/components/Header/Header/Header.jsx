import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.scss";
import { House, MapPin, MapPinCheck, MapPinX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Settings from "../Settings/Settings";

function Header() {
  const [geoLocation, setGeoLocation] = useState();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  let location = useLocation();

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

  const [pathName, setPathName] = useState(location.pathname);
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <div className="w-full mt-4 z-50">
      <div
        className={`header flex w-full justify-center items-center gap-4 p-2 px-8`}
      >
        {pathName === "/details" && (
          <Link
            to="/"
            className={`${styles.home} rounded-lg p-2 flex justify-center items-center gap-2`}
          >
            <House />
            <span className="font-semibold">Home</span>
          </Link>
        )}
        <SearchBar
          geoLocation={geoLocation}
          resetCurrentLocation={resetCurrentLocation}
        />
        {geoLocation ? (
          <button
            onClick={getGeoLocation}
            className={`${styles.location} rounded-lg p-2 ${
              isCurrentLocation ? "text-green-500" : "cursor-pointer text-white"
            }`}
            disabled={isCurrentLocation === true}
          >
            {isCurrentLocation ? <MapPinCheck /> : <MapPin />}
          </button>
        ) : (
          <button
            onClick={getGeoLocation}
            className={`${styles.location} rounded-lg p-2 text-gray-400`}
            disabled
            title="Location not available"
          >
            <MapPinX />
          </button>
        )}

        <Settings />
      </div>
    </div>
  );
}

export default Header;
