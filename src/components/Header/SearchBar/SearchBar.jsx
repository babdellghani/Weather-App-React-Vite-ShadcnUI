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
import { useGetWeatherLocationQuery, useGetWeatherSearchQuery } from "@/app/services/api";

function SearchBar({ geoLocation, resetCurrentLocation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const dispatch = useDispatch();

  const { data: dataSearch, isLoading: isLoadingSearch } = useGetWeatherSearchQuery(searchValue, {
    skip: !searchValue || searchValue.trim().length < 3,
  });
  const { data: dataLocation, isLoading } = useGetWeatherLocationQuery(
    { lat: selectedItem.lat, lon: selectedItem.lon },
    { skip: !selectedItem.lat || !selectedItem.lon }
  );

  useEffect(() => {
    if (!searchValue.trim() || searchValue.trim().length < 3) {
      setItems([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoadingSearch && dataSearch) {
        const newItems = dataSearch.map((d) => {
          const { name, region, country, lat, lon } = d;
          return {
            label: `${name}, ${region}`,
            value: `${country}`,
            lat: `${lat}`,
            lon: `${lon}`,
          };
        });
        
      setItems(newItems);
    }
  }, [dataSearch, isLoadingSearch]);

  useEffect(() => {
    if (isLoading === false && dataLocation) {
      dispatch(setData(dataLocation));
      setValue(`${dataLocation.location.name}, ${dataLocation.location.country}`);
    }
  }, [dataLocation, dispatch, isLoading]);

  const handleAutocomplete = useCallback(
    () => {
      if (isLoading === false && dataLocation) {
        dispatch(setData(dataLocation));
      }
    },
    [dataLocation, dispatch, isLoading]
  );

  useEffect(() => {
    if (geoLocation) {
      setSelectedItem({
        lat: geoLocation.lat,
        lon: geoLocation.lon,
      });
    }
  }, [geoLocation]);

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
                      setSelectedItem({
                        lat: item.lat,
                        lon: item.lon,
                      });
                      handleAutocomplete();
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
