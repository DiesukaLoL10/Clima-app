"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import CiudadInput from "./CiudadInput";
import ClimaCard from "./ClimaCard";
import AlertaError from "./AlertaError";
import Cargando from "./Cargando";
import UnitSelector from "./UnitSelector";

import styles from "../styles/Clima.module.scss";

export default function ClimaView() {
  const [ciudad, setCiudad] = useState("Culiacán");
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric");
  const [historial, setHistorial] = useState([]);

  const API_URL = "http://localhost:3001/api/weather";

  const obtenerClima = async (nombreCiudad) => {
    if (!nombreCiudad.trim()) return;

    setCargando(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: { ciudad: nombreCiudad, units }
      });

      setClima(response.data);

     
      setHistorial(prev => {
        const nuevaLista = [nombreCiudad, ...prev.filter(c => c !== nombreCiudad)];
        return nuevaLista.slice(0, 5);
      });

      setCiudad(nombreCiudad);

    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 404) setError("Ciudad no encontrada");
        else if (status === 400) setError("Entrada inválida");
        else if (status === 429) setError("Límite alcanzado");
        else setError("Error del servidor");
      } else {
        setError("Error de red");
      }

      setClima(null);

    } finally {
      setCargando(false);
    }
  };


  useEffect(() => {
    const savedCity = sessionStorage.getItem("ultimaCiudad");
    const savedUnits = sessionStorage.getItem("units");

    if (savedCity) setCiudad(savedCity);
    if (savedUnits) setUnits(savedUnits);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("ultimaCiudad", ciudad);
    sessionStorage.setItem("units", units);
  }, [ciudad, units]);

  useEffect(() => {
    obtenerClima(ciudad);
  }, [units]);

  return (
    <div className={styles.container}>
      <div className={styles.wheatherCard}>
        <h1>Clima en mi ciudad</h1>

        <CiudadInput
          onNuevaCiudad={obtenerClima}
          cargando={cargando}
        />

        <UnitSelector
          units={units}
          onChange={setUnits}
        />

        <div className={styles.historial}>
  {historial.map((c, i) => (
    <button
      key={i}
      className={styles.historialButton}
      onClick={() => obtenerClima(c)}
    >
      {c}
    </button>
  ))}
</div>

        <AlertaError
          mensaje={error}
          onRetry={() => obtenerClima(ciudad)}
        />

        {cargando && <Cargando />}

        {!cargando && !error && (
          <ClimaCard clima={clima} />
        )}
      </div>
    </div>
  );
}