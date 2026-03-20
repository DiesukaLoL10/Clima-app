import React from 'react';
import styles from '../styles/ClimaCard.module.scss';

export default function ClimaCard({ ciudad, clima }) {
  if (!clima) {
    return (
      <div className={styles.resultBox}>
        <div className={styles.emptyState}>
          <p>Esperando consulta para <strong>{ciudad}</strong>...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.resultBox}>

      <h2 className={styles.cityName}>{clima.location.name}</h2>
      

      <div className={styles.mainInfo}>
        <div className={styles.tempWrapper}>
          <span className={styles.tempValue}>{clima.main.temp}</span>
          <span className={styles.tempUnit}>°C</span>
        </div>
        <p className={styles.description}>{clima.weather.description}</p>
      </div>


      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Mínima </span>
          <span className={styles.detailValue}>{clima.main.temp_min}°</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Máxima </span>
          <span className={styles.detailValue}>{clima.main.temp_max}°</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Sensación </span>
          <span className={styles.detailValue}>{clima.main.feels_like}°</span>
        </div>
      </div>
    </div>
  );
}