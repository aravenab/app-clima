import { useState, useCallback } from 'react';
import { fetchWeather } from '../services/openMeteo';

/**
 * Hook personalizado para gestionar el estado y la lógica de búsqueda del clima.
 * Soporta búsquedas múltiples separadas por coma y tiene memoria caché offline.
 */
export const useWeather = () => {
  // data ahora almacena un array de resultados meteorológicos
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = useCallback(async (cityInput) => {
    if (!cityInput.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setData(null);
    
    try {
      // 1. Separar entrada por comas, eliminar espacios extra y descartar vacíos
      const cities = cityInput.split(',').map(c => c.trim()).filter(Boolean);
      
      // 2. Comprobar si hay conexión a Internet
      const isOffline = !navigator.onLine;

      // 3. Procesar cada ciudad concurrentemente usando Promise.all
      const weatherPromises = cities.map(async (city) => {
        const cacheKey = `weather_${city.toLowerCase()}`;
        
        if (isOffline) {
          // ESCENARIO SIN CONEXIÓN: Intentar recuperar del localStorage
          const cachedString = localStorage.getItem(cacheKey);
          if (cachedString) {
            return JSON.parse(cachedString); // Retornar datos cacheados
          } else {
            throw new Error(`⚠ Sin conexión y sin caché para: ${city}`);
          }
        } else {
          // ESCENARIO CON CONEXIÓN: Hacer petición a Open-Meteo
          const cityData = await fetchWeather(city);
          // Guardar resultado en caché por si perdemos conexión en el futuro
          localStorage.setItem(cacheKey, JSON.stringify(cityData));
          return cityData;
        }
      });

      // Esperar a que todas las ciudades se resuelvan
      const results = await Promise.all(weatherPromises);
      
      // Actualizar el estado con el array completo de resultados
      setData(results);

    } catch (err) {
      setError(err.message || 'Error al obtener el clima');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, getWeather };
};
