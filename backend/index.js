const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;


const cache = {};
const TTL = 1000 * 60 * 5;

app.use(cors());
app.use(express.json());

const handleWeatherRequest = async (req, res) => {
  const city = req.query.city || req.query.ciudad;
  const { units = 'metric' } = req.query;


  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'El nombre de la ciudad es obligatorio.' });
  }

  const cleanCity = city.trim();

  const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.-]+$/;
  if (cleanCity.length < 2 || !cityRegex.test(cleanCity)) {
    return res.status(400).json({
      error: 'Nombre de ciudad inválido. Use al menos 2 caracteres.'
    });
  }

  const key = `${cleanCity}_${units}`;

  if (cache[key] && Date.now() - cache[key].timestamp < TTL) {
    return res.json(cache[key].data);
  }

  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key no configurada en el servidor.' });
    }


    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cleanCity)}&limit=1&appid=${apiKey}`;
    const geoResponse = await axios.get(geoUrl);

    if (!geoResponse.data || geoResponse.data.length === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada.' });
    }

    const { lat, lon, name, country, state } = geoResponse.data[0];


    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}&lang=es`;
    const response = await axios.get(weatherUrl);
    const data = response.data;


    const normalizedData = {
      location: {
        name,
        country,
        state: state || '',
        coords: { lat, lon }
      },
      main: {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        pressure: data.main.pressure,
        humidity: data.main.humidity
      },
      weather: {
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        main: data.weather[0].main
      },
      wind: {
        speed: units === 'metric'
          ? Math.round(data.wind.speed * 3.6)
          : Math.round(data.wind.speed),
        deg: data.wind.deg
      },
      sys: {
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone
      },
      visibility: data.visibility / 1000,
      clouds: data.clouds.all,
      units
    };

 
    cache[key] = {
      data: normalizedData,
      timestamp: Date.now()
    };

    res.json(normalizedData);

  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          return res.status(401).json({ error: 'API Key inválida.' });
        case 404:
          return res.status(404).json({ error: 'Datos no disponibles.' });
        case 429:
          return res.status(429).json({ error: 'Límite de peticiones alcanzado.' });
        default:
          return res.status(status).json({ error: 'Error con proveedor externo.' });
      }
    } else if (error.request) {
      return res.status(503).json({ error: 'Servicio no disponible.' });
    } else {
      return res.status(500).json({ error: 'Error interno: ' + error.message });
    }
  }
};


app.get('/api/weather', handleWeatherRequest);
app.get('/api/clima', handleWeatherRequest);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});