
import type { WeatherData, GeoLocationAPIResponse, GeoLocationResult } from '../types';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const REVERSE_GEOCODING_API_URL = 'https://nominatim.openstreetmap.org/reverse';


export const getCoordinatesForCity = async (city: string): Promise<GeoLocationResult> => {
  const response = await fetch(`${GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
  if (!response.ok) {
    throw new Error('Failed to fetch location data.');
  }
  const data: GeoLocationAPIResponse = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Could not find location: ${city}. Please try another city.`);
  }
  return data.results[0];
};

export const getWeatherForCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m',
  });
  const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data.');
  }
  const data: WeatherData = await response.json();
  return data;
};

export const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        format: 'json',
    });
    const response = await fetch(`${REVERSE_GEOCODING_API_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch city name from coordinates.');
    }
    const data = await response.json();
    if (data.address) {
        return data.address.city || data.address.town || data.address.village || 'Current Location';
    }
    return 'Current Location';
};
