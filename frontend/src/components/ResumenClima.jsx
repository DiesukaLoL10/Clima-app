import React from 'react';
import styles from '../styles/ClimaCard.module.scss';

export default function ResumenClima({ clima }) {
  if (!clima) return null;

  return (
    <>
      <div className={styles.headerSection}>
        <h2 className={styles.cityName}>
          {clima.location?.name || 'Ciudad'}
        </h2>

        <p className={styles.locationMeta}>
          {clima.location?.state ? `${clima.location.state}, ` : ''}
          {clima.location?.country}
        </p>

        {clima.location?.coords && (
          <div className={styles.coordinates}>
            <span>Lat: {clima.location.coords.lat.toFixed(2)}</span>
            <span>Lon: {clima.location.coords.lon.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className={styles.mainTempDisplay}>
        <div className={styles.tempGroup}>
          <span className={styles.currentTemp}>
            {clima.main?.temp}°
          </span>

          {clima.weather?.icon && (
            <img
              src={clima.weather.icon}
              alt={clima.weather.description}
              className={styles.weatherIcon}
            />
          )}
        </div>

        <p className={styles.weatherDescription}>
          {clima.weather?.description}
        </p>

        <p className={styles.feelsLike}>
          Sensación térmica: {clima.main?.feels_like}°C
        </p>
      </div>
    </>
  );
}