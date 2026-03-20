import styles from "../styles/Clima.module.scss";

export default function SelectorUnidades({ units, onChange }) {
  return (
    <div className={styles.unitsSelector}>
      <button
        className={`${styles.unitButton} ${
          units === "metric" ? styles.unitButtonActive : ""
        }`}
        onClick={() => onChange("metric")}
      >
        °C / km/h
      </button>

      <button
        className={`${styles.unitButton} ${
          units === "imperial" ? styles.unitButtonActive : ""
        }`}
        onClick={() => onChange("imperial")}
      >
        °F / mph
      </button>
    </div>
  );
}