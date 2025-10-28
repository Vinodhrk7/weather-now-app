
import React, { useState, useEffect, useCallback } from 'react';
import { getCoordinatesForCity, getWeatherForCoordinates, getCityFromCoordinates } from './services/weatherService';
import type { WeatherData } from './types';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { Sun } from 'lucide-react';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number, cityName?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const weather = await getWeatherForCoordinates(lat, lon);
      setWeatherData(weather);
      if (cityName) {
        setCity(cityName);
      } else {
        const locationName = await getCityFromCoordinates(lat, lon);
        setCity(locationName);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
  const fetchInitialWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Geolocation denied. Showing weather for Hyderabad.');
          fetchWeather(17.3850, 78.4867, 'Hyderabad');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser. Showing weather for Hyderabad.');
      fetchWeather(17.3850, 78.4867, 'Hyderabad');
    }
  };

  fetchInitialWeather();
}, [fetchWeather]);


  const handleSearch = async (searchCity: string) => {
    if (!searchCity.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const location = await getCoordinatesForCity(searchCity);
      await fetchWeather(location.latitude, location.longitude, location.name);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while searching.');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 to-blue-600 flex flex-col items-center justify-center p-4 font-sans text-white">
      <main className="w-full max-w-md mx-auto flex flex-col gap-8">
        <header className="flex items-center gap-2 justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-center text-shadow">Weather Now</h1>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        <div className="relative min-h-[420px] w-full">
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorDisplay message={error} />}
          {!isLoading && !error && weatherData && city && (
            <WeatherCard weatherData={weatherData} cityName={city} />
          )}
        </div>
      </main>
      <footer className="absolute bottom-4 text-center text-white/70 text-sm">
        <p>Powered by Open-Meteo API</p>
      </footer>
    </div>
  );
};

export default App;
