import React from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ErrorMessage } from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import './index.css';

function App() {
  const { data, isLoading, error, getWeather } = useWeather();

  return (
    <div className="app-container">
      <div className="glass-panel">
        <header className="app-header">
          <span className="logo">🌤️</span>
          <h1>Weather<span className="text-highlight">App</span></h1>
        </header>
        
        <SearchBar onSearch={getWeather} isLoading={isLoading} />
        
        <ErrorMessage message={error} />
        
        {!error && !isLoading && data && (
          // Iteramos sobre el array de resultados para dibujar una tarjeta por ciudad y añadimos comentarios
          <div className="weather-cards-container">
            {data.map((weatherData, index) => (
              <WeatherCard key={`${weatherData.location.name}-${index}`} weather={weatherData} />
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="loader animate-pulse">
            Obteniendo datos...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
