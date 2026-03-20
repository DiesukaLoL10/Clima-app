"use client";

import { useEffect, useState } from "react";
import CiudadInput from "./CiudadInput";
import ClimaCard from "./ClimaCard";
import styles from "../styles/Clima.module.scss";
import axios from "axios";

export default function ClimaView() {
  const [ciudad, setCiudad] = useState("Culiacán");
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] =useState(null);
  const API_URL= 'http://localhost:3001/api/clima';

  const obtenerClima = async (nombreCiudad) => {
    if (nombreCiudad.trim() === "") return;
    if (!nombreCiudad) return;

    setCargando(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: {ciudad: nombreCiudad}
      });
      setClima(response.data);
    } catch (err) {
      console.error("Error al obtener el clima:", err);
      setError("No se pudo obtener el clima. Intenta nuevamente.");
      setClima(null);
    } finally {
      setCargando(false);
    }
  };

    useEffect(() => {
      obtenerClima(ciudad);
    }, []);

    const manejarNuevaCiudad = (nuevaCiudad) => {
      setCiudad(nuevaCiudad);
      obtenerClima(nuevaCiudad);
    };


  return (
    <div className={styles.container}>
      <div className={styles.wheatherCard}>
        <h1>Clima en mi ciudad</h1>
        <CiudadInput onNuevaCiudad={manejarNuevaCiudad } />
        {error && <p className={styles.error}>{error}</p>}
        {cargando ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Consultando backend...</p>
          </div>
        ) : (
          <ClimaCard ciudad={ciudad} clima={clima} />
        )}
  
      </div>
    </div>
  );
}

