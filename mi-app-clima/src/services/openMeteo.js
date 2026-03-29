/**
 * Realiza una petición a la API de Open-Meteo para obtener datos del clima.
 * Funciona en dos pasos: primero obtiene las coordenadas y luego el pronóstico.
 * 
 * @param {string} city - Nombre de la ciudad a buscar
 * @returns {Object} Objeto con la ubicación y las métricas actuales y diarias
 */
export const fetchWeather = async (city) => {
  try {
    // 1. API de Geocodificación: Convierte el texto (ej. "Madrid") en Latitud y Longitud
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. API Meteorológica: Obtiene las condiciones usando las coordenadas exactas.
    // Nota: El payload está optimizado para traer solo las variables en uso y de un solo día (forecast_days=1)
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`);
    const weatherData = await weatherResponse.json();

    // 3. Devolvemos un objeto limpio y formateado para el frontend
    return {
      location: { name, country },
      current: weatherData.current,
      daily: weatherData.daily,
    };
  } catch (error) {
    throw new Error(error.message || "Error de red al conectar con Open-Meteo");
  }
};
