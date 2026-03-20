export default function AlertaError({ mensaje, onRetry }) {
  if (!mensaje) return null;

  return (
    <div style={{
      background: "#ffe5e5",
      border: "1px solid #ff4d4f",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "10px"
    }}>
      <p>{mensaje}</p>
      <button onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}