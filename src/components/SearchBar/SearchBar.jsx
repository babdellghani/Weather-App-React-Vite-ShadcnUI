import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import { useDispatch } from "react-redux";
import { setData } from "@/features/weather/WeatherSlice";
import PropTypes from "prop-types";

function SearchBar({ geoLocation, resetCurrentLocation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  const WEATHER_API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    if (!searchValue || searchValue.trim().length < 3) {
      setItems([]);
      return;
    }
    fetch(
      `http://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${searchValue}`
    )
      .then((response) => response.json())
      .then((data) =>
        setItems(
          data.map((d) => {
            const { name, region, country, lat, lon } = d;
            return {
              label: `${name}, ${region}`,
              value: `${country}`,
              lat: `${lat}`,
              lon: `${lon}`,
            };
          })
        )
      );
  }, [searchValue, WEATHER_API_KEY]);

  const handleAutocomplete = useCallback(
    (lat, lon) => {
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=10`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setData(data));
          setValue(`${data.location.name}, ${data.location.country}`);
        });
    },
    [WEATHER_API_KEY, dispatch]
  );

  useEffect(() => {
    if (geoLocation) {
      handleAutocomplete(geoLocation.lat, geoLocation.lon);
    }
  }, [geoLocation, handleAutocomplete]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`${styles.button} w-[300px] justify-between truncate ...`}
          >
            {value ? value : "Select Your City"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search City..."
              onValueChange={(value) => setSearchValue(value)}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.label}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      handleAutocomplete(item.lat, item.lon);
                      resetCurrentLocation();
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="w-full flex flex-col justify-center items-center gap-1">
                      <p className="text-sm font-semibold text-center">
                        {item.label}
                      </p>
                      <p className="text-xs font-light text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

SearchBar.propTypes = {
  geoLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }),
  resetCurrentLocation: PropTypes.func.isRequired,
};

export default SearchBar;
