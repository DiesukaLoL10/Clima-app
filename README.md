<h1>Weather App – Prueba Técnica</h1>

<p>Aplicación web para consultar el clima actual de una ciudad, consumiendo la API de OpenWeather y aplicando buenas prácticas de desarrollo tanto en frontend como en backend.</p>

<hr />

<h2>Demo funcional</h2>

<p>El usuario puede:</p>
<ul>
  <li>Buscar una ciudad o estado</li>
  <li>Ver información detallada del clima</li>
  <li>Cambiar entre unidades (°C/kmh y °F/mph)</li>
  <li>Reintentar en caso de error sin perder el input</li>
  <li>Consultar búsquedas recientes</li>
  <li>Mantener estado entre recargas</li>
</ul>

<hr />

<h2>Arquitectura</h2>

<pre>
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
</pre>

<h3>Backend</h3>
<ul>
  <li>Node.js + Express</li>
  <li>Consumo de API externa (OpenWeather)</li>
  <li>Geocoding previo para mayor precisión</li>
  <li>Normalización de respuesta</li>
  <li>Cache en memoria con TTL</li>
</ul>

<h3>Frontend</h3>
<ul>
  <li>React + Next.js (App Router)</li>
  <li>Manejo de estado con hooks</li>
  <li>Componentes desacoplados</li>
  <li>SCSS modular</li>
  <li>UX orientado a estados (loading, error, empty)</li>
</ul>

<hr />

<h2>Instalación y ejecución</h2>

<h3>1. Clonar repositorio</h3>

<pre>
git clone &lt;repo-url&gt;
cd weather-app
</pre>

<h3>2. Backend</h3>

<pre>
cd backend
npm install
</pre>

<p>Crear archivo <code>.env</code>:</p>

<pre>
API_KEY=tu_api_key_de_openweather
PORT=3001
</pre>

<p>Ejecutar servidor:</p>

<pre>
node index.js
</pre>

<h3>3. Frontend</h3>

<pre>
cd frontend
npm install
npm run dev
</pre>

<p>Abrir en navegador:</p>

<pre>
http://localhost:3000
</pre>

<hr />

<h2>Decisiones técnicas</h2>

<h3>Uso de Geocoding</h3>
<p>Se utiliza la API de geocoding antes de consultar el clima para evitar ambigüedad en nombres de ciudades y obtener coordenadas precisas.</p>

<h3>Normalización de datos</h3>
<p>El backend transforma la respuesta de OpenWeather a un formato consistente para el frontend, reduciendo acoplamiento.</p>

<h3>Cache con TTL</h3>
<p>Se implementa cache en memoria (5 minutos) para reducir llamadas repetidas y mejorar rendimiento.</p>

<h3>Manejo de estados en UI</h3>
<p>Se contemplan escenarios de loading, error con reintento y estado vacío inicial.</p>

<h3>Persistencia</h3>
<p>Se utiliza <code>sessionStorage</code> para guardar la última ciudad consultada, unidades seleccionadas y último resultado.</p>

<hr />

<h2>UX y Responsividad</h2>

<ul>
  <li>Jerarquía visual clara (ciudad y temperatura como elementos principales)</li>
  <li>Diseño responsive:
    <ul>
      <li>Mobile: 1 columna</li>
      <li>Tablet: 2 columnas</li>
      <li>Desktop: 3–4 columnas</li>
    </ul>
  </li>
  <li>Feedback visual en acciones</li>
  <li>Botones interactivos con estados visuales</li>
</ul>

<hr />

<h2>Funcionalidades adicionales</h2>

<ul>
  <li>Historial de últimas búsquedas (hasta 5)</li>
  <li>Selector de unidades (métrico / imperial)</li>
  <li>Reintento sin perder input</li>
  <li>Persistencia entre recargas</li>
  <li>Cache backend con TTL</li>
</ul>

<hr />

<h2>Manejo de errores</h2>

<p>Se contemplan distintos escenarios:</p>
<ul>
  <li>Ciudad no encontrada</li>
  <li>Error de red</li>
  <li>API key inválida</li>
  <li>Límite de peticiones</li>
</ul>

<p>Cada caso muestra un mensaje claro al usuario.</p>

<hr />



<hr />


<hr />

