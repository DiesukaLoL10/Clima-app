import React from 'react';
import styles from '../styles/ClimaCard.module.scss';

import ResumenClima from './ResumenClima';
import DetalleClima from './DetalleClima';

export default function ClimaCard({ clima }) {
  if (!clima) {
    return (
      <div className={styles.emptyState}>
        Esperando datos del clima...
      </div>
    );
  }

  return (
    <div className={styles.weatherDetailsCard}>
      <ResumenClima clima={clima} />
      <DetalleClima clima={clima} />
    </div>
  );
}