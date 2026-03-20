<h1>Clima app</h1>
Aplicación web para consultar el clima actual de una ciudad, consumiendo la API de OpenWeather y aplicando buenas prácticas de desarrollo tanto en frontend como en backend.


El usuario puede:

Buscar una ciudad o estado

Ver información detallada del clima

Cambiar entre unidades (°C/kmh y °F/mph)

Reintentar en caso de error sin perder el input

Consultar búsquedas recientes

Mantener estado entre recargas

El proyecto está dividido en dos capas:

backend/
  index.js

frontend/
  components/
    CiudadInput.jsx
    ClimaCard.jsx
    ClimaView.jsx
    SelectorUnidades.jsx
    AlertaError.jsx
    Cargando.jsx
  styles/

Backend

Node.js + Express

Consumo de API externa (OpenWeather)

Geocoding previo para mayor precisión

Normalización de respuesta

Cache en memoria con TTL


Frontend

React + Next.js (App Router)

Manejo de estado con hooks

Componentes desacoplados

SCSS modular

UX orientado a estados (loading, error, empty)


 Instalación y ejecución
1. Clonar repositorio
git clone <repo-url>
cd weather-app
2. Backend
cd backend
npm install

Crear archivo .env:

API_KEY=tu_api_key_de_openweather
PORT=3001

Ejecutar servidor:

node index.js
3. Frontend
cd frontend
npm install
npm run dev

Abrir en navegador:

http://localhost:3000
 Decisiones técnicas
 Uso de Geocoding

Se utiliza la API de geocoding antes de consultar el clima para:

Evitar ambigüedad en nombres de ciudades

Obtener coordenadas precisas

 Normalización de datos

El backend transforma la respuesta de OpenWeather a un formato consistente para el frontend, reduciendo acoplamiento.

 Cache con TTL

Se implementa cache en memoria (5 minutos) para:

Reducir llamadas repetidas

Mejorar rendimiento

 Manejo de estados en UI

Se contemplan todos los escenarios:

Loading

Error con reintento

Estado vacío inicial

 Persistencia

Se utiliza sessionStorage para:

Última ciudad consultada

Unidades seleccionadas

Último resultado

 UX y Responsividad

Jerarquía visual clara (ciudad + temperatura dominante)

Diseño responsive:

Mobile: 1 columna

Tablet: 2 columnas

Desktop: 3–4 columnas

Feedback visual en acciones

Botones interactivos (hover, active states)

Funcionalidades adicionales

Historial de últimas búsquedas (hasta 5)

Selector de unidades (métrico / imperial)

Reintento sin perder input

Persistencia entre recargas

Cache backend con TTL

 Manejo de errores

Se contemplan distintos escenarios:

Ciudad no encontrada

Error de red

API key inválida

Límite de peticiones

Cada uno muestra un mensaje claro al usuario.