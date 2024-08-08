import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import styles from "./Settings.module.scss";
import { Settings as SettingsIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTypeTemp,
  setTypeWind,
  setTypePressure,
  setTypeVisibility,
  setTypePrecip,
} from "@/features/weather/WeatherSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { typeTemp, typeWind, typePressure, typeVisibility, typePrecip } =
    useSelector((state) => state.weather);

  const handleTemp = () => {
    dispatch(setTypeTemp(typeTemp === "C" ? "F" : "C"));
  };

  const handleWind = () => {
    dispatch(setTypeWind(typeWind === "Kph" ? "Mph" : "Kph"));
  };

  const handlePressure = () => {
    dispatch(setTypePressure(typePressure === "Mb" ? "In" : "Mb"));
  };

  const handleVisibility = () => {
    dispatch(setTypeVisibility(typeVisibility === "Km" ? "Miles" : "Km"));
  };

  const handlePrecip = () => {
    dispatch(setTypePrecip(typePrecip === "Mm" ? "In" : "Mm"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`${styles.button} p-2 rounded-lg`}>
        <SettingsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="text-sm font-medium">Temperature</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="temp" className="text-sm font-medium w-8">
                °F
              </Label>
              <Switch
                id="temp"
                checked={typeTemp === "C"}
                onCheckedChange={handleTemp}
              />
              <Label htmlFor="temp" className="text-sm font-medium w-8">
                °C
              </Label>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="text-sm font-medium">Wind</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="wind" className="text-sm font-medium w-8">
                Kph
              </Label>
              <Switch
                id="wind"
                checked={typeWind === "Mph"}
                onCheckedChange={handleWind}
              />
              <Label htmlFor="wind" className="text-sm font-medium w-8">
                Mph
              </Label>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="text-sm font-medium">Pressure</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="pressure" className="text-sm font-medium w-8">
                Mb
              </Label>
              <Switch
                id="pressure"
                checked={typePressure === "In"}
                onCheckedChange={handlePressure}
              />
              <Label htmlFor="pressure" className="text-sm font-medium w-8">
                In
              </Label>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="text-sm font-medium">Visibility</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="vis" className="text-sm font-medium w-8">
                Km
              </Label>
              <Switch
                id="vis"
                checked={typeVisibility === "Miles"}
                onCheckedChange={handleVisibility}
              />
              <Label htmlFor="vis" className="text-sm font-medium w-8">
                Miles
              </Label>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="text-sm font-medium">Precipitation</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="precip" className="text-sm font-medium w-8">
                Mm
              </Label>
              <Switch
                id="precip"
                checked={typePrecip === "In"}
                onCheckedChange={handlePrecip}
              />
              <Label htmlFor="precip" className="text-sm font-medium w-8">
                In
              </Label>
            </div>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
