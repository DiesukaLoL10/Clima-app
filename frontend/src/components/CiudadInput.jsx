"use client";
import styles from "../styles/CiudadInput.module.scss";
import { useState } from "react";

export default function CiudadInput({ onNuevaCiudad, cargando }) {
  const [valor, setValor] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!valor.trim()) return;
    onNuevaCiudad(valor.trim());
  };

  const esInvalido = valor.trim().length === 0 || cargando;

  return (
    <form
      className={styles.searchFormCustom}
      onSubmit={manejarSubmit}
      role="search"
    >
      <label htmlFor="ciudadInput">Ciudad</label>

      <input
        id="ciudadInput"
        type="text"
        placeholder="Ingresa una ciudad, p. ej. Culiacán"
        aria-label="Campo para ingresar una ciudad"
        className={styles.searchInputCustom}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <button
        type="submit"
        className={styles.searchButtonCustom}
        disabled={esInvalido}
      >
        {cargando ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}