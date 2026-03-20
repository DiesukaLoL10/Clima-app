const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json());


app.get('/api/clima', async (req, res) => {
  const { ciudad } = req.query;
  const API_KEY = process.env.API_KEY;

  if (!ciudad) {
    return res.status(400).json({ error: 'Falta el nombre de la ciudad' });
  }

  try {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await axios.get(url);

    // Normalizacion de datos
    const weatherData = {
      location: {
        name: response.data.name,
        country: response.data.sys.country
      },
      main: {
        temp: Math.round(response.data.main.temp),
        temp_min: Math.round(response.data.main.temp_min),
        temp_max: Math.round(response.data.main.temp_max),
        feels_like: Math.round(response.data.main.feels_like),
        humidity: response.data.main.humidity
      },
      weather: {
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      }
    };

    // Enviamos la respuesta limpia al frontend
    res.json(weatherData);

  } catch (error) {
    // Manejo de errores 
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'La ciudad no fue encontrada' });
    } else {
      res.status(500).json({ error: 'Hubo un problema al obtener el clima' });
    }
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});