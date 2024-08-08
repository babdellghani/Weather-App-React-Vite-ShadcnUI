import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

const Chart = ({ weatherData = { hour: [] } }) => {
  const [typeWeather, setTypeWeather] = React.useState("temp");
  const filteredHours = weatherData?.hour?.filter((hour) => {
    const time = hour.time.slice(11, 16);
    return [
      "00:00",
      "03:00",
      "06:00",
      "09:00",
      "12:00",
      "15:00",
      "18:00",
      "21:00",
      "23:00",
    ].includes(time);
  });
  const { typeTemp, typeWind, typePressure, typePrecip, typeVisibility } =
    useSelector((state) => state.weather);

  const chartData = [
    ...filteredHours.map((hour) => ({
      date: hour.time.slice(11, 16),
      desktop:
        typeWeather === "temp"
          ? typeTemp === "C"
            ? hour.temp_c
            : hour.temp_f
          : typeWeather === "tempPrec"
          ? typeTemp === "C"
            ? hour.heatindex_c
            : hour.heatindex_f
          : typeWeather === "chance"
          ? hour.chance_of_rain
          : typeWeather === "precip"
          ? typePrecip === "In"
            ? hour.precip_in
            : hour.precip_mm
          : typeWeather === "wind"
          ? typeWind === "Kph"
            ? hour.wind_kph
            : hour.wind_mph
          : typeWeather === "vis"
          ? typeVisibility === "Km"
            ? hour.vis_km
            : hour.vis_miles
          : typeWeather === "hum"
          ? hour.humidity
          : typeWeather === "pressure"
          ? typePressure === "Mb"
            ? hour.pressure_mb
            : hour.pressure_in
          : hour.temp_f,
      mobile:
        typeWeather === "temp"
          ? typeTemp === "C"
            ? hour.feelslike_c
            : hour.feelslike_f
          : typeWeather === "tempPrec"
          ? typeTemp === "C"
            ? hour.windchill_c
            : hour.windchill_f
          : typeWeather === "chance"
          ? hour.chance_of_snow
          : typeWeather === "precip"
          ? hour.snow_cm
          : typeWeather === "wind"
          ? typeWind === "Kph"
            ? hour.gust_kph
            : hour.gust_mph
          : typeWeather === "vis"
          ? hour.cloud
          : typeWeather === "hum"
          ? typeTemp === "C"
            ? hour.dewpoint_c
            : hour.dewpoint_f
          : typeWeather === "pressure"
          ? hour.uv
          : hour.temp_c,
    })),
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label:
        typeWeather === "temp"
          ? typeTemp === "C"
            ? "Temp in °C"
            : "Temp in °F"
          : typeWeather === "tempPrec"
          ? typeTemp === "C"
            ? "Heat index in °C"
            : "Heat index in °F"
          : typeWeather === "chance"
          ? "Chance of rain"
          : typeWeather === "precip"
          ? typePrecip === "In"
            ? "Precip in in"
            : "Precip in mm"
          : typeWeather === "wind"
          ? typeWind === "Kph"
            ? "Wind in kph"
            : "Wind in mph"
          : typeWeather === "vis"
          ? typeVisibility === "Km"
            ? "Vis in km"
            : "Vis in miles"
          : typeWeather === "hum"
          ? "Humidity in %"
          : typeWeather === "pressure"
          ? typePressure === "Mb"
            ? "Pressure in mb"
            : "Pressure in in"
          : typeTemp === "C"
          ? "Temp in °C"
          : "Temp in °F",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label:
        typeWeather === "temp"
          ? typeTemp === "C"
            ? "Feels like in °C"
            : "Feels like in °F"
          : typeWeather === "tempPrec"
          ? typeTemp === "C"
            ? "Wind chill in °C"
            : "Wind chill in °F"
          : typeWeather === "chance"
          ? "Chance of snow"
          : typeWeather === "precip"
          ? "Snow in cm"
          : typeWeather === "wind"
          ? typeWind === "Kph"
            ? "Gust in kph"
            : "Gust in mph"
          : typeWeather === "vis"
          ? "Cloud in %"
          : typeWeather === "hum"
          ? typeTemp === "C"
            ? "Dew point in °C"
            : "Dew point in °F"
          : typeWeather === "pressure"
          ? "UV"
          : typeTemp === "C"
          ? "Feels like in °C"
          : "Feels like in °F",
      color: "hsl(var(--chart-2))",
    },
  };

  const filteredData = chartData;

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="flex items-center justify-between gap-2">
          <div>
            <img
              src={weatherData?.day?.condition?.icon}
              className="w-10"
              alt="weather"
            />
          </div>
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>{new Date(weatherData?.date).toDateString()}</CardTitle>
            <CardDescription>
              {weatherData?.day?.condition?.text}
            </CardDescription>
          </div>
        </div>
        <Select value={typeWeather} onValueChange={setTypeWeather}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="temp" className="rounded-lg">
              Temperature
            </SelectItem>
            <SelectItem value="tempPrec" className="rounded-lg">
              Perceived Temperature
            </SelectItem>
            <SelectItem value="wind" className="rounded-lg">
              Wind
            </SelectItem>
            <SelectItem value="precip" className="rounded-lg">
              Precipitation
            </SelectItem>
            <SelectItem value="hum" className="rounded-lg">
              Humidity
            </SelectItem>
            <SelectItem value="vis" className="rounded-lg">
              Visibility
            </SelectItem>
            <SelectItem value="pressure" className="rounded-lg">
              Pressure & UV
            </SelectItem>
            <SelectItem value="chance" className="rounded-lg">
              Chance of Rain & Snow
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

Chart.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default Chart;
