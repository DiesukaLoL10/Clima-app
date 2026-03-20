"use client";
import styles from "../styles/CiudadInput.module.scss";
import { useState } from "react";


export default function CiudadInput({ onNuevaCiudad }) {
  const [valor, setValor] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (valor.trim() === "") return;
    onNuevaCiudad(valor); 
    setValor("");
  };

  return (
    <>
      <form className={styles.searchContainer} onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Escribe una ciudad..."
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </>
  );
}
