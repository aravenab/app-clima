import React from 'react';
import { getWeatherDescription, getWeatherIcon } from '../utils/formatters';

export const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { location, current, daily } = weather;
  const description = getWeatherDescription(current.weather_code);
  const icon = getWeatherIcon(current.weather_code, current.is_day);

  const maxTemp = daily.temperature_2m_max[0];
  const minTemp = daily.temperature_2m_min[0];

  return (
    <div className="weather-card animate-fade-in">
      <header className="weather-header">
        <h2 className="location-name">{location.name}, {location.country}</h2>
        <p className="weather-desc">{description}</p>
      </header>
      
      <div className="weather-body">
        <div className="weather-main">
          <span className="weather-icon">{icon}</span>
          <h1 className="temperature">{Math.round(current.temperature_2m)}°</h1>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Sensación Térmica</span>
            <span className="detail-value">{Math.round(current.apparent_temperature)}°</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Altas / Bajas</span>
            <span className="detail-value">{Math.round(maxTemp)}° / {Math.round(minTemp)}°</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humedad</span>
            <span className="detail-value">{current.relative_humidity_2m}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Viento</span>
            <span className="detail-value">{current.wind_speed_10m} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};
