
import React from 'react';
import type { WeatherData } from '../types';
import { getWeatherInterpretation } from '../utils/weatherUtils';
import { Droplets, Wind, Thermometer, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
  cityName: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, cityName }) => {
  const { current } = weatherData;
  const { description, Icon } = getWeatherInterpretation(current.weather_code, current.is_day === 1);

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg p-6 sm:p-8 text-white w-full animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <MapPin size={24} />
            {cityName}
          </h2>
          <p className="text-lg opacity-80">{description}</p>
        </div>
        <div className="text-6xl sm:text-7xl">
          <Icon size={80} className="drop-shadow-lg" />
        </div>
      </div>

      <div className="text-center my-6 sm:my-8">
        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tighter drop-shadow-lg">
          {Math.round(current.temperature_2m)}°C
        </h1>
        <p className="text-lg font-medium opacity-80">
          Feels like {Math.round(current.apparent_temperature)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center justify-center">
          <Droplets className="mb-1 text-blue-200" size={24} />
          <p className="font-bold text-lg">{current.relative_humidity_2m}%</p>
          <p className="text-sm opacity-80">Humidity</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center justify-center">
          <Wind className="mb-1 text-gray-200" size={24} />
          <p className="font-bold text-lg">{current.wind_speed_10m.toFixed(1)} km/h</p>
          <p className="text-sm opacity-80">Wind Speed</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center justify-center col-span-2 sm:col-span-1">
          <Thermometer className="mb-1 text-red-200" size={24} />
          <p className="font-bold text-lg">{current.cloud_cover}%</p>
          <p className="text-sm opacity-80">Cloud Cover</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
