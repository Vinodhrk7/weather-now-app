
import React from 'react';
import { Sun, Cloud, CloudSun, CloudRain, CloudSnow, Zap, CloudFog, CloudDrizzle, Snowflake, Cloudy, Wind, Umbrella, Tornado } from 'lucide-react';

export const getWeatherInterpretation = (code: number, isDay: boolean): { description: string; Icon: React.ElementType } => {
  switch (code) {
    case 0:
      return { description: 'Clear sky', Icon: Sun };
    case 1:
      return { description: 'Mainly clear', Icon: isDay ? CloudSun : Cloud };
    case 2:
      return { description: 'Partly cloudy', Icon: isDay ? CloudSun : Cloudy };
    case 3:
      return { description: 'Overcast', Icon: Cloud };
    case 45:
    case 48:
      return { description: 'Fog', Icon: CloudFog };
    case 51:
    case 53:
    case 55:
      return { description: 'Drizzle', Icon: CloudDrizzle };
    case 56:
    case 57:
      return { description: 'Freezing Drizzle', Icon: CloudDrizzle };
    case 61:
      return { description: 'Slight Rain', Icon: CloudRain };
    case 63:
      return { description: 'Moderate Rain', Icon: CloudRain };
    case 65:
      return { description: 'Heavy Rain', Icon: CloudRain };
    case 66:
    case 67:
      return { description: 'Freezing Rain', Icon: CloudRain };
    case 71:
      return { description: 'Slight Snowfall', Icon: CloudSnow };
    case 73:
      return { description: 'Moderate Snowfall', Icon: CloudSnow };
    case 75:
      return { description: 'Heavy Snowfall', Icon: CloudSnow };
    case 77:
      return { description: 'Snow grains', Icon: Snowflake };
    case 80:
      return { description: 'Slight rain showers', Icon: CloudRain };
    case 81:
      return { description: 'Moderate rain showers', Icon: CloudRain };
    case 82:
      return { description: 'Violent rain showers', Icon: CloudRain };
    case 85:
    case 86:
      return { description: 'Snow showers', Icon: CloudSnow };
    case 95:
      return { description: 'Thunderstorm', Icon: Zap };
    case 96:
    case 99:
      return { description: 'Thunderstorm with hail', Icon: Zap };
    default:
      return { description: 'Unknown', Icon: Sun };
  }
};
