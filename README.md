# 🌤️ App Clima en React

Una aplicación de clima rápida y moderna construida con **React** y **Vite**. 
Permite a los usuarios buscar el clima actual de múltiples ciudades a la vez y cuenta con persistencia offline gracias a una caché integrada en LocalStorage. 

Las predicciones provienen de la API gratuita [Open-Meteo](https://open-meteo.com/).

## 🚀 Características Principales

- **Búsqueda Multi-Ciudad**: Introduce ciudades separadas por coma para visualizar todas a la vez (ej., `Madrid, Buenos Aires, Tokio`). El sistema procesa de forma asíncrona y simultánea utilizando `Promise.all`.
- **Modo Sin Conexión (Offline)**: Si el dispositivo pierde la señal o se desconecta de la red, la aplicación consulta internamente el `localStorage` para recuperar y mostrar el último estado del tiempo almacenado para esa ciudad en búsquedas previas de manera imperceptible para el usuario.
- **Consultas a la API Optimizadas**: Únicamente se pide al proxy de Open-Meteo las variables meteorológicas estrictamente necesarias por el cliente, además de limitarse la solicitud de predicción cronológica a un máximo de 1 día, salvando un gran ancho de banda y mejorando enormemente la velocidad de la aplicación.
- **Diseño Glassmorphism**: Utiliza CSS vainilla con estilos y transparencias esmeriladas.

## 📦 Estructura del Proyecto

- `src/hooks/useWeather.js`: Control principal del estado, manejo de las búsquedas simultáneas y la capa de memoria local (Caché).
- `src/services/openMeteo.js`: Archivo a cargo de las llamadas *fetch* para geocodificar y solicitar temperaturas, con comentarios descriptivos y parámetros altamente optimizados.
- `src/components/WeatherCard.jsx`: Dibuja y gestiona métricas clave como *Sensación térmica*, *Velocidad del viento* y *Humedad*.
- `src/App.jsx`: Orquestador principal de la vista en React. 

## 🛠️ Tecnologías

* **Vite**
* **React 19** 
* **JavaScript (ES6+)**
* **Vanilla CSS** (Componentes Custom)

## 💻 Instalación y Uso

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Ejecuta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Visita en tu navegador el enlace mostrado, habitualmente `http://localhost:5173`.
