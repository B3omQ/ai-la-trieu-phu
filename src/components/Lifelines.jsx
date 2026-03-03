export default function Lifelines({ use5050, useChange, useCall, used, disabled }) {
  return (
    <div className="lifelines">
      <button className="lifeline" onClick={use5050} disabled={used.fifty || disabled}>
        50:50
      </button>
      <button className="lifeline" onClick={useCall} disabled={used.call || disabled}>
        📞
      </button>
      <button className="lifeline" onClick={useChange} disabled={used.change || disabled}>
        🔄
      </button>
    </div>
  );
}
