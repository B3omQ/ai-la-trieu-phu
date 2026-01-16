export default function Lifelines({ use5050, useChange, useCall, used }) {
  return (
    <div className="lifelines">
      <button className="lifeline" onClick={use5050} disabled={used.fifty}>
        50/50
      </button>
      <button className="lifeline" onClick={useChange} disabled={used.change}>
        switch
      </button>
      <button className="lifeline" onClick={useCall} disabled={used.call}>
        trợ giúp
      </button>
    </div>
  );
}

