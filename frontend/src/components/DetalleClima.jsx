import React from 'react';
import styles from '../styles/ClimaCard.module.scss';

export default function DetalleClima({ clima }) {
  if (!clima) return null;

  const formatearHora = (timestamp) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <span className={styles.label}>Mín / Máx</span>
          <span className={styles.value}>
            {clima.main?.temp_min}°C / {clima.main?.temp_max}°C
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.label}>Viento</span>
          <span className={styles.value}>
            {clima.wind?.speed} km/h
          </span>
          <small className={styles.subValue}>
            Dir: {clima.wind?.deg}°
          </small>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.label}>Humedad</span>
          <span className={styles.value}>
            {clima.main?.humidity}%
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.label}>Presión</span>
          <span className={styles.value}>
            {clima.main?.pressure} hPa
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.label}>Nubosidad</span>
          <span className={styles.value}>
            {clima.clouds}%
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.label}>Visibilidad</span>
          <span className={styles.value}>
            {clima.visibility} km
          </span>
        </div>
      </div>

      <div className={styles.sunSection}>
        <div className={styles.sunInfo}>
          <span>Amanecer: {formatearHora(clima.sys?.sunrise)}</span>
          <span>Atardecer: {formatearHora(clima.sys?.sunset)}</span>
        </div>

        <div className={styles.timezone}>
          <small>
            Zona horaria (offset): {clima.sys?.timezone ? clima.sys.timezone / 3600 : 0}h
          </small>
        </div>
      </div>
    </>
  );
}